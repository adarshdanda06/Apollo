import { NextResponse } from "next/server"; 

 
export default async function GET(request: Request) {
    const { audioFileUrl } = await request.json();

    
}