import { db } from "@/db";
import { waterLevels } from '../db/schema'
import SelectArea from "./components/SelectArea";

// Your dashboard should be able to give users the ability to view the UKs water levels as 
// a whole but also breakdown and display levels by region

// Have drop down menu for each area and display data for selected
export default function Home() {
  return (
    <div>
      <SelectArea />
    </div>
  );
}
