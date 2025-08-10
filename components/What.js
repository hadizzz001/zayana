"use client";
import Image from "next/image";
import RoundedHoverButton1 from './Bookbtn1';

export default function WhatWeDo() {
    const rows = [
        {
            number: 1,
            title: "Hospitality Management Solutions",
            text: "We provide full-scope management across operations, talent, finance, and service.",
            img: "https://cdn.prod.website-files.com/6893c3992efc37104b6347d9/6893c3992efc37104b6349d1_688b83114ba5e29ca3872c51_web-home-image-test-hosp.jpg",
        },
        {
            number: 2,
            title: "Creative Solutions",
            text: "We turn hospitality concepts into cohesive brands through, storytelling and design.",
            img: "https://cdn.prod.website-files.com/6893c3992efc37104b6347d9/6893c3992efc37104b6349d0_688b8326338dd8577f6ead52_web-home-image-test-creative.jpg",
        },
        {
            number: 3,
            title: "Real Estate Solutions",
            text: "Helping you reach your target audience effectively.",
            img: "https://cdn.prod.website-files.com/6893c3992efc37104b6347d9/6893c3992efc37104b6349d3_688b8373322cc77b23963a29_web-home-image-test-comp.jpg",
        },
        {
            number: 4,
            title: "Customer Support",
            text: "Providing top-notch service and assistance to clients.",
            img: "https://cdn.prod.website-files.com/6893c3992efc37104b6347d9/6893c3992efc37104b6349d2_688b834731e38d68b82a19f9_web-home-image-test-software.jpg",
        },
    ];

    return (
        <section className="mx-auto bg-black p-10 myWhatBack ">
            {/* First Row: Title */}
            <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-start mb-10 text-center md:text-left">
                <div>
                    <p className="what1">What We Do</p>
                </div>
                <div></div>
            </div>

            {/* Data Rows */}
            {rows.map((row) => (
                <div key={row.number}>
                    <div className="grid grid-cols-1 md:grid-cols-[25%_75%] gap-8 py-8">
                        {/* Left Column - empty on desktop, hidden on mobile */}
                        <div className="hidden md:block"></div>

                        {/* Right Column - Content */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 myBorder123123 justify-center">
                            {/* Image */}
                            <div
                                className="flex-shrink-0 relative mb-4 md:mb-0"
                                style={{
                                    width: "250px",
                                    height: "140px",
                                    borderRadius: "15px",
                                    overflow: "hidden",
                                    marginRight: "0",
                                }}
                            >
                                <img
                                    src={row.img}
                                    alt={row.title}
                                    width={250}
                                    height={140}
                                    className="object-cover rounded-lg"
                                />
                            </div>

                            {/* Text */}
                            <div className="text-center md:text-left">
                                <h3
                                    className="flex items-center justify-center md:justify-start text-2xl font-semibold"
                                    style={{ color: "#e0dcd6" }}
                                >
                                    <div className="w-5 h-5 flex items-center justify-center rounded-full mr-2 numberT">
                                        {row.number}
                                    </div>
                                    {row.title}
                                </h3>
                                <p className="grText">{row.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <center>
                <RoundedHoverButton1 />
            </center>
        </section>
    );
}
