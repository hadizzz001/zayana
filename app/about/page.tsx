"use client";
import About1 from "@/components/About1";
import About2 from "@/components/About2";
import About3 from "@/components/About3";

export default function AboutUsBanner() {
  return (
    <div className="mb-[18em]">
      <div className="relative w-full h-[400px] overflow-hidden rounded-b-[50px]">
        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/dntdrlrse/image/upload/v1754932283/6893c3992efc37104b6347d9_6894d0917370c0ff0cbac10b_chs-about-us-video-720-poster-00001_fr0byh.jpg"
          alt="About Us Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <p className="aboutTit">Introduction of us</p>
        </div>
      </div>



      <About1 />
      <About2 />
      <About3 />






      </div >







      );
}
