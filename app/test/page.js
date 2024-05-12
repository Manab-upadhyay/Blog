"use client"

import { useState } from "react";

export default function ImageUpload() {
  const [image, setImage] = useState(null);

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
  console.log("image>>>>",image)

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Uploaded Image" style={{ maxWidth: "100%" }} />}
    </div>
  );
}
