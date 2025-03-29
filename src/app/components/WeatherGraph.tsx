import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, defaults, TooltipItem } from "chart.js";
import { WeatherData } from "./WeatherData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;


export default function WeatherGraph({ weatherData }: { weatherData: WeatherData }) {

    const chartData = {
        labels: weatherData.Dates,
        datasets: [
            {
            label: "Precipitation (mm)",
            data: weatherData.Precipitation,
            backgroundColor: "rgba(65, 105, 225, 0.7)",
            },
            {
            label: "Evapotranspiration (mm)",
            data: weatherData.Evaporation,
            backgroundColor: "rgba(255, 165, 0, 0.7)",
            }
        ],
    };
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
        y: {
            title: { display: true, text: "Amount (mm)", ticks: {
                callback: function (value: number) {
                  return `${Math.round(value as number)}mm`;
                }} },
        },
        x: {
            title: { display: true, text: "Date" },
        },
        },
        plugins: {
            tooltip: {
            enabled: true,
            callbacks: {
                label: (context: TooltipItem<"bar">) => {
                const value = context.raw as number;
                return `${Math.round(value * 100) / 100} mm`;
                },
            }},
          },
    };

    return (
        <div className='w-full'>
            <div className="flex-grow w-full h-52 "> 
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}