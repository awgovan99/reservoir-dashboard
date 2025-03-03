import React from 'react'

interface WeatherData {
    netWaterInput: number,
    totalRainfall: number,
    totalEvaporation: number
}

const WeatherData = ({ area, weatherData }: { area: string, weatherData: WeatherData } ) => {

    // Might change the wording slightly
    
    const totalRainfall = Math.round(weatherData.totalRainfall * 100) / 100 // rounds to 2dp's
    const totalEvaporation = Math.round(weatherData.totalEvaporation * 100) / 100
    const netWaterInput = Math.round(weatherData.netWaterInput * 100) / 100

    let prediction = "stay the same"; 
    if (netWaterInput > 20) prediction = "increase a lot";
    else if (netWaterInput > 5) prediction = "increase a little";
    else if (netWaterInput < -5) prediction = "decrease a little";
    else if (netWaterInput < -20) prediction = "decrease a lot";

    return (
        <div className='card ml-8 pb-2 border-2 border-base-300 bg-white w-2/6'>
            <div className="card-body items-center ">

                <h1 className='card-title'>Weather Forecast for {area}</h1>

                <div>
                    <p>Rainfall: {totalRainfall}</p>
                    <p>Evaporation: {totalEvaporation}</p>
                    <p>Net Water Input: {netWaterInput}</p>
                    <p>Reservoir levels will likely {prediction} in {area}</p>
                </div>

            </div>
        </div>
    )
}

export default WeatherData