"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About Us", href: "#aboutus" },
  { name: "Contact", href: "#contactus" },
];

const Navbar = () => {
  const navbarRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      navbarRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
    <header
      ref={navbarRef}
      className="w-full fixed top-0 z-50 backdrop-blur-lg bg-white/10 border-b border-white/10 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={85}
              height={85}
              className="mr-2 translate-y-3"
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-white font-medium text-sm">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-indigo-400 transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              className="flex flex-col justify-between w-6 h-6 focus:outline-none group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span
                className={`h-0.5 w-full bg-white transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-white my-1 transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full bg-white transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden py-8 bg-gray-900/95 text-white absolute top-16 left-0 right-0 px-6 py-4 rounded-b-xl transition-transform duration-300 origin-top ${
          menuOpen ? "scale-y-100" : "scale-y-0"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <ul className="flex flex-col space-y-4 text-base font-medium">
          {navLinks.map((link) => (
            <li className="py-2" key={link.name}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block w-full hover:text-indigo-400 transition-colors duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
