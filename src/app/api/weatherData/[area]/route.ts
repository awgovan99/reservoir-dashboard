import { NextRequest, NextResponse } from "next/server";
import { fetchWeatherApi } from 'openmeteo';

// Some api code is from https://open-meteo.com/en/docs

// Use this to coords in weatherParams,
// And to get index from area sent from front-end
const areaCoords: {[index: string]: [number, number]} = {
    "North Scotland":       [57.4791, -4.224],  //Inverness
    "East Scotland":        [56.3952, -3.4314], //Perth
    "South Scotland":       [55.0696, -3.6114], //Dumfries
    "West Scotland":        [55.8651, -4.2576], //Glasgow

    // Using 1 set of coords for England areas to reduce no. of api calls
    "North West England":   [53.7628, -2.7045], //Preston
    "North East England":   [54.9733, -1.614],  //Newcastle upon Tyne
    "Midlands":             [52.4814, -1.8998], //Birmingham
    "South West England":   [50.7236, -3.5275], //Exeter
    "South East England":   [51.5085, -0.1257], //London

    "North West Wales":  [53.1413,-4.2702], // Caernarfon
    "North East Wales":  [53.1137,-3.3178], // Ruthin
    "South West Wales":  [51.8555,-4.3053], // Carmarthen
    "South East Wales":  [51.821,-3.0174],  // Abergavenny
}

const latitudes = []
const longitudes = []

for (const key in areaCoords) { 
    latitudes.push(areaCoords[key][0]);
    longitudes.push(areaCoords[key][1]);
}

// Do 1 call when page loads so can take avg of all areas for UK
// Means don't have do call from openmeteo again
const weatherParams = {
    "latitude": latitudes,
	"longitude": longitudes,
	"daily": ["weather_code", "temperature_2m_max", "precipitation_sum", "wind_speed_10m_max", "et0_fao_evapotranspiration"],
	"timezone": "GMT"
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, weatherParams);


// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);


interface apiWeatherData {
    daily: {
        time: Date[];
        weatherCode: Float32Array;
        temperature2mMax: Float32Array
        precipitation_sum: Float32Array;
        windSpeed10mMax: Float32Array;
        et0FaoEvapotranspiration: Float32Array;
    };
}

const weatherData: apiWeatherData[] = []
for(let i = 0; i < responses.length; i++) {
    const daily = responses[i].daily()!;
    weatherData.push({
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + responses[i].utcOffsetSeconds()) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            precipitation_sum: daily.variables(2)!.valuesArray()!,
            windSpeed10mMax: daily.variables(3)!.valuesArray()!,
            et0FaoEvapotranspiration: daily.variables(4)!.valuesArray()!,
        },
    })
}


type Props = {
    params: Promise<{
      area: string;
    }>
};

// Helps convert month from number to string
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Could return weekly forecast data aswell inorder to plot graphs
export async function GET(req: NextRequest, { params }: Props) {
    const resolvedParams = await params
    const { area } = resolvedParams
    
    let dailyPrecipitation = [0,0,0,0,0,0,0];
    let dailyEvaporation = [0,0,0,0,0,0,0];
    const dates:string[] = [];
    let dailyTemperature = [0,0,0,0,0,0,0];
    let dailyWindSpeed = [0,0,0,0,0,0,0];

    let res = {
        Precipitation: dailyPrecipitation, 
        Evaporation: dailyEvaporation, 
        Dates: dates,
        Temperature:dailyTemperature,
        WindSpeed: dailyWindSpeed,
    }

    // if area == UK then take avg of all weatherData
    if(area === "UK") {
        // For weekly forecast data
        // Need to loop through each area
        
        for(let i = 0; i < weatherData.length; i++) {
            // Loop through each day from current area
            for(let j = 0; j < weatherData[i].daily.precipitation_sum.length; j++) {
                dailyPrecipitation[j] += weatherData[i].daily.precipitation_sum[j]
                dailyEvaporation[j] += weatherData[i].daily.et0FaoEvapotranspiration[j]
                dailyTemperature[j] += weatherData[i].daily.temperature2mMax[j]
                dailyWindSpeed[j] += weatherData[i].daily.windSpeed10mMax[j]
            }
        }

        // Get avgs of days in all areas
        for(let i = 0; i < dailyPrecipitation.length; i++) {
            dailyPrecipitation[i] = dailyPrecipitation[i] / weatherData.length;
            dailyEvaporation[i] = dailyEvaporation[i] / weatherData.length;
            dailyTemperature[i] = dailyTemperature[i] / weatherData.length;
            dailyWindSpeed[i] = dailyWindSpeed[i] / weatherData.length;

            // Gets dates
            const month = months[weatherData[0].daily.time[i].getMonth()]
            dates.push(weatherData[0].daily.time[i].getDate() + " " + month)
        }

        res = {
            Precipitation: dailyPrecipitation, 
            Evaporation: dailyEvaporation, 
            Dates: dates,
            Temperature:dailyTemperature,
            WindSpeed: dailyWindSpeed,
        }
    }
    else {
        // Find index of area in areaCoords
        const areas = Object.keys(areaCoords);  // Get all keys as an array
        const areaIndex = areas.indexOf(area); // Get the index of the key

        const areaWeatherData = weatherData[areaIndex];


        for(let i = 0; i < areaWeatherData.daily.precipitation_sum.length; i++) {
            const month = months[areaWeatherData.daily.time[i].getMonth()]
            dates.push(areaWeatherData.daily.time[i].getDate() + " " + month)
        }

        dailyPrecipitation = arrayValues(areaWeatherData.daily.precipitation_sum)
        dailyEvaporation = arrayValues(areaWeatherData.daily.et0FaoEvapotranspiration)
        // weatherCode = arrayValues(areaWeatherData.daily.weatherCode)
        dailyTemperature = arrayValues(areaWeatherData.daily.temperature2mMax)
        dailyWindSpeed = arrayValues(areaWeatherData.daily.windSpeed10mMax)

        // Sends weekly data to page for use in graph
        res = {
            Precipitation: dailyPrecipitation, 
            Evaporation: dailyEvaporation, 
            Dates: dates,
            // WeatherCode: weatherCode,
            Temperature: dailyTemperature,
            WindSpeed: dailyWindSpeed,
        }
    }

    return NextResponse.json(res)
    
}

export const arrayValues = (values: Float32Array): number[] => {
    const valuesArray: number[] = [0,0,0,0,0,0,0]

    for(let i = 0; i < values.length; i++) {
        // Loop through each day from current area
        valuesArray[i] += values[i]
    }

    return valuesArray;
}

