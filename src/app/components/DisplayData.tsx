'use client';
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

export function DisplayData(params: { area: string, data: Data[] } ) {

    const { area, data } = params;
// Could remove days from date and just display monthly data
// Could also only display one year at a time in graph but not good if not a lot of historical data
    return (
        <div>
            <div className='mt-5 mx-10 pr-5 pt-3 pb-2 border-2 flex-1 place-items-center '>

                <h1 className='text-xl font-serif'>Reservoir Levels in {area}</h1>

                {/* <ResponsiveContainer width="100%" minHeight={300}> */}
                    <LineChart width={700} height={300} data={data} >
                        <Line name="Reservoir Levels" type="monotone" dataKey="currentlvl" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(tick) => tick + "%"}/>
                        <Tooltip formatter={(tick) => tick + "%"}/>
                    </LineChart>
                {/* </ResponsiveContainer> */}

            </div>

            <div>
                {/* Maybe temp */}
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
        </div>
    )
}