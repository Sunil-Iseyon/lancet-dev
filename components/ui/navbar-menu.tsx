"use client";
import React from "react";
import { motion } from "motion/react";
import type { Transition } from "framer-motion";



const transition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  scrolled,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  scrolled?: boolean;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className={`cursor-pointer whitespace-nowrap ${scrolled ? "text-black" : "text-white"} hover:opacity-[0.9] text-base font-medium transition-colors relative group`}
      >
        {item}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
      </motion.p>
      {children && active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          <div className="absolute top-[calc(100%+1.2rem)] left-1/2 transform -translate-x-1/2">
            <motion.div
              transition={transition}
              layoutId="active"
              className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/20 dark:border-white/20 shadow-xl"
            >
              <motion.div
                layout
                className="w-max h-full p-4"
              >
                {children}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  scrolled,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  scrolled?: boolean;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className={`relative ${scrolled ? "text-black" : "text-white"} shadow-input flex justify-center space-x-6 px-8 py-4`}
    >
      {children}
    </nav>
  );
};



export const HoveredLink = ({ children, scrolled, ...rest }: any) => {
  return (
    <a
      {...rest}
      className={`${scrolled ? "text-black" : "text-neutral-700 dark:text-neutral-200"} hover:text-black`}
    >
      {children}
    </a>
  );
};
