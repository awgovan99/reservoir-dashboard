'use client';
import React from 'react'
import {BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip, defaults, ChartOptions} from 'chart.js/auto'
import {Line} from 'react-chartjs-2'

interface Data {
    currentlvl: number,
    area: string,
    date: string
}

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

// Might try chart.js instead cause this broky
export function WaterLevelGraph({ area, data }: { area: string, data: Data[] } ) {

    const chartData = {
        labels: data.map(d => d.date),
        datasets: [
            {
            label: 'Reservoir Level',
            data: data.map(d => Math.round(d.currentlvl)),
            pointRadius: 0,
            },
        ]
    };

    // Might move this to a new file for all chart options
    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        interaction: {mode: 'nearest', intersect: false,},
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
                // Changes text displayed on tooptip
                label: function (context) {
                  // Gets the value from the dataset
                  const value = context.raw as number;
                  return `${"Reservoir Level: " + Math.round(value)}%`; 
                },
              },
          },
          legend: {display: false}
        },
        scales: {
          x: {type: 'category',grid: {display: false}, title: { display: true, text: "Date" },},
          y: {type: 'linear', title: { display: true, text: "Reservoir Level (% at capacity)" }, ticks: {
                callback: function (value) {
                  return `${Math.round(value as number)}%`;
                }}},
        },
        elements: {
          line: {tension: 0.5, /* Makes line curve */},
        },
      };
    

    return (
        <div className='card pb-2 border-2 border-base-300 bg-white w-full h-[59%]'>
            <div className="card-body items-center text-center">
                <h1 className='card-title'>Reservoir Levels in {area}</h1>

                <div className='flex-grow pt-3 w-full'>
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>     
        </div>
    )
}