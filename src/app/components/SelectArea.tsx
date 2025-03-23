'use client';
import React, { useState, useEffect } from 'react'
import DisplayData from './DisplayData';
import WeatherData from './WeatherData';

const SelectArea = () => {
    const [selectedArea, setArea] = useState("UK"); 
    const [data, setData] = useState([]);
    const [weatherData, setWeatherData] = useState({Precipitation:[], Evaporation:[], Dates: [], Temperature:[], WindSpeed: [],});

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

    // calls function when page loads
    // Sets selected area to UK which calls other useEffect that gets data
    useEffect(() => {
        setArea("UK")
    }, []);

    useEffect(() => {
        console.log("Getting Data...")
        getReservoirData(selectedArea);
        getWeatherData(selectedArea);
    }, [selectedArea]);

    // Maybe make functions return the api data, then set the data in the useEffect
    const getWeatherData = async (area: string) => {
        // Purpose is to limit number of api calls by reducing amount of coordinates needed
        if(areasNorthWest.includes(area)) area = "North West England";
        else if(areasNorthEast.includes(area)) area = "North East England";
        else if(areasMidlands.includes(area)) area = "Midlands";
        else if(areasSouthWest.includes(area)) area = "South West England";
        else if(areasSouthEast.includes(area)) area = "South East England";

        console.log("Weather area: " + area)

        const response = await fetch(`/api/weatherData/${encodeURIComponent(area)}`);
        const weatherData = await response.json();

        setWeatherData(weatherData)
    }

    //should move at somepoint
    // If move this, should probably make return data
    const getReservoirData = async (area: string) => {
        console.log("Reservoir Area: " + area)

        const response = await fetch(`/api/selectArea/${encodeURIComponent(area)}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch area data');
        }
        
        const data = await response.json();  
        
        console.log(data.data); 
        setData(data.data)
    }

    return (
        <div className=''>

            <div className="drawer lg:drawer-open">
                
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex pt-24 pb-8 mx-8">
                    {/* Page content here */}

                    {/* <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden bg-base-300">View Areas</label> */}

                    <DisplayData area={selectedArea} data={data} />

                    <WeatherData area={selectedArea} weatherData={weatherData} />

                </div>

                <div className="drawer-side pt-16">
                    {/* <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> */}
                    {/* bg-base-300, border-r-2*/}
                    <ul className="menu bg-blue-400 text-base-content min-h-full w-80 p-4 border-r-2 border-base-300">
                    {/* Sidebar content here */}
                        
                        {/* Could have sidebar title here e.g. Reservoir locations or something like that */}

                        {/* UK */}
                        {/* Make Bigger */}
                        <button onClick={() => {if("UK" !== selectedArea) {console.log("UK"); setArea("UK");}}} className={`border-2 border-black mt-4 shadow-xl btn text-black bg-blue-300 hover:bg-blue-500 ${
                            // Highlights clicked button
                            "UK" === selectedArea ? "bg-blue-500" : "bg-blue-300"
                        }`}>UK</button>
                    
                        {/* Scotland */}
                        <div className="collapse collapse-arrow bg-white border-2 border-black mt-4 shadow-xl">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium text-black">Scotland</div>
                            <div className="collapse-content">
                                {areasScotland.map((area, index) => (
                                    <button onClick={() => {if(area !== selectedArea) {console.log(area); setArea(area);}}} className={`btn mb-1 w-full text-black bg-blue-300 hover:bg-blue-500 ${
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

                                    <div className="collapse collapse-arrow bg-white border-2 border-black mt-4 shadow-xl"  key={index}>
                                    <input type="checkbox" />
                                    <div className="collapse-title text-xl font-medium text-black">{area}</div>
                                    <div className="collapse-content">
                                        {areasEngland[index].map((a, i) => (
                                            <button onClick={() => {if(a !== selectedArea) {console.log(a); console.log(i); setArea(a);}}} className={`btn mb-1 w-full text-black bg-blue-300 hover:bg-blue-500 ${
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
                                    <button onClick={() => {if(area !== selectedArea) {console.log(area); setArea(area);}}} className={`btn mb-1 w-full text-black bg-blue-300 hover:bg-blue-500 ${
                                        // Highlights clicked button
                                        area === selectedArea ? "bg-blue-500" : "bg-blue-300"
                                    }`} key={index} value={area}>{area}</button>
                                ))}
                            </div>
                        </div>
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SelectArea