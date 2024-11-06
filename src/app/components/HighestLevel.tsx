import React from 'react'

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

export function HighestLevel(params: {data: Data[]}) {
    const { data } = params;

    let highestLvl = 0
    if(data.length !== 0){
        highestLvl = data.reduce((prev, current) => {return prev.currentlvl > current.currentlvl ? prev : current}).currentlvl;
    }

    return(
        <div className='card shadow-xl border-2 bg-white border-black mt-4 w-2/5 flex-1'>
            <div className="card-body items-center text-center">
                <h1 className="card-title">Highest Level</h1>
                <p className='text-4xl'>{Math.round(highestLvl) + "%"}</p>
            </div>
        </div>
    )
}