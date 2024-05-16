"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const jwt = require("jsonwebtoken");

export default function Compose() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(false);
  const router = useRouter();
useEffect(()=>{
  if (title.length >= 5 && post.length >= 5) {
    setDisable(true);
  } else {
    setDisable(false);
  }

})
  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "post") {
      setPost(value);
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set the image URL to be displayed
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }

  async function handlePost() {
    const token = localStorage.getItem("token");
    if (!token) {

      router.push("/login");
    } else {
     

 
      const decodedToken = jwt.decode(token);
     
      const name = decodedToken.name;
      const userid = decodedToken.email;
      const postid = Math.floor(Math.random() * 100000);
      const data = { title, post, image, postid, name, userid };

      try {
        const response = await fetch("/posts", {
          method: "POST",
          
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("result", result);
        if (result.message === "Success") {
          toast.success("You blog has been posted")
          router.push('/blogs');
        }
      } catch (error) {
        console.error("Error:", error);
      }
    
  }
  }

  return (
    <>
      <div>
        <div className="p-2 md:w-full w-96 my-32 rounded-md items-center">
          <div className="relative">
            <label htmlFor="title" className="text-sm text-black font-bold">
              Title
            </label>
            <textarea
              onChange={handleChange}
              value={title}
              id="title"
              name="title"
              className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>
        <div className="p-2 md:w-full w-96  rounded-md items-center">
          <div className="relative -my-32">
            <label htmlFor="post" className="text-sm text-black font-bold">
              Write Your Blog
            </label>
            <textarea
              onChange={handleChange}
              value={post}
              id="post"
              name="post"
              className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 h-60 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>
        <div className="mx-2.5 my-32 items-center">
          <label htmlFor="image" className="text-sm text-black font-bold">
            Upload Image
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="mx-2.5 my-32 items-center">
        <button  onClick={handlePost} class="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500" disabled={!disable}>Compose it</button>
      
     
          {!disable&&<div className="text-red-500">Enter the tittle and contenet  ,and content must have min 500 words!</div>}
        </div>
      </div>
    </>
  );
}
