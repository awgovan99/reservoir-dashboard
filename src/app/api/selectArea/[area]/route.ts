import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { waterLevels } from '@/db/schema'
import { eq } from "drizzle-orm";

// Need this to allow code to be deployed
// Got from: https://github.com/vercel/next.js/discussions/72373
type Props = {
    params: Promise<{
      area: string;
    }>
  };

  //might remove message from data
export async function GET(req: NextRequest, { params }: Props) {

    const resolvedParams = await params
    const { area } = resolvedParams
   
    console.log("api: " + area)

    let res = {message: 'Invalid request', data: []}

    if(area !== "UK") {
        const qry = await db.select().from(waterLevels).where(eq(waterLevels.area, area));
        const data = JSON.parse(JSON.stringify(qry));
        res = { message: 'Data fetched successfully', data: data };
    }
    else if(area === "UK") {
        // First select:
        // Gets latest recording in each month from each area then takes the avg of all areas in each month
        // strftime('%Y-%m', date) gets the year and month from date.
        // MAX(date) get the most recent (MAX) date within each area and year-month group.
        // GROUP BY area, year_month groups data by area and year-month, getting the latest reading per month for each area.

        // Second select:
        // JOIN levels r ON r.area = l.area AND r.date = l.latest_date joins the original levels table (r) with latest_monthly_readings (l) to retrieve the 
        // actual water level (currentlvl) recorded on the latest_date for each area.
        // AVG(r.currentlvl) AS currentlvl gets the average of the latest recorded water levels across all areas for each month.
        // GROUP BY l.year_month groups by year_month so we get one row per month with the average of the latest readings.
        // ORDER BY l.year_month sorts results chronologically.

        const rawQuery = `
            WITH latest_monthly_readings AS (
                SELECT 
                    area,
                    strftime('%Y-%m', date) AS year_month,
                    MAX(date) AS latest_date
                FROM levels
                GROUP BY area, year_month
            )
            SELECT 
                AVG(r.currentlvl) AS currentlvl,
                l.year_month AS date     
            FROM latest_monthly_readings l
            JOIN levels r 
                ON r.area = l.area AND r.date = l.latest_date
            GROUP BY l.year_month
            ORDER BY l.year_month;
        `;

        const qry = await db.all(rawQuery)
        const data = JSON.parse(JSON.stringify(qry));
        res = { message: 'Data fetched successfully', data: data };
    }

    return NextResponse.json(res)
}