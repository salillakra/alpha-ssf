"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import DirectorSection from "@/components/Hero";
import Background from "@/components/Background";
import HowWeWorkAndWhy from "@/components/HowWeWorkAndWhy";
import HowWeDo from "@/components/HowWeDo";
import AboutUs from "@/components/Aboutus";
import ContactUs from "@/components/Contactus";
import Footer from "@/components/Footer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HomePage = () => {
  const sectionRefs = {
    hero: useRef(null),
    howWeDo: useRef(null),
    howWeWorkAndWhy: useRef(null),
    aboutUs: useRef(null),
    contactUs: useRef(null),
  };

  useGSAP(() => {
    // Hero section fade in
    gsap.fromTo(
      sectionRefs.hero.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      }
    );

    // One-time reveal animations for other sections
    const sections = [
      sectionRefs.howWeDo.current,
      sectionRefs.howWeWorkAndWhy.current,
      sectionRefs.aboutUs.current,
      sectionRefs.contactUs.current,
    ];

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 70,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });

  return (
    <div className="w-full">
      <Background />
      <Cursor />
      <Navbar />
      <div
        ref={sectionRefs.hero}
        className="flex h-[90vh] items-center justify-center"
      >
        <DirectorSection />
      </div>
      <div ref={sectionRefs.howWeDo} className="mt-5">
        <HowWeDo />
      </div>
      <div ref={sectionRefs.howWeWorkAndWhy} className="mt-5">
        <HowWeWorkAndWhy />
      </div>

      {/* aboutus */}
      <div ref={sectionRefs.aboutUs} id="aboutus" className="mt-5">
        <AboutUs />
      </div>

      {/* contactus */}
      <div ref={sectionRefs.contactUs} id="contactus" className="mt-5">
        <ContactUs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
