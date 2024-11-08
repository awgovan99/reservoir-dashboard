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
    
    return (
        <div className='card shadow-xl mt-5 pb-2 border-2 border-black bg-white h-full w-full'>
            <div className="card-body items-center text-center">
                <h1 className='card-title font-serif'>Reservoir Levels in {area}</h1>
            </div>
            <figure className='pr-6 pt-3'>
                <ResponsiveContainer width="99%" height={300}>
                    <LineChart width={700} height={300} data={data} >
                        <Line name="Reservoir Level" type="monotone" dataKey="currentlvl" stroke='#4169E1' strokeWidth={2} dot={false}/>
                        <CartesianGrid stroke="#ccc" vertical={false}/>
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(tick) => tick + "%"}/>
                        <Tooltip formatter={(tick) => Math.round(tick as number) + "%"}/>
                    </LineChart>
                </ResponsiveContainer>
            </figure>
        </div>
    )
}