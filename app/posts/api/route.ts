import Posts from "../../models/post";
import connectDB from "../../db/page";
import { NextResponse } from "next/server";
export async function GET(){
    try {
        await connectDB()
        let post= await Posts.find();
        return NextResponse.json(post)
    } catch (error) {
        console.log(error)
    }
   


}