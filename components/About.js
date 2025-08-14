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
    "https://cdn.prod.website-files.com/6893c3992efc37104b6347e4/6893c3992efc37104b634a84_6890e8f1e78cb348eb554ddf_chs-saudi-vision-2030-image-01.jpg",
    "https://cdn.prod.website-files.com/6893c3992efc37104b6347e4/6893c3992efc37104b634a83_6890e8f1e78cb348eb554dfd_chs-saudi-vision-2030-image-02.jpg",
    "https://cdn.prod.website-files.com/6893c3992efc37104b6347e4/6893c3992efc37104b634a68_6890e8f1e78cb348eb554e1c_chs-saudi-vision-2030-image-03.jpg",
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
      <p className="titlemymymy2abcd mb-10">Welcome to Zayana</p>
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
              width: "600px",
              height: "300px",
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
                objectFit: "cover",
                
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
