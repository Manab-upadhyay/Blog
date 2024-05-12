import Posts from "../models/post";
import connectDB from "../db/page";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        // Parse the request body to get the post ID
        const body = await req.json();
        console.log(body);

        // Find the post by ID and delete it
        const deletedPost = await Posts.findOneAndDelete({ postid: body.postid });
        if (!deletedPost) {
            return NextResponse.json({ error: "Post not found" });
        }

        console.log("Deleted Post:", deletedPost);
        return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        return NextResponse.json({ error: error.message });
    }
}
