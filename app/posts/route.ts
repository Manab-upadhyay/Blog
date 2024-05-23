import Posts from "../models/post"
import connectDB from "../db/page"
import { NextRequest,NextResponse } from "next/server";


export async function POST(req:NextRequest){
try {
    await connectDB();
    let body= await req.json()
    console.log("inside the post req",body)
  
    let posts= new Posts({
        postid:body.postid,
        userid: body.userid,
        name:body.name,
        title: body.title,
content: body.post,
image: body.image
    })
    console.log("after saving")
    await posts.save()
    return Response.json({message:'Success'})
    
} catch (error) {
    return Response.json({error})
}

}
export async function GET() {
    try {
      await connectDB();
      console.log('Database connection established');
      let posts = await Posts.find();
  
      return NextResponse.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
  }