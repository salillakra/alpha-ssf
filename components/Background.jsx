import { gsap } from "gsap";
const { useGSAP } = require("@gsap/react");
import React, { useRef } from "react";

const Background = () => {
  const bubble1 = useRef(null);
  const bubble2 = useRef(null);
  const bubble3 = useRef(null);

  useGSAP(() => {
    const animateBubble = (el) => {
      gsap.to(el, {
        borderRadius: [
          "50% 50% 50% 50%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 70% 60% 40% / 50% 60% 40% 50%",
          "70% 30% 40% 60% / 60% 40% 30% 70%",
        ],
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    };

    [bubble1.current, bubble2.current, bubble3.current].forEach(animateBubble);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 w-full h-screen overflow-hidden bg-gray-950 text-white">
      {/* Morphing Gradient Bubbles */}
      <div className="absolute inset-0 z-0">
        <div
          ref={bubble1}
          className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-30 blur-3xl"
        />
        <div
          ref={bubble2}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500 to-red-400 opacity-30 blur-3xl"
        />
        <div
          ref={bubble3}
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-400 to-cyan-500 opacity-30 blur-3xl"
        />
      </div>

      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-black/40 z-10 backdrop-blur-sm" />
    </div>
  );
};

export default Background;
