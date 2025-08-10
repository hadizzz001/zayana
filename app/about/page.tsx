"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <section
        data-image-width={1980}
        data-image-height={1214}
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
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
            flexWrap: "wrap", // important for wrapping
          }}
        >
          {/* Left Side - Text */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
            style={{
              width: "50%",
              paddingRight: "20px",
            }}
            className="content-text"
          >
            <h5 className="myGray mytitle2" style={{ marginBottom: "20px" }}>
              About Company
            </h5>
            <p className="myGray" style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify"  }}>
              Scento d’Italia is a culturally rooted fragrance brand positioned
              for high-volume success in the MENA region and beyond. With a launch
              collection of Eau de Parfum priced under $7.00, the brand balances
              artisanal quality with commercial scalability. Inspired by Italian
              and French perfume traditions, Scento d’Italia blends trend-driven
              impressions, niche compositions, and exclusive SKUs to appeal to a
              broad demographic aged 15 to 75+. As a modern brand with humble
              character and global aspirations, it stands ready to scent the
              world—one bottle at a time.
            </p>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="content-image"
          >
            <img
              src="https://res.cloudinary.com/dciku5di2/image/upload/v1753876862/il_570xN.424794574_k1u5_hmxyzv.webp"
              alt="Company"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .content-text, .content-image {
            width: 100% !important;
            padding-right: 0 !important;
          }
          .content-text {
            order: 2; /* text goes under image */
            margin-top: 20px;
          }
          .content-image {
            order: 1; /* image stays first */
          }
        }
      `}</style>
    </>
  );
}
