import React from 'react'
import { WaterLevelGraph } from './WaterLevelGraph'
import { StatCard } from './StatCard'

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

const DisplayData = ({ area, data }: { area: string, data: Data[] } ) => {
  return (
    <div className='w-4/6 h-full'>

        {/* Graph */}
        <div className='card pb-2 border-2 border-base-300 bg-white w-full h-[59%]'>
            <div className="card-body items-center text-center">
                <h1 className='card-title'>Reservoir Levels in {area}</h1>
                <WaterLevelGraph area={area} data={data} />
            </div>     
        </div>
        
        {/* Extra Info */}
        <div className='flex flex-col w-full h-fit'>

            {/* First Row */}
            <div className='flex w-full space-x-4'>
                <StatCard  stat={getCurrentLevel(data)} title={"Current Level"} />
                <StatCard  stat={getChangeFromLast(data)} title={"Change From Last"} />
            </div>
            {/* Second Row */}
            <div className='flex w-full space-x-4'>
                <StatCard  stat={getHighestLevel(data)} title={"Highest Level"} />
                <StatCard  stat={getLowestLevel(data)} title={"Lowest Level"} />
            </div>
            
        </div>

    </div>
  )
}

export function getCurrentLevel(data: { currentlvl: number }[]): number {
    if (data.length === 0) return 0;
    return data[data.length - 1].currentlvl;
}

export function getChangeFromLast(data: { currentlvl: number }[]): number {
    if (data.length < 2) return 0;
    return data[data.length-1].currentlvl - data[data.length-2].currentlvl;
}

export function getHighestLevel(data: { currentlvl: number }[]): number {
    if (data.length === 0) return 0;
    return data.reduce((prev, current) => {return prev.currentlvl > current.currentlvl ? prev : current}).currentlvl;
}

export function getLowestLevel(data: { currentlvl: number }[]): number {
    if (data.length === 0) return 0;
    return data.reduce((prev, current) => {return prev.currentlvl < current.currentlvl ? prev : current}).currentlvl;
}

export default DisplayData