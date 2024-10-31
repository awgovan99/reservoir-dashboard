'use client';
import React, { useState } from 'react'
import { DisplayData } from './DisplayData';

const SelectArea = () => {
    const [selectedArea, setArea] = useState("UK");
    const [submittedArea, setSubmit] = useState("UK");
    const [data, setData] = useState([]);

    // UK should get avg lvl for whole country
    const areas = ["UK", "North Scotland", "West Scotland", "East Scotland", "South Scotland"]

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
            
            <div className='flex'>
                <DisplayData area={submittedArea} data={data} />
            </div>

        </div>
    )
}

export default SelectArea