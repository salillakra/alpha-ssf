"use client";

import React, { useRef } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ContactUs = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gray-950 text-white py-20 px-6 sm:px-12"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Google Map */}
        <div className="w-full">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-800 bg-gray-900">
            <div className="aspect-w-16 aspect-h-9 w-full h-64 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14435.271821796216!2d86.9103964871582!3d25.24305580000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f04bd70b302819%3A0xcdf5b6de4e236b!2sTulsi%20Mishra%20Lane%20champanagar%20nathnagar%20Bhagalpur!5e0!3m2!1sen!2sin!4v1747175136024!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col justify-center gap-8 p-6 rounded-xl bg-gray-900/50 border border-gray-800 shadow-lg backdrop-blur-sm">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Get In Touch
          </h2>
          
          <div className="flex items-start gap-4 group transition-all duration-300 hover:bg-gray-800/40 p-3 rounded-lg">
            <div className="bg-indigo-500/20 p-2.5 rounded-full">
              <MapPin className="text-indigo-400 h-5 w-5" />
            </div>
            <div>
              <h3 className="text-indigo-300 font-medium mb-1">Our Location</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Ward No. 6, Tulsi Mishra Lane, Maghi Kali,<br />
                Champanagar, Nathnagar, Bhagalpur, Bihar – 812004
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 group transition-all duration-300 hover:bg-gray-800/40 p-3 rounded-lg">
            <div className="bg-indigo-500/20 p-2.5 rounded-full">
              <Phone className="text-indigo-400 h-5 w-5" />
            </div>
            <div>
              <h3 className="text-indigo-300 font-medium mb-1">Call Us</h3>
              <div className="text-gray-300 text-sm space-y-1">
                <p>+91 91990 79443</p>
                <p>+91 70045 09169</p>
                <p>+91 83406 20058</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 group transition-all duration-300 hover:bg-gray-800/40 p-3 rounded-lg">
            <div className="bg-indigo-500/20 p-2.5 rounded-full">
              <Mail className="text-indigo-400 h-5 w-5" />
            </div>
            <div>
              <h3 className="text-indigo-300 font-medium mb-1">Email Us</h3>
              <p className="text-gray-300 text-sm break-all mb-1">skumar801212@gmail.com</p>
              <p className="text-gray-300 text-sm break-all">sujeetsteelfabrication@gmail.com</p>
            </div>
          </div>
        </div>
        </div>
        {/* Aspect ratio utility for Tailwind CSS v2/v3 */}
      <style jsx>{`
        .aspect-w-16 {
          position: relative;
          width: 100%;
        }
        .aspect-w-16.aspect-h-9::before {
          content: "";
          display: block;
          padding-top: 56.25%;
        }
        .aspect-w-16.aspect-h-9 > * {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </section>
  );
};

export default ContactUs;
