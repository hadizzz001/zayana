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
        <p className="goldenText">About Us</p>
        <p className="titlemymymy2abcd">Welcome to Zayana</p>
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
              src="https://res.cloudinary.com/dntdrlrse/image/upload/v1754936920/6893c3992efc37104b634a10_services-test_kkli5f.webp"
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
              is one of the industry's leading Third-party Hotel Management
              companies, operating hotels on behalf of owners to ensure that
              they maximize their returns from their assets. At Zayana
              Hospitality, we are dedicated to redefining service excellence in
              Lebanon, Nigeria and the Kingdom of Saudi Arabia. <br />
              <br />
              We can deliver on this promise because we are innovators,
              delivering exceptional and memorable experiences to our guests,
              while providing unparalleled returns on investment to our valued
              hotel owners. As the region’s leading end-to-end hospitality
              services provider, we manage a diverse and high-value asset
              portfolio that includes award-winning upscale hotels, residences,
              dynamic F&B outlets, and lifestyle venues. Our visionary approach
              to hospitality and asset management has solidified our reputation
              as a trusted partner for global brands and investors.
              <ul
                style={{
                  color: "#666",
                  textAlign: "left",
                  paddingLeft: "20px",
                  listStyleType: "none",
                  marginTop: "20px",
                }}
              >
                {[
                  "Hotel Management",
                  "Asset Management",
                  "Food & Beverage",
                  "Hotel Owner Services",
                ].map((item, index) => (
                  <li
                    key={index}
                    style={{
                      position: "relative",
                      paddingLeft: "30px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#CBAB58",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>
                    {item}
                  </li>
                ))}
              </ul>
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
