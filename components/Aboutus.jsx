"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const AboutUs = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="text-white py-12 px-4 sm:py-16 sm:px-8 md:py-20 md:px-12"
    >
      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-500">
          About Us
        </h2>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          SSF (Steel Structure Fabrication) is a leading structural fabrication
          firm built on a foundation of vision, resilience, and expertise. Our
          journey began in{" "}
          <span className="text-white font-semibold">2008</span> when our
          founder and director,{" "}
          <span className="text-white font-bold">Mr. Sujeet Kumar</span>,
          initiated fabrication work in{" "}
          <span className="text-white font-semibold">Jammu & Kashmir</span>.
          With a bold entrepreneurial spirit, he later migrated to{" "}
          <span className="text-white font-semibold">Bihar</span>, where he
          formally established and registered SSF in{" "}
          <span className="text-white font-semibold">2012</span>.
        </p>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Today, SSF is a recognized name across multiple states, backed by a
          strong team of over{" "}
          <span className="text-white font-semibold">
            50 skilled professionals
          </span>{" "}
          and a proven track record of delivering more than{" "}
          <span className="text-white font-semibold">
            500 successful projects
          </span>
          . From industrial sheds to complex steel structures, our work is
          defined by{" "}
          <span className="text-white font-semibold">
            precision engineering
          </span>
          , <span className="text-white font-semibold">timely execution</span>,
          and{" "}
          <span className="text-white font-semibold">
            uncompromising quality
          </span>
          .
        </p>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          With deep-rooted values and a future-focused mindset, we continue to
          serve industries, infrastructure, and communities with pride and
          purpose. At SSF, we don't just build steel structures—we build lasting
          trust.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
