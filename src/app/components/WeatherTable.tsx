import React from 'react'
import { WeatherData } from "./WeatherData";

const WeatherTable = ({ weatherData }: { weatherData: WeatherData }) => {
  return (
    <div className="w-full px-0 pb-0 overflow-x-auto rounded-box border border-base-content/5  text-sm overflow-auto flex">
        <table className="table tabs-sm border-collapse border-base-300 w-full px-0 pb-0 bg-gray-50">
            
            <thead className='bg-blue-400'>
                <tr>
                    <th></th>
                    <th>Max Temperature</th>
                    <th>Max Wind Speed</th>
                </tr>
            </thead>

            <tbody className=''>
            {weatherData.Dates.map((date, index) => (
                <tr key={index} className="border-t">
                    <td className="px-2 py-1 border">{date}</td>
                    <td className="px-2 py-1 border">{Math.round(weatherData.Temperature[index] * 100) / 100}°C</td>
                    <td className="px-2 py-1 border">{Math.round(weatherData.WindSpeed[index] * 100) / 100} km/h</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default WeatherTable