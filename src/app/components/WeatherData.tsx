import React from 'react'

interface WeatherData {
    Rainfall: number[],
    Evaporation: number[]
}

const WeatherData = ({ area, weatherData }: { area: string, weatherData: WeatherData } ) => {

    let totalRainfall = 0;
    let totalEvaporation = 0;

    console.log("Rainfall.length: " + weatherData.Rainfall.length)
    console.log("Rainfall: " + weatherData.Rainfall)
    console.log("Evaporation.length: " + weatherData.Evaporation.length)
    console.log("Evaporation: " + weatherData.Evaporation)

    for(let i = 0; i < weatherData.Rainfall.length; i++) {
        totalRainfall += weatherData.Rainfall[i]
        totalEvaporation += weatherData.Evaporation[i]
    }

    totalRainfall = Math.round(totalRainfall * 100) / 100 // rounds to 2dp's
    totalEvaporation = Math.round(totalEvaporation * 100) / 100
    const netWaterInput = Math.round((totalRainfall - totalEvaporation) * 100) / 100

    let prediction = "not change significantly"; 
    if (netWaterInput > 20) prediction = "increase a lot";
    else if (netWaterInput > 5) prediction = "increase slightly";
    else if (netWaterInput < -5) prediction = "decrease slightly";
    else if (netWaterInput < -20) prediction = "decrease a lot";

    // Probably going to add graphs for weekly data

    // Could add Additional Weather Data
    // Temperature (temperature_2m_max, temperature_2m_min), Helps estimate evaporation impact.
    // Wind Speed (windspeed_10m_max), Can affect evaporation rates over reservoirs.
    // Humidity (relative_humidity_2m), Affects how much water is lost to evaporation.
    return (
        <div className='card ml-8 pb-2 border-2 border-base-300 bg-white w-2/6'>
            <div className="card-body items-center ">

                <h1 className='card-title'>Weather Forecast for {area}</h1>

                <div>
                    <p>Over the next 7 days, total rainfall is expected to be {totalRainfall}mm, while evaporation may remove {totalEvaporation} mm, 
                       leading to an estimated net water input of {netWaterInput} mm.</p>
                    {/* Should probably add Color-Coded Indicator as a Visual representation of prediction */}
                    <p>Reservoir levels are likely to {prediction} based on the forecasted conditions in {area}.</p>
                    <br />
                    <p>Estimated Rainfall for the week: {totalRainfall}mm</p>
                    <p>Estimated Evapotranspiration for the week: {totalEvaporation}mm</p>
                    <p>Estimated Net Water Input for the week: {netWaterInput}mm</p>
                    <p>Reservoir levels are likely to {prediction} in {area} this week</p>
                </div>

            </div>
        </div>
    )
}

export default WeatherData