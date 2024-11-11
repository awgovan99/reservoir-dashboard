import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { waterLevels } from '@/db/schema'
import { avg, eq } from "drizzle-orm";

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
        const qry = await db.select({
            currentlvl: avg(waterLevels.currentlvl),
            date: waterLevels.date
        }).from(waterLevels).groupBy(waterLevels.date);
        const data = JSON.parse(JSON.stringify(qry));
        res = { message: 'Data fetched successfully', data: data };
    }

    return NextResponse.json(res)
}