"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Motion values (no React re-render on every mouse move)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 2500,
    damping: 80,
    mass: 0.08,
  });

  const y = useSpring(mouseY, {
    stiffness: 2500,
    damping: 80,
    mass: 0.08,
  });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateDevice = () => {
      const desktop = media.matches;

      setIsTouchDevice(!desktop);

      if (desktop) {
        document.documentElement.style.cursor = "none";
      } else {
        document.documentElement.style.cursor = "auto";
      }
    };

    updateDevice();

    const updateCursor = (e: MouseEvent) => {
      const target = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null;

      const hovering = !!target?.closest(
        "button, a, [role='button'], input, textarea, select"
      );

      setIsHovering((prev) => (prev !== hovering ? hovering : prev));

      if (hovering) {
        // Sword hotspot (handle)
        mouseX.set(e.clientX - 10);
        mouseY.set(e.clientY - 46);
      } else {
        // Crosshair centered
        mouseX.set(e.clientX - 16);
        mouseY.set(e.clientY - 16);
      }
    };

    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => setIsMouseDown(false);

    if (media.matches) {
      window.addEventListener("mousemove", updateCursor, {
        passive: true,
      });

      window.addEventListener("mousedown", handleDown);
      window.addEventListener("mouseup", handleUp);
    }

    const handleMediaChange = () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);

      updateDevice();

      if (media.matches) {
        window.addEventListener("mousemove", updateCursor, {
          passive: true,
        });

        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", handleUp);
      }
    };

    media.addEventListener("change", handleMediaChange);

    return () => {
      document.documentElement.style.cursor = "auto";

      media.removeEventListener("change", handleMediaChange);

      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [mouseX, mouseY]);

  // Don't render on phones/tablets
  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      <motion.div
        className="fixed left-0 top-0"
        style={{
          x,
          y,
          rotate: isHovering ? (isMouseDown ? 28 : -15) : 0,
          scale: isMouseDown ? 0.92 : 1,
        }}
        transition={{
          rotate: {
            type: "spring",
            stiffness: 900,
            damping: 30,
          },
          scale: {
            type: "spring",
            stiffness: 900,
            damping: 30,
          },
        }}
      >
        <AnimatePresence mode="wait">
          {isHovering ? (
            <motion.img
              key="sword"
              src="/cursor.png"
              alt=""
              draggable={false}
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
              }}
              transition={{
                duration: 0.08,
              }}
              className="pointer-events-none h-14 w-14 select-none"
              style={{
                imageRendering: "pixelated",
                userSelect: "none",
              }}
            />
          ) : (
            <motion.img
              key="crosshair"
              src="/cursor.png"
              alt=""
              draggable={false}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
              }}
              transition={{
                duration: 0.08,
              }}
              className="pointer-events-none h-8 w-8 select-none"
              style={{
                imageRendering: "pixelated",
                userSelect: "none",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}