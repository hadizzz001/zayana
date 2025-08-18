"use client";

import { useState, useEffect } from "react";
import RoundedHoverButton1 from "./Bookbtn1";

export default function WhatWeDo() {
  const [rows, setRows] = useState([]);

  // Replace with your API endpoint
  const API_URL = "/api/services";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        // Take only first 4 items
        const formatted = data.slice(0, 4).map((item, index) => ({
          number: index + 1,
          title: item.title,
          text: item.description,
          img: item.img?.[0] || "",
        }));

        setRows(formatted);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

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
            <div className="hidden md:block"></div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 myBorder123123 justify-center">
              {row.img && (
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
              )}

              <div className="mobcenter">
                <h3 className="flex items-center justify-center md:justify-start text-2xl font-semibold text-[#e0dcd6]">
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
