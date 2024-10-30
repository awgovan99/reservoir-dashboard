'use client';
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

export function DisplayData(params: { area: string, data: Data[] } ) {

    const { area, data } = params;

    return (
        <div>
            {/* Changes when click differnt option in select */}
            <h1>Reservoir Levels in {area}</h1>

            <LineChart width={700} height={400} data={data} >
                <Line name="Reservoir Levels" type="monotone" dataKey="currentlvl" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
            </LineChart>
            
            <table>
                <thead>
                    <tr>
                        <th>Reservoir Level</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d:Data, index) => (
                        <tr key={index}>
                            <td>{d.currentlvl}</td>
                            <td>{d.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}