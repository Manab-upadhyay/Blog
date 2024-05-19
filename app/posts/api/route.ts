import Posts from "../../models/post";
import connectDB from "../../db/page";
import Posts from '../../models/post';
import connectDB from '../../db/page';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    console.log('Database connection established');
    let posts = await Posts.find();
    console.log('Posts fetched:', posts);

    // Create a response object with the posts and a message
    const responseObject = {
      message: 'Refetched data successfully',
      posts,
    };

    // Create response with no-cache headers
    const response = new NextResponse(JSON.stringify(responseObject), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
