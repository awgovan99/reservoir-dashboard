'use client';
import React, { useState, useEffect } from 'react'
import { DisplayData } from './DisplayData';
import { CurrentLevel } from './CurrentLevel';
import { ChangeFromLast } from './ChangeFromLast';
import { HighestLevel } from './HighestLevel';
import { LowestLevel } from './LowestLevel';

const SelectArea = () => {
    const [selectedArea, setArea] = useState("UK");
    const [submittedArea, setSubmit] = useState("UK");
    const [data, setData] = useState([]);

    // UK should get avg lvl for whole country
    const areas = ["UK", "North Scotland", "West Scotland", "East Scotland", "South Scotland"]

    // calls function when page loads
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        console.log("Area: " + selectedArea)
        
        const response = await fetch(`/api/${encodeURIComponent(selectedArea)}`,{
            next:{revalidate: 10}
        });
        
        // This error did get thrown so will have to deal with this
        if (!response.ok) {
            throw new Error('Failed to fetch area data');
          }
          
        const data = await response.json();  
        
        console.log(data.data); 
        setData(data.data)
        setSubmit(selectedArea)
    }

    return (
        <div>
            <div>
                <select name="levels" id="levels" value={selectedArea} onChange={(e) => setArea(e.target.value)}>
                    {areas.map((area, index) => (
                        <option key={index} value={area}>
                            {area}
                        </option>
                    ))}
                </select>

                <button onClick={getData}>submit</button> 
            </div>
            
            <div className='w-3/4 mx-10'>
                {/* Graph */}
                <DisplayData area={submittedArea} data={data} />
                
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

        </div>
    )
}

export default SelectArea