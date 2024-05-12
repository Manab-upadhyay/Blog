"use client";
const React = require("react");
import { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./componets/navui";
import { cn } from "./util/cn";
import Link from "next/link";

export default function NavbarDemo() {
  return (
    React.createElement("div", { className: "relative w-full flex items-center justify-center" },
      React.createElement(Navbar, { className: "top-2" }),
     
    )
  );
}

 function Navbar({ className }) {
  const [active, setActive] = useState(null);
  return (
    <>



  <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
    <Menu setActive={setActive}>
      <Link href={'/home'}><MenuItem item="Home" /></Link>
     <Link href={'/myblogs'}> <MenuItem item="My Blogs" /></Link>
     <Link href={'/blogs'}> <MenuItem item="Blogs" /></Link>
    </Menu>
  </div>


    
    </>
  );
}


