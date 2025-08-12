"use client";
import Image from "next/image";
import RoundedHoverButton1 from './Bookbtn1';

export default function WhatWeDo() {
    const rows = [
        {
            number: 1,
            title: "Hospitality Solutions",
            text: "Discover our full suite of services, from hotel management and F&B operations to innovative marketing and asset optimization. We deliver tailored solutions designed to maximize performance and deliver sustained success across every aspect of your hospitality business.",
            img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755004302/6893c3992efc37104b6349d1_688b83114ba5e29ca3872c51_web-home-image-test-hosp_dkhaht.jpg",
        },
        {
            number: 2,
            title: "Hotel Management",
            text: "Our world-class team of professionals offers centralized services, ensuring the highest levels of expertise and cost efficiency across all operations. With a focus on excellence, we provide tailored solutions to drive success at every level.",
            img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755004302/6893c3992efc37104b6349d3_688b8373322cc77b23963a29_web-home-image-test-comp_hgfrbu.jpg",
        },
        {
            number: 3,
            title: "Asset Management",
            text: "Zayana Hospitality's Asset Management team delivers tailored solutions throughout the hospitality life-cycle, aligning stakeholders with the owner's goals to drive successful partnerships, optimize asset value, and maximize returns through strategic initiatives. ",
            img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755004305/6893c3992efc37104b6349d0_688b8326338dd8577f6ead52_web-home-image-test-creative_trg8wo.jpg",
        },
        {
            number: 4,
            title: "Food and Beverage",
            text: "We bring a restaurateur’s approach to our food and beverage (F&B) outlets, ensuring every detail is meticulously crafted to deliver exceptional cuisine and exemplary service. From our Risen Artisan Bakeries to specialty restaurants, we design experiences that resonate with both guests and communities.",
            img: "https://res.cloudinary.com/dntdrlrse/image/upload/v1755004302/6893c3992efc37104b6349d2_688b834731e38d68b82a19f9_web-home-image-test-software_v1w1xg.jpg",
        },
    ];

    return (
<section className="mx-auto bg-black p-10 myWhatBack min-h-screen">
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
                {/* Left Column - empty on desktop */}
                <div className="hidden md:block"></div>

                {/* Right Column - Content */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 myBorder123123 justify-center">
                    {/* Image */}
                    <div
                        className="flex-shrink-0 relative mb-4 md:mb-0 rounded-lg overflow-hidden"
                        style={{ width: "250px", height: "140px" }}
                    >
                        <img
                            src={row.img}
                            alt={row.title}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Text */}
                    <div className="mobcenter">
                        <h3
                            className="flex items-center justify-center md:justify-start text-2xl font-semibold text-[#e0dcd6]"
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
