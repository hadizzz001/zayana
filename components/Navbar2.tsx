'use client';

import { useState } from 'react';
import Cart from "../components/Cart"
import { useBooleanValue } from '../app/context/CartBoolContext';
import { useCart } from '../app/context/CartContext';
import {
  Menu,
  X,
  Search,
  ShoppingCart,
} from 'lucide-react';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const { isBooleanValue, setBooleanValue } = useBooleanValue();



  const handleClickc = () => {
    var cartb = document.getElementById("cartid");
    var cartb2 = document.getElementById("cartid2");
    setBooleanValue(!isBooleanValue);
    if (cartb && cartb2) {
      if (isBooleanValue) {
        cartb2.className += " MiniCart_Cart-visible";
      }
      else {
        cartb2.classList.remove("MiniCart_Cart-visible");
      }
    }
  };





  return (

    <>
      <Cart />

      <header
        className="w-full sticky top-9"
        style={{
          background: '#ebe5d7',
        }}
      >
        <div className="px-4   flex items-center text-black relative mynavidhere">
          {/* Hamburger - only on mobile, left */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex items-center space-x-2"
          >
            <Menu className="w-6 h-6 stroke-[1]" id='myColorblack' />
          </button>

          {/* Logo - center on mobile, left on desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 flex justify-center sm:justify-start items-center flex-1 sm:flex-none">
            <a href="/">
              <img
                src="https://res.cloudinary.com/dciku5di2/image/upload/v1753716404/logo_hwwyis.webp"
                alt="Logo"
                className="h-24"
                style={{ maxHeight: '80px' }}
              />
            </a>
          </div>

          {/* Desktop menu - center on desktop */}
          <nav className="hidden sm:flex flex-1 justify-center items-center gap-10 text-lg font-bold" id='mynewNavNav'>
            <a href="/" className="hover:underline">Home</a>
            <a href="/about" className="hover:underline">About</a>
            <a href="/shop" className="hover:underline">Shop</a>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </nav>

          {/* Search & Cart - right on all screens */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            {/* Search */}
            <button onClick={() => setSearchOpen(true)} aria-label="Search" id='mySearchColor'>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 128 128"
                data-name="Layer 4"
                id="Layer_4"
                xmlns="http://www.w3.org/2000/svg"
                fill="#1f1a17"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <defs>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          ".cls-1{fill:#1f1a17;}.cls-2{fill:none;stroke:#1f1a17;stroke-miterlimit:10;stroke-width:10px;}"
                      }}
                    />
                  </defs>
                  <path
                    className="cls-1"
                    d="M78.39,26C92.05,26,102,36,102,49.61V68.8c0,13.66-9.92,23.57-23.58,23.57H59.2c-13.66,0-23.57-9.91-23.57-23.57V49.61A23.59,23.59,0,0,1,42.29,32.7,23.62,23.62,0,0,1,59.2,26H78.39m0-10H59.2C40,16,25.63,30.42,25.63,49.61V68.8C25.63,88,40,102.37,59.2,102.37H78.39C97.58,102.37,112,88,112,68.8V49.61C112,30.42,97.58,16,78.39,16Z"
                  />
                  <line className="cls-2" x1="20.83" x2="42.51" y1="107.17" y2="85.49" />
                </g>
              </svg>

            </button>
            {/* Cart */}
            <span onClick={handleClickc} className="menuicon">
              <svg
                version={1.0}
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 64 64"
                enableBackground="new 0 0 64 64"
                xmlSpace="preserve"
                fill="#1f1a17"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                <g id="SVGRepo_iconCarrier">
                  <polygon
                    fill="none"
                    stroke="black"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                    points="44,18 54,18 54,63 10,63 10,18 20,18"
                  />
                  <path
                    fill="none"
                    stroke="black"
                    strokeWidth={3}
                    strokeMiterlimit={10}
                    d="M22,24V11c0-5.523,4.477-10,10-10s10,4.477,10,10v13"
                  />
                </g>
              </svg>


              {cart && cart.length > 0 ? (
                <span className="MiniCart_CartIndicator_Badge1"></span>
              ) : (
                <div></div>
              )}
            </span>
          </div>
        </div>

        {/* Fullscreen Menu - only on mobile */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center z-50 sm:hidden">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-4"
              aria-label="Close menu"
            >
              <X className="w-8 h-8 stroke-[1]" id='myColorblack' />
            </button>
            <nav className="flex flex-col items-center gap-6 mt-12 text-3xl font-bold">
              <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
              <a href="/shop" onClick={() => setMenuOpen(false)}>Shop</a>
              <a href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
            </nav>
          </div>
        )}

        {/* Search Overlay */}
        {searchOpen && (
          <div className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center z-50">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-10 right-4"
              aria-label="Close search"
            >
              <X className="w-8 h-8 stroke-[1]" id='myColorblack' />
            </button>

            <form action={'/search'} method="get" className="searchOverlay">
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.6 36">
                  <path d="M35 32.6l-8.4-8.4A14.96 14.96 0 0 0 14.9 0C6.7 0 0 6.7 0 14.9s6.7 14.9 14.9 14.9c3.3 0 6.3-1.1 8.8-2.9l8.5 8.5c.4.4.9.6 1.4.6s1-.2 1.4-.6c.8-.8.8-2 0-2.8zM4 14.9C4 8.9 8.9 4 14.9 4s10.9 4.9 10.9 10.9-4.9 10.9-10.9 10.9S4 20.9 4 14.9z" />
                </svg>
              </button>

              <input
                type="text"
                name="q"
                placeholder="Search..."
                className="w-3/4 max-w-md text-2xl border-b-2 border-gray-400 outline-none py-2 text-center"
                autoFocus
              />
            </form>
          </div>
        )}

        {/* Cart Overlay */}
        {cartOpen && (
          <div className="fixed inset-0 bg-white text-black z-50 overflow-y-auto">
            <button
              onClick={() => setCartOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close cart"
            >
              <X className="w-8 h-8 stroke-[1]" />
            </button>
            <div className="mt-20 px-4">
              <Cart />
            </div>
          </div>
        )}
      </header>

    </>

  );
}