"use client";

import React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding or Copy */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} SSF – All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-5">
          <a
            href="https://www.instagram.com/sujeet_steel_fabricator?igsh=YXVqeWFzM3JrZjRj"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61576090302407"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/sujit-steel-fabricator-469150366"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/@SujeetSteelfabrication"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
