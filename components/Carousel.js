"use client";

import React from "react";

const MyCarousel = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Radial Mask Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none 
        bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.7)_100%)]">
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-4 text-left text-white container">
        <h3 className="text-2xl font-bold uppercase animate-slideInLeft mytitle1">
          Hot Sale
        </h3>
        <p className="text-[14px] mt-2 animate-slideInLeft delay-200">
          Offer with up to 50% off on our categories!
        </p>
        <a href="/shop" className="myGray mybtn1">
          Shop Now!
        </a>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default MyCarousel;
