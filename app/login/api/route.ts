import connectDB from "../../db/page";
import { HttpStatusCode } from 'axios';
import User from "../../models/user"
import { NextRequest, NextResponse } from 'next/server';

var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

export async function POST(req: NextRequest) {
    try {
       await connectDB();
        const body = await req.json();
        console.log(body)

        let user = await User.findOne({ "Email": body.email });
        if (user) {
            var bytes = CryptoJS.AES.decrypt(user.Password, 'secretkey123');
        
            var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    

            if (body.email == user.Email && body.password == decryptedData) {
                var token = jwt.sign({ email: user.Email, name: user.Name }, 'secret_key', { expiresIn: '1h' });
                return Response.json({
                    status: 200,
                    user,
                    body: { message: 'Success' },
                    token: token 
                });

            } else {
                return Response.json({
                    status: 400,
                    user,
                    body: { message: 'Invalid credentials' }
                });
            }
        } else {
            return Response.json({
                status: 400,
                user,
                body: { message: 'No user found' }
            });
        }
    } catch (error) {
        console.error(error);
        return Response.json({
            status: 400,
            body: { message: "Error" }
        });
    }
}
