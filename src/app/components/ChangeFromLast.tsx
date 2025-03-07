import React from 'react'

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

export function ChangeFromLast(params: {data: Data[]}) {
    const { data } = params;
    
    // let change = 0
    // if(data.length > 1){
    //     change = data[data.length-1].currentlvl - data[data.length-2].currentlvl
    // }

    return(
        // shadow-xl
        <div className='card  border-2 bg-white border-base-300 mt-4 flex-1'>
            <div className="card-body items-center text-center">
                <h1 className="card-title">Change From Last</h1>
                <p className='text-4xl'>{Math.round(getChangeFromLast(data)) + "%"}</p>
            </div>
        </div>
    )
}

export function getChangeFromLast(data: { currentlvl: number }[]): number {
    if (data.length < 2) return 0;
    return data[data.length-1].currentlvl - data[data.length-2].currentlvl;
}