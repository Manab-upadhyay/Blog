import Posts from "../models/post"
import connectDB from "../db/page"
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
try {
    await connectDB();
    let body= await req.json()
    
    console.log(body)
    let posts= new Posts({
        postid:body.postid,
        userid: body.userid,
        name:body.name,
        title: body.title,
content: body.post,
image: body.image
    })
    await posts.save()
    return Response.json({message:'Success'})
    
} catch (error) {
    return Response.json({error})
}

}