"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const MyCarousel = () => {
  const { scrollY } = useScroll();

  // Larger scroll range = slower movement
  const firstWordRaw = useTransform(scrollY, [0, 1200], [0, -600]);
  const secondWordRaw = useTransform(scrollY, [0, 1200], [0, 600]);

  // Smooth spring easing
  const springConfig = { stiffness: 30, damping: 20, mass: 1.5 };
  const firstWordX = useSpring(firstWordRaw, springConfig);
  const secondWordX = useSpring(secondWordRaw, springConfig);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/dntdrlrse/image/upload/v1754823703/6893c3992efc37104b6349cb_chs-header-01_syztoh.jpg"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      {/* Radial Mask Overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.7)_100%)]"></div>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col justify-center h-full text-left text-white px-4">
        {/* Subtitle */}
        {/* <h3 className="myBanTit1  ">
          THE ARCHITECTS OF
        </h3> */}

        {/* Big Title - stacked words */}
        {/* <div className="flex flex-col items-start leading-none">
          <motion.p
            style={{ x: firstWordX }}
            className="myBanTit"
          >
            zayana
          </motion.p>
          <motion.p
            style={{ x: secondWordX }}
            className="myBanTit"
          >
            HOSPITALITY
          </motion.p>
        </div> */}
      </div>
    </div>
  );
};

export default MyCarousel;
