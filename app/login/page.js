"use client"
import React, { useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@mui/joy";
import { cn } from "../util/cn";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useState } from "react";
export default function SignupFormDemo() {
  const[fname,setfname]= useState();
  const[lname,setlname]= useState();
  const[email,setemail]=useState();
  const[password,setpassword]=useState();
  const [token,settoken]=useState()
  
useEffect(()=>{
    const tok = localStorage.getItem('token')
    if(tok){
      settoken(tok)
    }
})
  const router= useRouter()
  function handdlechange(e){
if(e.target.name=='password'){
  setpassword(e.target.value)
}

if(e.target.name=='email'){
  setemail(e.target.value)
}

  }
 async function handdleclick(e){
  e.preventDefault();

  if(!token){
  const data= {email,password};
  try {
    const response = await fetch("http://localhost:3000/login/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result= await response.json();
    console.log("result",result);
    if(result.body.message=='Success'){
      toast.success("Your logged in ")
      const token= result.token;
      localStorage.setItem('token',token)
router.push('/compose')
    }
    if(result.body.message=='Invalid credentials'){
        toast.error("Invalid credentials ")
        
      }
      if(result.body.message=='No user found'){
        toast.error("No user found ")
       
      }
  } catch (error) {
    console.log("error", error)
  }
}
}

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
     
  <h1 className="my-20 text-black font-bold text-center">Login</h1>

      <form className="my-8" >
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
       
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" name="email" required="true"  onChange={handdlechange} value={email}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" name="password" required="true" onChange={handdlechange} value={password}/>
        </LabelInputContainer>
      
            <BottomGradient />
             

      
       {!token&& <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
 
        onClick={handdleclick}>
       Login 
          <BottomGradient />
        </button>}
       {!token &&<p><ul className="text-center font-light">Dont have an account</ul></p>}
        {!token&&<Link href={'/singup'}><button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
 
       >
       Singup 
          <BottomGradient />
        </button></Link>}
        {token&&<div className="text-center font-light">You are alreary loggedin/Singed in</div>}

        
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0
bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
</>
);
};

const LabelInputContainer = ({ children, className }) => {
return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};


