'use client';
import React, { useState } from 'react'

interface Data {
    currentlvl: number,
    changeFromLast: number,
    area: string,
    date: string
}

const SelectArea = () => {
    const [selectedArea, setArea] = useState("UK");
    const [data, setData] = useState([]);

    // UK should get avg lvl for whole country
    const areas = ["UK", "North Scotland", "West Scotland", "East Scotland", "South Scotland"]

    const getData = async () => {
        console.log("Area: " + selectedArea)
        
        const response = await fetch(`/api/${encodeURIComponent(selectedArea)}`,{
            next:{revalidate: 10}
        });

        if (!response.ok) {
            throw new Error('Failed to fetch area data');
          }
          
        const data = await response.json();  
        
        console.log(data.data); 
        setData(data.data)
    }

    return (
        <div>
            <select name="levels" id="levels" value={selectedArea} onChange={(e) => setArea(e.target.value)}>
                {areas.map((area, index) => (
                    <option key={index} value={area}>
                        {area}
                    </option>
                ))}
            </select>

            {/* Run db query when press button, then display table with results */}
            <button onClick={getData}>submit</button> 
        
            <h1>Reservoir Levels</h1>
            <table>
                <thead>
                    <tr>
                        <th>Reservoir Level</th>
                        <th>Change From Last</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d:Data, index) => (
                        <tr key={index}>
                            <td>{d.currentlvl}</td>
                            <td>{d.changeFromLast}</td>
                            <td>{d.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default SelectArea