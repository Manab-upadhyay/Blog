"use client";
import React, { useEffect, useState } from "react";
const calsans= require('cal-sans')

import Image from "next/image"
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../componets/blogui";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';

const jwt= require('jsonwebtoken')





export default function TracingBeamDemo() {
 
  const [post, setPost] = useState();
  const [expandedIndex, setExpandedIndex] = useState(-1); // Initialize with -1 to indicate no post is expanded
const[sing, setsing]= useState(false)
  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token')
        if(token){
            setsing(true)
            const gettoken= jwt.decode(token)
            const id= gettoken.email
            console.log("email>>", id)
        
    

      try {
        const response = await fetch('/posts/api');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const filterdata= data.filter((item )=> item.userid==id)
        console.log('Response from API:', filterdata);
        setPost(filterdata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    };

    fetchData();
  }, []);


  const renderContent = (content) => {
    const paragraphs = content.split('\n');
    return paragraphs.map((paragraph, index) => (
      <p key={`paragraph-${index}`} className={calsans.className}>
        {paragraph}
      </p>
    ));
  };
  async function handdledelete(postid){

    const posts= {postid}
        try {
            const data = await fetch("http://localhost:3000/delete", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(posts),
              });
              window.location.reload()
            if (!data.ok) {
              throw new Error('Failed to fetch data');
            }
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
  const handleRead = (index) => {
    setExpandedIndex(index); // Update the expanded index to the clicked post index
  };

  return (
    <TracingBeam className="px-6 my-28 md:w-full w-72">
      {sing &&<div className="max-w-2xl mx-auto antialiased pt-4 relative">
        {post?.map((item, index) => (
          <div key={index} className="mb-10">
            
            <p className={twMerge(calsans.className, "text-xl mb-4")}>
              {item.title}
            </p>
            <div className="text-sm prose prose-sm dark:prose-invert">
              <img
                src={item?.image}
                alt="blog thumbnail"
                height="1000"
                width="1000"
                className="rounded-lg mb-10 object-cover"
              />
              {expandedIndex === index ? (
                <div key={index}>{renderContent(item.content)}</div>
              ) : (
                <div key={index}>{renderContent(item.content.slice(0, 1000))}</div>
              )}
              {expandedIndex !== index && (
                <p
                  key={`read-more-${index}`}
                  className="text-blue-700 cursor-pointer"
                  onClick={() => handleRead(index)}
                >
                  Read More
                </p>

              )}
<Button variant="outlined" startIcon={<DeleteIcon />}  onClick={() => handdledelete(item.postid)}>
        Delete
      </Button>
            </div>
          </div>
        ))}
      </div>}
      {!sing&&<div className="font-blac text-center ">sing up/ login to see your blogs</div>}
      {post?.length===0
        &&<p className="text-center">No blogs yet</p>
      }
    </TracingBeam>
  );
}

