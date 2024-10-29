import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { waterLevels } from '@/db/schema'
import { eq } from "drizzle-orm";


export async function GET(req: NextRequest, context: { params: { area: string } }) {
    
    const {area} = await context.params
   
    console.log("api: " + area)

    let res = {message: 'Invalid request', data: []}

    if(area !== "UK") {
        const qry = await db.select().from(waterLevels).where(eq(waterLevels.area, area));
        const data = JSON.parse(JSON.stringify(qry));
        res = { message: 'Data fetched successfully', data: data };
    }

    return NextResponse.json(res)
}