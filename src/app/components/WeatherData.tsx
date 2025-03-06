import React from 'react'
import WeatherGraph from './WeatherGraph';

export interface WeatherData {
    Precipitation: number[],
    Evaporation: number[],
    Dates: string[]
}

const WeatherData = ({ area, weatherData }: { area: string, weatherData: WeatherData } ) => {

    let totalPrecipitation = 0;
    let totalEvaporation = 0;

    console.log("Rainfall.length: " + weatherData.Precipitation.length)
    console.log("Rainfall: " + weatherData.Precipitation)
    console.log("Evaporation.length: " + weatherData.Evaporation.length)
    console.log("Evaporation: " + weatherData.Evaporation)
    console.log("Dates.length: " + weatherData.Dates.length)
    console.log("Dates: " + weatherData.Dates)

    for(let i = 0; i < weatherData.Precipitation.length; i++) {
        totalPrecipitation += weatherData.Precipitation[i]
        totalEvaporation += weatherData.Evaporation[i]
    }

    totalPrecipitation = Math.round(totalPrecipitation * 100) / 100 // rounds to 2dp's
    totalEvaporation = Math.round(totalEvaporation * 100) / 100
    const netWaterInput = Math.round((totalPrecipitation - totalEvaporation) * 100) / 100

    let prediction = "not change significantly"; 
    if (netWaterInput > 20) prediction = "increase a lot";
    else if (netWaterInput > 5) prediction = "increase slightly";
    else if (netWaterInput < -5) prediction = "decrease slightly";
    else if (netWaterInput < -20) prediction = "decrease a lot";

    // Probably going to add graphs for weekly data

    // Could add Additional Weather Data
    // Temperature (temperature_2m_max, temperature_2m_min), Helps estimate evaporation impact.
    // Wind Speed (windspeed_10m_max), Can affect evaporation rates over reservoirs.
    return (
        <div className='card ml-8 pb-2 border-2 border-base-300 bg-white w-2/6'>
            <div className="card-body items-center ">

                <h1 className='card-title'>Weather Forecast for {area}</h1>

                <div >
                    <WeatherGraph weatherData={weatherData} />
                </div>

                <div className="text-sm">
                    <p>Over the next 7 days, the <strong>total precipitation</strong> is expected to be <strong>{totalPrecipitation}mm</strong>, while <strong>total evapotranspiration</strong> may 
                       remove <strong>{totalEvaporation} mm</strong>, leading to an estimated <strong>net water input</strong> of <strong>{netWaterInput} mm</strong>.</p>
                    {/* Should probably add Color-Coded Indicator as a Visual representation of prediction */}
                    <p>Reservoir levels are likely to <strong>{prediction}</strong> based on the forecasted conditions in {area}.</p>
                </div>

            </div>
        </div>
    )
}

export default WeatherData