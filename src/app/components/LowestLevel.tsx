import React from 'react'

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

export function LowestLevel(params: {data: Data[]}) {
    const { data } = params;

    let lowestLvl = 0
    if(data.length !== 0){
        lowestLvl = data.reduce((prev, current) => {return prev.currentlvl < current.currentlvl ? prev : current}).currentlvl;
    }

    return(
        <div className='card  border-2 bg-white border-base-300 mt-4 w-2/5 flex-1'>
            <div className="card-body items-center text-center">
                <h1 className="card-title">Lowest Level</h1>
                <p className='text-4xl'>{Math.round(lowestLvl) + "%"}</p>
            </div>
        </div>
    )
}