'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="w-full sticky top-0"
        style={{
          background: '#f8f7f3',
        }}
      >
        <div className="px-4 flex items-center justify-between text-black relative mynavidhere">
          
          {/* Logo - left on mobile, left on desktop */}
          <div className="flex justify-start items-center">
            <a href="/">
              <img
                src="https://res.cloudinary.com/dntdrlrse/image/upload/v1754820849/logo_dsi854.webp"
                alt="Logo"
                className="h-15"
                style={{ maxHeight: '60px' }}
              />
            </a>
          </div>

          {/* Desktop menu - right on desktop */}
          <nav className="hidden sm:flex flex-1 justify-end items-center gap-10 text-lg font-bold">
            <a href="/" className="myNavLi  ">Home</a>
            <a href="/about" className="myNavLi  ">About</a>
            <a href="/services" className=" myNavLi  ">Services</a>
            <a href="/contact" className="myNavLi  ">Contact Us</a>
          </nav>

          {/* Hamburger - only on mobile, right */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex items-center space-x-2 sm:hidden"
          >
            <Menu className="w-6 h-6 stroke-[1]" id="myColorblack" />
          </button>
        </div>

        {/* Fullscreen Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center z-50 sm:hidden">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-4"
              aria-label="Close menu"
            >
              <X className="w-8 h-8 stroke-[1]" id="myColorblack" />
            </button>
            <nav className="flex flex-col items-center gap-6 mt-12 text-3xl font-bold">
              <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="/services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
