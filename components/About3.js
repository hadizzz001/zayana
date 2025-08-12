"use client";

import { motion } from "framer-motion";

export default function Home() {
  // Reuse the rotateX card animation from the first example
  const cardVariants = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: {
      rotateX: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Top heading */}
      <section
        className="container mt-20"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p className="goldenText">Our Story</p>
        <p className="titlemymymy2abcd">More About Zayana</p>
      </section>

      {/* Main content */}
      <section 
        style={{
          display: "flex",
          width: "100%", 
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "1200px",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Image with 3D rotate animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={cardVariants}
            style={{
              perspective: "1000px", 
              borderRadius: "20px",
              overflow: "hidden",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="content-image"
          >
            <img
              src="https://res.cloudinary.com/dntdrlrse/image/upload/v1755004302/6893c3992efc37104b6349d3_688b8373322cc77b23963a29_web-home-image-test-comp_hgfrbu.jpg"
              alt="Company"
              style={{
                maxWidth: "80%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </motion.div>

          {/* Text section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            style={{ width: "50%" }}
            className="content-text"
          >
            <p className="aboutTit1" style={{ marginBottom: "20px" }}>
              Zayana Hospitality
            </p>
            <p className="grText">
Zayana Hospitality is driven by the belief that exceptional guest experiences, empowered teams, and strong financial performance are intrinsically linked. Our highly experienced hospitality team brings decades of industry knowledge to every facet of our operations, ensuring best-in-class service, operational efficiency, and innovative guest offerings.
              <br />              <br />
Our dynamic culture celebrates collaboration, innovation, and continuous growth, creating an environment where people thrive and excellence is a shared pursuit. This synergy equips us with deep market insights and a comprehensive understanding of hospitality assets - advantages that directly enhance the performance of the hotels we manage.
  
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mobile layout adjustments */}
      <style>{`
        @media (max-width: 768px) {
          .content-text, .content-image {
            width: 100% !important;
            padding-right: 0 !important;
          }
          .content-text {
            order: 2;
            margin-top: 20px;
          }
          .content-image {
            order: 1;
          }
        }
      `}</style>
    </>
  );
}
