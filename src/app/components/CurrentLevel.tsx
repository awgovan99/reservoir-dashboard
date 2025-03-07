import React from 'react'

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

export function CurrentLevel(params: {data: Data[]}) {
    const { data } = params;

    // let curlvl = 0
    // if(data.length !== 0){
    //     curlvl = data[data.length-1].currentlvl
    // }

    return(
        <div className='card border-2 border-base-300 bg-white mt-4 flex-1'>
            <div className="card-body items-center text-center">
                <h1 className='card-title'>Current Level</h1>
                {/* <div className="radial-progress" style={{ "--value": getCurrentLevel(data) } as React.CSSProperties } aria-valuenow={getCurrentLevel(data)} role="progressbar">{getCurrentLevel(data)}%</div> */}
                <p className='text-4xl'>{Math.round(getCurrentLevel(data)) + "%"}</p>
            </div>
        </div>
    )
}

export function getCurrentLevel(data: { currentlvl: number }[]): number {
    if (data.length === 0) return 0;
    return data[data.length - 1].currentlvl;
}