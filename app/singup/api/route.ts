import Users from "../../models/user"
import connectDB from "../../db/page"
import { NextRequest } from "next/server";
var CryptoJS = require("crypto-js");
var jwt= require('jsonwebtoken')

export async function POST(req:NextRequest){

    try {
        await connectDB();
        let body= await req.json()
     
        let user=new Users({
            Name:body.fname+" "+ body.lname,
            Email:body.email,
      
     
    Password: CryptoJS.AES.encrypt(body.password, 'secretkey123').toString()

        })
        await user.save()
        var token = jwt.sign({ email: body.email, name: body.fname+body.lname }, 'secret_key', { expiresIn: '1h' });
        return Response.json({message:"Success", token:token})
        
    } catch (error) {
        return Response.json(error)
    }
}