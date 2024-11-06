import React from 'react'

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

export function CurrentLevel(params: {data: Data[]}) {
    const { data } = params;

    let curlvl = 0
    if(data.length !== 0){
        curlvl = data[data.length-1].currentlvl
    }

    return(
        <div className='card shadow-xl border-2 border-black bg-white mt-4 flex-1'>
            <div className="card-body items-center text-center">
                <h1 className='card-title'>Current Level</h1>
                <p className='text-4xl'>{Math.round(curlvl) + "%"}</p>
            </div>
        </div>
    )
}