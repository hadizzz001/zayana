import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function OfferHeadline() {
  return (
    <div
      style={{
        backgroundColor: "#1f1a17",
        color: "white",
        fontSize: "14px",
        padding: "5px 0",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 99999999,
      }}
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide>
          <div style={{ textAlign: "center" }}>
            Worldwide shipping!
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ textAlign: "center" }}>
            Free Shipping on all orders above $50
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
