import React from 'react'
import { WaterLevelGraph } from './WaterLevelGraph'
import { CurrentLevel } from './CurrentLevel'
import { ChangeFromLast } from './ChangeFromLast'
import { HighestLevel } from './HighestLevel'
import { LowestLevel } from './LowestLevel'

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
        <div className='flex flex-col w-full'>

            {/* First Row */}
            <div className='flex w-full space-x-4'>
                <CurrentLevel data={data}/>
                <ChangeFromLast data={data}/>
            </div>
            {/* Second Row */}
            <div className='flex w-full space-x-4'>
                <HighestLevel data={data}/>
                <LowestLevel data={data}/>
            </div>
            
        </div>

    </div>
  )
}

export default DisplayData