'use client';
import React, { useState } from 'react'

const SelectArea = () => {
    const [selectedArea, setArea] = useState("UK");

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
        console.log(data.message); 
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
        
            {/* <h1>Reservoir Levels</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table> */}
        </div>
    )
}

export default SelectArea