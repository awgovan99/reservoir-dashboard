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
    const areasScotland = ["North Scotland", "West Scotland", "East Scotland", "South Scotland"]
    const areasWales = ["North West Wales", "North East Wales", "South West Wales", "South East Wales"]

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
            
            {/* Could map these based on country aswell */}
            <div className="collapse collapse-arrow bg-white border-2 border-black shadow-xl">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">Scotland</div>
                <div className="collapse-content">
                    {areasScotland.map((area, index) => (
                        <button onClick={() => {if(area != selectedArea) {setArea(area); console.log(area)}}} className="btn mr-2 bg-blue-400 btn-info" key={index} value={area}>{area}</button>
                    ))}
                </div>
            </div>

            <div className="collapse collapse-arrow bg-white border-2 border-black mt-4 shadow-xl">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">Wales</div>
                <div className="collapse-content">
                    {areasWales.map((area, index) => (
                        <button className="btn mr-2" key={index} value={area}>{area}</button>
                    ))}
                </div>
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