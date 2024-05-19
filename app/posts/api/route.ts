import Posts from '../../models/post';
import connectDB from '../../db/page';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    console.log('Database connection established');
    let posts = await Posts.find();
    console.log('Posts fetched:', posts);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
