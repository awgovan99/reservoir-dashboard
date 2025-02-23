'use client';
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

export function WaterLevelGraph({ area, data }: { area: string, data: Data[] } ) {
    return (
        // base-300
        <div className='card  pb-2 border-2 border-base-300 bg-white w-full'>
            <div className="card-body items-center text-center">
                <h1 className='card-title'>Reservoir Levels in {area}</h1>
            </div>
            <figure className='pr-6 pt-3 '>
                <ResponsiveContainer width="99%" height={300}>
                    <LineChart width={700} height={300} data={data} >
                        <Line name="Reservoir Level" type="monotone" dataKey="currentlvl" stroke='#4169E1' strokeWidth={2} dot={false}/>
                        <CartesianGrid stroke="#ccc" vertical={false}/>
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(tick) => tick + "%"}/>
                        <Tooltip formatter={(tick) => Math.round(tick as number) + "%"}/>
                        {/* Puts a line on the graph, is a way of showing average with adding it bellow graph */}
                        {/* <ReferenceLine y={*Put avg level here*} label="AVG" stroke="red" strokeDasharray="3 3" /> */}
                    </LineChart>
                </ResponsiveContainer>
            </figure>
        </div>
    )
}