"use client";

import { motion } from "framer-motion";

export default function Home() {
  const cardVariants = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: (i) => ({
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  const images = [
    "https://res.cloudinary.com/dntdrlrse/image/upload/v1755434901/001z_vnz4xn.webp",
    "https://res.cloudinary.com/dntdrlrse/image/upload/v1755434901/001_gshyob.webp",
    "https://res.cloudinary.com/dntdrlrse/image/upload/v1755434901/001a_t875db.webp",
    "https://res.cloudinary.com/dntdrlrse/image/upload/v1755434901/001b_kx20v9.webp",
    "https://res.cloudinary.com/dntdrlrse/image/upload/v1755434901/001f_y9ch2u.webp",
    "https://res.cloudinary.com/dntdrlrse/image/upload/v1755434901/001c_i2jtf2.webp",
    "https://res.cloudinary.com/dntdrlrse/image/upload/v1755434901/001d_zoq9yg.webp",
    "https://res.cloudinary.com/dntdrlrse/image/upload/v1755434901/002_dktpbe.webp",
  ];

  return (
    <section
      className="container "
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <p className="goldenText">About Us</p>
      <p className="titlemymymy2abcd mb-10">Welcome to Zayana Hospitality</p>
      <p className="grText ">
        Zayana Hospitality is one of the industry's leading Third-party Hotel Management companies, operating hotels on behalf of owners to ensure that they maximize their returns from their assets.
      </p>
      <p className="grText mb-10  ">
        At Zayana Hospitality, we are dedicated to redefining service excellence in Lebanon, Nigeria and the Kingdom of Saudi Arabia.

        We can deliver on this promise because we are innovators, delivering exceptional and memorable experiences to our guests, while providing unparalleled returns on investment to our valued hotel owners.

      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column", 
          alignItems: "center",
        }}
      >
        {images.map((src, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={cardVariants}
            style={{
              perspective: "1000px",
              background: "#fff",
              borderRadius: "60px", 
              overflow: "hidden",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop:"2em"
            }}
          >
            <img
              src={src}
              alt={`Image ${i + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
