import { NextRequest, NextResponse } from "next/server";
import { useParams } from "next/navigation";
import { db } from "@/db";
import { waterLevels } from '@/db/schema'
import { eq } from "drizzle-orm";


export async function GET(req: NextRequest, context: { params: { area: string } }) {
    
    // const url = req.nextUrl.searchParams
    // const qry = url.get('q')

    // const area = params.area
    const {area} = await context.params
    // const area = useParams();
    console.log("api: " + area)

    const message = `You sent the area: ${area}`;

    return NextResponse.json({ message });

    // let res = {message: 'Invalid request', data: {}}

    // if(area !== "UK") {
    //     res = {message: 'Invalid request',data: db.select().from(waterLevels).where(eq(waterLevels.area, area))}
    // }

    // return Response.json(res)
}