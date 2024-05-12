
"use client"
import gsap from "gsap";
import { useEffect,useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./componets/ui";
import NavbarDemo from "./navbar";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AuroraBackgroundDemo() {
 const [token,settoken]=useState()

useEffect(()=>{
  const tok= localStorage.getItem('token');
  if(tok){
    settoken(tok)
  }
 
})

function handdleclick(){
  localStorage.removeItem('token')
 
  window.location.reload()
  

}


  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center text-animation">
        Create Your Blogs
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        Empower Your Thoughts 
        </div>
       <Link href={"/compose"}> <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
        Create Now
        </button></Link>
       {!token&& <Link href={"/singup"}> <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
       Singup
        </button></Link>}
        {token&& <div> <button onClick={handdleclick}className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
       logout/Singout
        </button> </div>}
      </motion.div>
    </AuroraBackground>
  );
}
