"use client";
import React, { useEffect, useState } from "react";
const calsans = require('cal-sans');
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../componets/blogui";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Loading from "./loading";
const jwt = require('jsonwebtoken');

export default function TracingBeamDemo() {
  const [post, setPost] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setSignedIn(true);
        const decodedToken = jwt.decode(token);
        const email = decodedToken.email;
        console.log("email>>", email);

        try {
          const response = await fetch('/posts');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          const filteredData = data.filter(item => item.userid === email);
          console.log('Response from API:', filteredData);
          setPost(filteredData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
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

  const handleDelete = async (postid) => {
    try {
      const response = await fetch("/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postid }),
      });

      if (response.ok) {
        setPost((prevPosts) => prevPosts.filter(post => post.postid !== postid));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleRead = (index) => {
    setExpandedIndex(index);
  };

  return (
    <TracingBeam className="px-6 my-28 md:w-full w-72">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Loading />
        </div>
      ) : signedIn ? (
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {post?.length > 0 ? (
            post.map((item, index) => (
              <div key={index} className="mb-10">
                <Avatar>{item.title.charAt(0)}</Avatar>
                <p className={twMerge(calsans.className, "text-xl mb-4")}>{item.title}</p>
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
                    <div key={index}>{renderContent(item.content.slice(0, 300))}</div>
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
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(item.postid)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No blogs yet</p>
          )}
        </div>
      ) : (
        <div className="font-black text-center">Sign up/ login to see your blogs</div>
      )}
    </TracingBeam>
  );
}
