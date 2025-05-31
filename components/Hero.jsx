"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const decorRef1 = useRef(null);
  const decorRef2 = useRef(null);
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const dividerRef = useRef(null);
  const paragraphRef = useRef(null);

  useGSAP(() => {
    // Create a timeline for better sequencing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    
    // Sequence the animations
    tl.from(sectionRef.current, { 
      opacity: 0, 
      y: 100, 
      duration: 1, 
      ease: "power3.out" 
    })
    .from(imageRef.current, { 
      opacity: 0, 
      scale: 0.8, 
      duration: 0.8, 
      ease: "back.out(1.7)" 
    }, "-=0.5")
    .from(titleRef.current, { 
      opacity: 0, 
      y: 20, 
      duration: 0.6, 
      ease: "power2.out" 
    }, "-=0.3")
    .from(nameRef.current, { 
      opacity: 0, 
      y: 20, 
      duration: 0.6, 
      ease: "power2.out" 
    }, "-=0.4")
    .from(dividerRef.current, { 
      width: 0, 
      duration: 0.8, 
      ease: "power2.inOut" 
    }, "-=0.3")
    .from(paragraphRef.current, { 
      opacity: 0, 
      y: 20, 
      duration: 0.8, 
      ease: "power2.out" 
    }, "-=0.5");
    
    // Floating animation for image with subtle rotation
    gsap.to(imageRef.current, {
      y: 15,
      rotation: 1,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    
    // Subtle glow pulse for text container
    gsap.to(textRef.current, {
      boxShadow: "0 0 40px rgba(6, 182, 212, 0.3)",
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });
    
    // Enhanced decorative elements animation
    gsap.to(decorRef1.current, {
      rotate: 360,
      scale: 1.2,
      opacity: 0.7,
      duration: 30,
      ease: "none",
      repeat: -1
    });
    
    gsap.to(decorRef2.current, {
      rotate: -360,
      scale: 1.3,
      opacity: 0.8,
      duration: 25,
      ease: "none",
      repeat: -1
    });
    
  }, []);

  return (
    <section 
    id="hero"
      ref={sectionRef}
      className="relative my-20 mx-4 sm:mx-8 rounded-2xl overflow-hidden"
    >
      {/* Background with dark theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 z-0"></div>
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-filter backdrop-blur-sm z-0"></div>
      
      {/* Decorative elements */}
      <div ref={decorRef1} className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"></div>
      <div ref={decorRef2} className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          {/* Director Image with improved styling */}
          <div 
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-[0_0_30px_rgba(14,165,233,0.4)] border-4 border-slate-700/50 flex-shrink-0 transition-all duration-300 hover:shadow-[0_0_40px_rgba(14,165,233,0.6)]"
          >
            <div className="w-full z-50  h-full bg-gradient-to-br from-slate-800/50 to-transparent ">
              <Image
                width={500}
                height={500}
                src="/sujeet.jpeg"
                alt="Mr. Sujeet Kumar"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Text Content with glass card effect */}
          <div 
            ref={textRef}
            className="flex-1 text-center md:text-left p-6 rounded-xl backdrop-blur-sm bg-slate-800/30"
          >
            <h2 
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 drop-shadow-lg"
            >
              Our Respected Director
            </h2>
            <p 
              ref={nameRef}
              className="text-xl sm:text-2xl font-semibold mb-2 text-cyan-100"
            >
              Mr. Sujeet Kumar
            </p>
            <div className="flex justify-center md:justify-start mb-4">
              <span 
                ref={dividerRef}
                className="inline-block w-20 h-1 rounded bg-gradient-to-r from-cyan-400 to-emerald-400"
              ></span>
            </div>
            <p 
              ref={paragraphRef}
              className="text-gray-200 leading-relaxed text-base sm:text-lg md:text-xl"
            >
              With a vision rooted in excellence and innovation, Mr. Sujeet Kumar
              leads our organization with integrity, strategic foresight, and a
              deep commitment to empowering individuals and communities. His
              leadership continues to inspire growth and sustainability across all
              levels of our operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
