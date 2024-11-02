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
        <div className='card shadow-xl bg-white mt-4 ml-10'>
            <div className="card-body items-center text-center">
                <h1 className="card-title">Highest Level</h1>
                <h2>{Math.round(highestLvl) + "%"}</h2>
            </div>
        </div>
    )
}