"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  perWordClassName = {},
}: {
  text: string;
  words: string[];
  duration?: number;
  perWordClassName?: Record<string, string>;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <>
      {text && (
        <motion.span
          layoutId="subtext"
          className="text-2xl font-bold tracking-tight drop-shadow-lg md:text-4xl"
        >
          {text}
        </motion.span>
      )}

      <motion.span
        layout
        className="relative inline-block max-w-full overflow-visible rounded-md border border-transparent bg-gradient-to-r from-[#27F579] via-[#20c46a] to-[#1a7a4a] px-4 py-2 font-sans text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#0a0b0a] shadow-sm ring shadow-[#27F579]/20 ring-[#27F579]/20 drop-shadow-lg"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            className={cn(
              "inline-block max-w-full whitespace-normal break-words",
              perWordClassName[words[currentIndex]]
            )}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};

