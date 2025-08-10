'use client';

import React from 'react';

const MyCarousel = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden mb-20 mt-20">
      {/* Responsive Background Image */}
      <picture>
        {/* Desktop (1920x1080 crop) */}
        <source
          media="(min-width: 768px)"
          srcSet="https://res.cloudinary.com/dciku5di2/image/upload/v1753889591/wall_lzsvzo.webp"
        />
        {/* Mobile (1080x1920 crop) */}
        <img
          src="https://res.cloudinary.com/dciku5di2/image/upload/v1753889591/wall_lzsvzo.webp"
          alt="Sunny-Day Sale Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </picture>

      {/* Overlay Content - CENTERED */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-black  ">
        <h1 className="text-2xl font-bold uppercase animate-slideInLeft myWhite mytitle1"> 
            Brand Essence
        </h1>
        <p className="text-[11px] mt-4 animate-slideInLeft delay-200 text-white  ">
          Scento d’Italia is a Middle Eastern-born perfume brand
inspired by the timeless elegance of Italian and French perfumery. It blends the emotional richness of oriental
scents with the refined artistry of Europe’s fragrance
capitals. The brand is humble yet chic, designed to be a
companion to all—whether in a luxury boutique or a modestcorner shop. 
        </p>
     
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
