import React from 'react'
import WeatherGraph from './WeatherGraph';
import WeatherTable from './WeatherTable';

export interface WeatherData {
    Precipitation: number[],
    Evaporation: number[],
    Dates: string[],
    Temperature: number[],
    WindSpeed: number[],
}

const WeatherData = ({ area, weatherData }: { area: string, weatherData: WeatherData } ) => {

    let totalPrecipitation = 0;
    let totalEvaporation = 0;

    totalPrecipitation = getTotal(weatherData.Precipitation);
    totalEvaporation = getTotal(weatherData.Evaporation);
    // Could maybe include wind and temp in calc for netWaterInput
    const netWaterInput = Math.round((totalPrecipitation - totalEvaporation) * 100) / 100

    const prediction = getPrediction(netWaterInput)

    return (
        <div className='card ml-4 pb-0 border-2 border-base-300 bg-white w-2/6'>
            <div className="card-body items-center ">

                <h1 className='card-title'>Weather Forecast for {area}</h1>

                <div className='w-full'>
                    <h1 className="text-base text-center font-semibold">Weekly Precipitation vs. Evapotranspiration</h1>
                    <WeatherGraph weatherData={weatherData} />
                </div>

                <div className="text-sm">
                    <h1 className='text-base text-center font-semibold'>Potential impact on Reservoir levels</h1>
                    <p>Over the next 7 days, the <strong>total precipitation</strong> is expected to be <strong>{totalPrecipitation}mm</strong>, while <strong>total evapotranspiration</strong> may 
                       remove <strong>{totalEvaporation} mm</strong>, leading to an estimated <strong>net water input</strong> of <strong>{netWaterInput} mm</strong>.</p>

                    <p>Reservoir levels are likely to <strong>{prediction}</strong> based on the forecasted conditions in {area}.</p>
                </div>

                <div className='w-full'>
                    <h1 className="text-base text-center font-semibold">Temperature & Wind Trends for the Next 7 Days</h1>
                    <WeatherTable weatherData={weatherData} />
                </div>

            </div>
        </div>
    )
}

export function getTotal(data: number[]) {
    let total = 0
    
    for(let i = 0; i < data.length; i++) {
        total += data[i]
    }

    return Math.round(total * 100) / 100
}

// Might change preditction message
export function getPrediction(netWaterInput: number) {
    let prediction = "not change significantly"; 
    if (netWaterInput > 20) prediction = "increase a lot";
    else if (netWaterInput > 5) prediction = "increase slightly";
    else if (netWaterInput < -20) prediction = "decrease a lot";
    else if (netWaterInput < -5) prediction = "decrease slightly";
    return prediction;
}

export default WeatherData