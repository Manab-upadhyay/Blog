"use client";
import React, { useEffect, useState } from "react";
const calsans= require('cal-sans')

import Image from "next/image"
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../componets/blogui";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
const jwt= require('jsonwebtoken')






export default function TracingBeamDemo() {
  const [post, setPost] = useState();
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState(""); // Initialize with -1 to indicate no post is expanded

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/posts/api');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Response from API:', data);
        setPost(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const filteredPosts = post?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const renderContent = (content) => {
    const paragraphs = content.split('\n');
    return paragraphs.map((paragraph, index) => (
      <p key={`paragraph-${index}`} className={calsans.className}>
        {paragraph}
      </p>
    ));
  };

  const handleRead = (index) => {
    setExpandedIndex(index); // Update the expanded index to the clicked post index
  };

  return (
    <TracingBeam className="px-6 my-28 md:w-full w-72">
      <div className="max-w-2xl mx-auto antialiased pt-4 relative">
      <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        />
        {!searchTerm&&post?.map((item, index) => (
          <div key={index} className="mb-10 my-5">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{item.name.charAt(0)}</Avatar>
            <h1>Post By: {item.name}</h1>
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
            </div>
          </div>
        ))}
        {searchTerm&&filteredPosts?.map((item, index) => (
          <div key={index} className="mb-10">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{item.name.charAt(0)}</Avatar>
            <h1>Post By: {item.name}</h1>
            <p className={twMerge("text-xl mb-4")}>
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
            </div>
          </div>
        ))}
        
      </div>
    </TracingBeam>
  );
}

