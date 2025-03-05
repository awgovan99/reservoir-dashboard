import { NextRequest, NextResponse } from "next/server";
import { fetchWeatherApi } from 'openmeteo';

// Some api code is from https://open-meteo.com/en/docs

// Use this to coords in weatherParams,
// And to get index from area sent from front-end
const areaCoords: {[index: string]: [number, number]} = {
    "North Scotland":       [57.4791, -4.224], //Inverness
    "East Scotland":        [56.3952, -3.4314], //Perth
    "South Scotland":       [55.0696, -3.6114], //Dumfries
    "West Scotland":        [55.8651, -4.2576], //Glasgow

    "North West England":   [53.7628, -2.7045], //Preston
    "North East England":   [54.9733, -1.614],  //Newcastle upon Tyne
    "Midlands":             [52.4814, -1.8998], //Birmingham
    "South West England":   [50.7236, -3.5275], //Exeter
    "South East England":   [51.5085, -0.1257], //London

    "North West Wales":  [53.1413,-4.2702],  // Caernarfon
    "North East Wales":  [53.1137,-3.3178],  // Ruthin
    "South West Wales":  [51.8555,-4.3053],  // Carmarthen
    "South East Wales":  [51.821,-3.0174],  // Abergavenny
}

const latitudes = []
const longitudes = []

for (let key in areaCoords) { 
    latitudes.push(areaCoords[key][0]);
    longitudes.push(areaCoords[key][1]);
}

// Do 1 call when page loads so can take avg of all areas for UK
// Means don't have do call from openmeteo again
const weatherParams = {
    "latitude": latitudes,
	"longitude": longitudes,
	"daily": ["rain_sum", "et0_fao_evapotranspiration"],
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
        rainSum: Float32Array;
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
            rainSum: daily.variables(0)!.valuesArray()!,
            et0FaoEvapotranspiration: daily.variables(1)!.valuesArray()!,
        },
    })
}


type Props = {
    params: Promise<{
      area: string;
    }>
  };

// Could return weekly forecast data aswell inorder to plot graphs
export async function GET(req: NextRequest, { params }: Props) {
    const resolvedParams = await params
    const { area } = resolvedParams

    console.log("Weather api test")

    let totalRainfall = 0;
    let totalEvaporation = 0;

    // let res = {netWaterInput: 0, totalRainfall: 0, totalEvaporation: 0}
    let res: {}

    // if area == UK then take avg of all weatherData
    if(area === "UK") {
        // For weekly forecast data
        // Need to loop through each area
        let dailyRainfall = [0,0,0,0,0,0,0];
        let dailyEvaporation = [0,0,0,0,0,0,0];
        for(let i = 0; i < weatherData.length; i++) {
            // Loop through each day from current area
            for(let j = 0; j < weatherData[i].daily.rainSum.length; j++) {
                // totalRainfall += weatherData[i].daily.rainSum[j]
                // totalEvaporation += weatherData[i].daily.et0FaoEvapotranspiration[j]
                dailyRainfall[j] += weatherData[i].daily.rainSum[j]
                dailyEvaporation[j] += weatherData[i].daily.et0FaoEvapotranspiration[j]
            }
        }
        // Gets averages of total Rainfall and Evaporation accross the UK
        // const avgRailfall = totalRainfall / weatherData.length;
        // const avgEvaporation = totalEvaporation / weatherData.length;
        // const netWaterInput = avgRailfall - avgEvaporation;

        // res = {netWaterInput: netWaterInput, totalRainfall: avgRailfall, totalEvaporation: avgEvaporation}

        // Get avgs of days in all areas
        for(let i = 0; i < dailyRainfall.length; i++) {
            dailyRainfall[i] = dailyRainfall[i] / weatherData.length;
            dailyEvaporation[i] = dailyEvaporation[i] / weatherData.length;
        }

        res = {Rainfall: dailyRainfall, Evaporation: dailyEvaporation}
    }
    else {
        // Find index of area in areaCoords
        const areas = Object.keys(areaCoords);  // Get all keys as an array
        const areaIndex = areas.indexOf(area); // Get the index of the key

        const areaWeatherData = weatherData[areaIndex];

        // Gets sum of weekly forecast data for current area
        // for(let i = 0; i < areaWeatherData.daily.rainSum.length; i++) {
        //     totalRainfall += areaWeatherData.daily.rainSum[i]
        //     totalEvaporation += areaWeatherData.daily.et0FaoEvapotranspiration[i]
        //     // If returning weekly then remove above and then:
        //     // res will be array of {}
        //     // res.push({netWaterInput: netWaterInput, totalRainfall: totalRainfall, totalEvaporation: totalEvaporation})
        //     // Not sure if do netWaterInput or do it later in WeatherData.tsx
        // }

        let dailyRainfall = [0,0,0,0,0,0,0];
        let dailyEvaporation = [0,0,0,0,0,0,0];
        for(let i = 0; i < areaWeatherData.daily.rainSum.length; i++) {
            // Loop through each day from current area
            dailyRainfall[i] += areaWeatherData.daily.rainSum[i]
            dailyEvaporation[i] += areaWeatherData.daily.et0FaoEvapotranspiration[i]
        }

        // Sends weekly data to page for use in graph
        res = {Rainfall: dailyRainfall, Evaporation: dailyEvaporation}
        // If do this will need to calculate netWaterInput in WeatherData.tsx

        // const netWaterInput = totalRainfall - totalEvaporation;

        // res = {netWaterInput: netWaterInput, totalRainfall: totalRainfall, totalEvaporation: totalEvaporation}
    }

    console.log(res)

    return NextResponse.json(res)
    
}

