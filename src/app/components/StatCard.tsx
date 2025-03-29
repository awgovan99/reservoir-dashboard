import React from 'react'

// Used to display key metrics from reservoir data e.g. change from last
export function StatCard({stat, title}: {stat: number, title: string}) {
    return(
        <div className='card  border-2 bg-white border-base-300 mt-4 w-2/5 flex-1'>
            <div className="card-body items-center text-center">
                <h1 className="card-title">{title}</h1>
                <p className='text-4xl'>{Math.round(stat) + "%"}</p>
            </div>
        </div>
    )
}