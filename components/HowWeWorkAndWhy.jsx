"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const HowWeWorkAndWhy = () => {
  const sectionRef = useRef(null);
  const workRef = useRef(null);
  const whyRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" }
    );

    gsap.fromTo(
      [workRef.current, whyRef.current],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
        delay: 0.4,
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className=" text-white py-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-20 items-center">
        {/* HOW WE WORK */}
        <div
          ref={workRef}
          className="flex flex-col items-center text-center gap-6"
        >
          <h3 className="text-4xl font-extrabold text-indigo-500">
            How We Work
          </h3>
          <Image
            src="/factory-worker-working-warehouse-handling-metal-material-production.jpg"
            alt="How We Work"
            width={1920}
            height={1080}
            priority
            className="w-full h-auto max-w-4xl rounded-xl shadow-2xl"
          />

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            Every project begins with a thorough site visit to understand your
            unique needs. Our team evaluates the environment, materials, and
            scope, then prepares a precise plan covering costs, logistics, and
            timelines. If required, our engineers develop detailed structural
            drawings. Already have a design? We mobilize instantly. Once
            on-site, our team sets up a temporary operations base and begins
            execution under direct engineering supervision—ensuring unmatched{" "}
            <span className="text-white font-semibold">efficiency</span>,{" "}
            <span className="text-white font-semibold">durability</span>, and{" "}
            <span className="text-white font-semibold">safety</span>.
          </p>
        </div>

        {/* WHY US */}
        <div
          ref={whyRef}
          className="flex mt-16 flex-col items-center text-center gap-6"
        >
          <h3 className="text-4xl font-extrabold text-indigo-500">
            Why Choose SSF
          </h3>
          <Image
            src="/construction-site-silhouettes.jpg"
            alt="Why Choose SSF"
            width={1920}
            height={1080}
            priority
            className="w-full h-auto max-w-4xl rounded-xl shadow-2xl"
          />

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
            With over <span className="text-white font-semibold">17 years</span>{" "}
            of expertise and more than{" "}
            <span className="text-white font-semibold">
              500 successful projects
            </span>{" "}
            delivered across{" "}
            <span className="text-white font-semibold">
              Bihar, Jharkhand, West Bengal, Odisha, and J&K
            </span>
            , SSF has built a reputation as one of the most trusted fabrication
            firms in the region. Our journey from a modest iron shop to a
            government-recognized enterprise reflects our core values:{" "}
            <span className="text-white font-semibold">precision</span>,{" "}
            <span className="text-white font-semibold">accountability</span>,
            and{" "}
            <span className="text-white font-semibold">
              engineering excellence
            </span>
            . When you choose SSF, you're choosing a partner dedicated to{" "}
            <span className="text-white font-semibold">
              quality craftsmanship
            </span>
            , <span className="text-white font-semibold">timely delivery</span>,
            and{" "}
            <span className="text-white font-semibold">
              unbreakable structural integrity
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkAndWhy;
