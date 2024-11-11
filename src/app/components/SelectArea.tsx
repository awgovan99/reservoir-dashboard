'use client';
import React, { useState, useEffect } from 'react'
import DisplayData from './DisplayData';

const SelectArea = () => {
    const [selectedArea, setArea] = useState("UK"); // might remove this
    const [submittedArea, setSubmit] = useState("UK");
    const [data, setData] = useState([]);

    // UK should get avg lvl for whole country
    const areasScotland = ["North Scotland", "West Scotland", "East Scotland", "South Scotland"]
    const areasWales = ["North West Wales", "North East Wales", "South West Wales", "South East Wales"]
    // const areasEngland: any[] = []
    // const areasNIreland: any[] = []

    // calls function when page loads
    useEffect(() => {
        getData();
    }, []);

    //should remove at somepoint
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

    const getButtonData = async (area: string) => {
        console.log("Button Area: " + area)
        
        const response = await fetch(`/api/${encodeURIComponent(area)}`,{
            //think can set method to get
        
            
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch area data');
          }
          
        const data = await response.json();  
        
        console.log(data.data); 
        setData(data.data)
        setArea(area)
        setSubmit(area)
    }

    return (
        <div className=''>

            <div className="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden bg-base-300 my-2">View Areas</label>

                    <DisplayData area={submittedArea} data={data} />

                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-300 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                        
                        {/* UK */}
                        <button onClick={() => {if("UK" !== selectedArea) {console.log("UK"); getButtonData("UK")}}} className={`border-2 border-black mt-4 shadow-xl btn text-black bg-blue-300 hover:bg-blue-500 ${
                            // Highlights clicked button
                            "UK" === selectedArea ? "bg-blue-500" : "bg-blue-300"
                        }`}>UK</button>
                    
                        {/* Scotland */}
                        <div className="collapse collapse-arrow bg-white border-2 border-black mt-4 shadow-xl">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium text-black">Scotland</div>
                            <div className="collapse-content">
                                {areasScotland.map((area, index) => (
                                    <button onClick={() => {if(area !== selectedArea) {console.log(area); getButtonData(area)}}} className={`btn mb-1 w-full text-black bg-blue-300 hover:bg-blue-500 ${
                                        // Highlights clicked button
                                        area === selectedArea ? "bg-blue-500" : "bg-blue-300"
                                    }`}  key={index} value={area}>{area}</button>
                                ))}
                            </div>
                        </div>

                        {/* England */}
                        

                        {/* Wales */}
                        <div className="collapse collapse-arrow bg-white border-2 border-black mt-4 shadow-xl">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium text-black">Wales</div>
                            <div className="collapse-content">
                                {areasWales.map((area, index) => (
                                    <button onClick={() => {if(area !== selectedArea) {console.log(area); getButtonData(area)}}} className={`btn mb-1 w-full text-black bg-blue-300 hover:bg-blue-500 ${
                                        // Highlights clicked button
                                        area === selectedArea ? "bg-blue-500" : "bg-blue-300"
                                    }`} key={index} value={area}>{area}</button>
                                ))}
                            </div>
                        </div>

                        {/* Northern Ireland */}
                        

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SelectArea