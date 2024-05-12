"use client";
const React = require("react");
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const MenuItem = ({
  setActive,
  active,
  item,
  children,
}) => {
  return (
    React.createElement("div", { className: "relative " },
      React.createElement(motion.p, { transition: { duration: 0.3 }, className: "cursor-pointer text-black hover:opacity-[0.9] dark:text-white" }, item),
      active !== null && (
        React.createElement(motion.div, { initial: { opacity: 0, scale: 0.85, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: transition },
          active === item && (
            React.createElement("div", { className: "absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4" },
              React.createElement(motion.div, { transition: transition, layoutId: "active", className: "bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl" },
                React.createElement(motion.div, { layout: true, className: "w-max h-full p-4" },
                  children
                )
              )
            )
          )
        )
      )
    )
  );
};

const Menu = ({
  setActive,
  children,
}) => {
  return (
    React.createElement("nav", {  className: "relative rounded-full boder border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6" },
      children
    )
  );
};

const ProductItem = ({
  title,
  description,
  href,
  src,
}) => {
  return (
    React.createElement(Link, { href: href, className: "flex space-x-2" },
    
      React.createElement("div", null,
        React.createElement("h4", { className: "text-xl font-bold mb-1 text-black dark:text-white" }, title),
        React.createElement("p", { className: "text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300" }, description)
      )
    )
  );
};

const HoveredLink = ({ children, ...rest }) => {
  return (
    React.createElement(Link, Object.assign({}, rest), children)
  );
};

module.exports = { MenuItem, Menu, ProductItem, HoveredLink };
