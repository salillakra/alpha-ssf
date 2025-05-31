"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    const cursor = cursorRef.current;

    // Track mouse position
    const updateMousePosition = (e) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    // Animate cursor with trailing effect
    const animateCursor = () => {
      // Create a lag effect by easing toward the mouse position
      cursorPosRef.current.x += (mousePositionRef.current.x - cursorPosRef.current.x) * 0.15;
      cursorPosRef.current.y += (mousePositionRef.current.y - cursorPosRef.current.y) * 0.15;

      gsap.set(cursor, {
        opacity: 1,
        x: cursorPosRef.current.x,
        y: cursorPosRef.current.y,
      });

      requestAnimationFrame(animateCursor);
    };

    window.addEventListener("mousemove", updateMousePosition);
    animateCursor(); // Start the animation loop

    // Hover effects
    const targets = document.querySelectorAll("a, button");

    const onEnter = (e) => {
      gsap.to(cursor, {
        scale: 1.8,
        duration: 0.4,
        ease: "elastic.out(1.2, 0.7)",
        borderWidth: 3,
      });
    };

    const onLeave = (e) => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.7)",
        borderWidth: 2,
      });
    };

    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed opacity-0 -top-5 -left-5 w-10 h-10 rounded-full border-2 border-indigo-500 mix-blend-difference pointer-events-none z-[9999] shadow-[0_0_12px_rgba(99,102,241,0.6)]"
    >
      <span className="absolute top-1/2 left-1/2 w-2 h-2 bg-indigo-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></span>
    </div>
  );
};

export default Cursor;
