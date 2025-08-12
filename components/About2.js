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
                  <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            style={{ width: "50%" }}
            className="content-text"
          >
            <p className="aboutTit1" style={{ marginBottom: "20px" }}>
              What We Believe
            </p>
            <p className="grText">
              <b>People Are the Foundation:</b> Success begins with the right people in the right roles, fostering a happy, productive work environment.
<br/><br/>
<b>Leadership Should Inspire:</b> We reject unethical practices, embracing integrity, transparency, and accountability in everything we do.
<br/><br/>
<b>Innovation Is Key:</b> Staying relevant means evolving products, concepts, and services through continuous creativity.
<br/><br/>
<b>Sustainability Matters:</b> Our commitment to eco-friendly practices ensures we protect the planet while delivering exceptional results.
<br/><br/>
<b>Excellence Creates Value:</b> By prioritizing quality and customer satisfaction, we build loyalty and long-term success.

       
            </p>
          </motion.div>

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
              src="https://res.cloudinary.com/dntdrlrse/image/upload/v1755004961/hotel-reception-counter-desk-bell-skvalval_xschbi.jpg"
              alt="Company"
              style={{
                maxWidth: "80%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
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
