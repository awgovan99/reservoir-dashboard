'use client';
import React, { useState, useEffect } from 'react'
import DisplayData from './DisplayData';
import Header from './Header';

const SelectArea = () => {
    const [selectedArea, setArea] = useState("UK"); // might remove this
    const [submittedArea, setSubmit] = useState("UK");
    const [data, setData] = useState([]);

    // UK should get avg lvl for whole country
    const areasScotland = ["North Scotland", "West Scotland", "East Scotland", "South Scotland"]
    const areasWales = ["North West Wales", "North East Wales", "South West Wales", "South East Wales"]
    
    const areasEnglandNames = ["North West", "North East", "Midlands", "South West", "South East"] 

    const areasNorthWest = ["Carlisle", "Haweswater & Thirlmere", "Pennine Sources", "Dee & Vyrnwy Reservoirs"];  // United utilities Water
    const areasNorthEast = ["Northumberland", "Weardale", "Teesdale", "Kielder Reservoir", "Yorkshire"];  // Northumbrian water, Yorkshire water, anh(Anglian Water)
    const areasMidlands =  ["Ogston", "Tittesworth", "Elan Valley", "Draycote", "Derwent Valley", "Carsington", "Dove", "Charnwood", "Bartley / Frankley", "Whitacre Combined", "Blithfield Reservoir"];   // Severn Trent Water, SSC(South Staffordshire Water), Anglian Water
    const areasSouthWest = ["Wessex", "Cheddar Reservoir", "Chew Valley Lake", "Blagdon Lake"];  // *South West Water(including SWB), Wessex water, Bristol Water
    const areasSouthEast = ["Bewl Water", "Darwell", "Powdermill", "Weir Wood", "Ardingly", "Arlington", "Oxfordshire", "London", "Hanningfield and Abberton", "Bough Beech"];  // Southern water, South East Water, Thames Water, *Affinity Water*(Not sure), *Portsmouth Water, Essex and Suffolk Water(One company), SES
    const areasEngland = [areasNorthWest, areasNorthEast, areasMidlands, areasSouthWest, areasSouthEast]

    // const areasNIreland: any[] = []

    // calls function when page loads
    useEffect(() => {
        getData();
    }, []);

    //should move at somepoint
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
                {/* absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 */}
                <div className="drawer-content flex flex-col items-center justify-center pt-20">
                    {/* Page content here */}
                    {/* <Header /> */}

                    <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden bg-base-300 my-2">View Areas</label>

                    <DisplayData area={submittedArea} data={data} />

                </div>

                <div className="drawer-side pt-16">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    {/* bg-base-300, border-r-2*/}
                    <ul className="menu bg-blue-400 text-base-content min-h-full w-80 p-4 border-r-2 border-base-300">
                    {/* Sidebar content here */}
                        
                        {/* UK */}
                        {/* Make Bigger */}
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
                        <div className="collapse collapse-arrow bg-white border-2 border-black mt-4 shadow-xl">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium text-black">England</div>
                            <div className="collapse-content">
                                {areasEnglandNames.map((area, index) => (

                                    <div className="collapse collapse-arrow bg-white border-2 border-black mt-4 shadow-xl">
                                    <input type="checkbox" />
                                    <div className="collapse-title text-xl font-medium text-black">{area}</div>
                                    <div className="collapse-content">
                                        {areasEngland[index].map((a, i) => (
                                            <button onClick={() => {if(a !== selectedArea) {console.log(a); console.log(i); getButtonData(a)}}} className={`btn mb-1 w-full text-black bg-blue-300 hover:bg-blue-500 ${
                                                // Highlights clicked button
                                                a === selectedArea ? "bg-blue-500" : "bg-blue-300"
                                            }`}  key={i} value={a}>{a}</button>
                                        ))}
                                    </div>
                                </div>

                                ))}
                            </div>
                        </div>

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