"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const HowWeDo = () => {
  const sectionRef = useRef(null);
  const listRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      listRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.5,
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className=" text-white py-20 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <img
          src="/welder-working-night.jpg"
          alt="Welder working at night"
          className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl mb-12"
        />

        <h2 className="text-5xl font-extrabold text-indigo-500 mb-6">
          How We Do?
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
          Our process combines{" "}
          <strong className="text-white">meticulous planning</strong>,
          <strong className="text-white"> skilled engineering</strong>, and
          <strong className="text-white">
            {" "}
            efficient on-site execution
          </strong>{" "}
          to deliver robust, reliable construction.
        </p>

        <ul className="text-left max-w-3xl mx-auto space-y-5 text-gray-200 text-base leading-loose">
          {[
            "Surveyors visit the site, analyze requirements, and provide a precise material plan.",
            "Our engineers prepare detailed structural drawings if needed.",
            "Already have a plan? We begin execution immediately.",
            "Our team sets up a site camp, works under engineer supervision, and ensures rapid yet strong construction without compromising structural integrity.",
          ].map((item, index) => (
            <li
              key={index}
              ref={(el) => (listRef.current[index] = el)}
              className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-indigo-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HowWeDo;
