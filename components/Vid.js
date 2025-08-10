"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ResponsiveVideo = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full "> 

      {/* Video Container */}
      <div className="relative w-[380px] h-[500px] md:w-[1200px] md:h-[600px] rounded-2xl overflow-hidden md:mt-[150px]">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://res.cloudinary.com/dxlfxsimy/video/upload/v1740673418/byzhboxgz5tnbbmki5nb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <h3 style={{textShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)'}} className="tracking-[1px] text-center uppercase absolute bottom-20 left-1/2 transform -translate-x-1/2  text-white px-6 py-2   transition text-nowrap font-bold text-4xl">radiant skin</h3>
        <button onClick={() => router.push("/shop")} className="text-3x1 absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#1f1a17] text-white px-8 py-2 rounded-lg shadow-md  transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ResponsiveVideo;
