"use client";
import React from "react";
import { StickyScroll } from "../componets/scrool";
import Image from "next/image"
import img1 from "../../img.jpg"

const content = [
  {
    title: "Interactive Blogging",
    description:
      "Engage your readers with interactive blog posts. Create immersive experiences with multimedia content, interactive elements, and engaging storytelling. With our platform, you can captivate your audience and drive meaningful interactions.",
    content: (
      <div className="h-full md:w-full w-20 bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Interactive Blogging
      </div>
    ),
  },
  {
    title: "Visual Storytelling",
    description:
      "Bring your stories to life with visual storytelling. Use images, videos, and graphics to enhance your narrative and convey your message effectively. Our platform empowers you to create visually compelling blog posts that resonate with your audience.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={img1}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Content Management",
    description:
      "Manage your blog content effortlessly. Our platform offers robust content management tools that simplify the process of creating, editing, and publishing blog posts. Stay organized, maintain consistency, and enhance your productivity with streamlined content management.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Content Management
      </div>
    ),
  },
  {
    title: "Engagement Metrics",
    description:
      "Track engagement metrics and gain valuable insights into your audience. Our platform provides comprehensive analytics that help you understand reader behavior, measure performance, and optimize your content strategy. Make data-driven decisions and maximize the impact of your blog.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Engagement Metrics
      </div>
    ),
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="p-10 my-10 ">
      <StickyScroll content={content} />
    </div>
  );
}
