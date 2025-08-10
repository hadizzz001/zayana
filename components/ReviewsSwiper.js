"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const reviews = [
  {
    name: "Rami Saab",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    stars: 5,
    text: "Truly outstanding service from start to finish!",
  },
  {
    name: "Diala Kassem",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    stars: 4,
    text: "Very helpful team, though the wait was a little long.",
  },
  {
    name: "Omar Daher",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    stars: 5,
    text: "Couldn’t have asked for a better experience.",
  },
  {
    name: "Tala Barakat",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    stars: 4,
    text: "Impressed by the professionalism and quality.",
  },
  {
    name: "Nadim Fakhoury",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    stars: 3,
    text: "Service was decent, but could be faster.",
  },
  {
    name: "Lina Daouk",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    stars: 5,
    text: "Everything went perfectly. Highly recommend!",
  },
  {
    name: "Hani Makarem",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    stars: 4,
    text: "Staff was courteous and the process was smooth.",
  },
  {
    name: "Joumana Rahme",
    image: "https://randomuser.me/api/portraits/women/36.jpg",
    stars: 5,
    text: "A flawless experience from beginning to end!",
  },
  {
    name: "Kamal Hariri",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    stars: 4,
    text: "Very satisfied. Would definitely return.",
  },
  {
    name: "Carla Yammine",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    stars: 5,
    text: "Above and beyond my expectations—thank you!",
  },
];


const ReviewsSwiper = () => {
  return (
    <div className="max-w-2xl mx-auto my-10"> 
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay , Navigation]}
        className="rounded-xl shadow-lg"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="bg-white p-5 rounded-lg   text-center">
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 mx-auto rounded-full mb-3"
            />
            <h3 className="font-semibold text-lg myGray">{review.name}</h3>
            <div className="flex justify-center my-2 myBB text-[20px]"  >
              {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
            </div>
            <p className=" myGray">{review.text}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsSwiper;
