import Posts from "../../models/post";
import connectDB from "../../db/page";
import { NextResponse } from "next/server";
export async function GET(){
    await connectDB();
    console.log('Database connection established');
    let posts = await Posts.find();
    console.log('Posts fetched:', posts);

    // Create response with no-cache headers
    const response = new NextResponse(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    });

    return response;

}