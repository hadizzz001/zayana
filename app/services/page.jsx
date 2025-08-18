'use client';

import { useState, useEffect } from 'react';

export default function WhatWeDo() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/services'); // your API endpoint
        const data = await res.json();

        // Map all items
        const mappedRows = data.map((item, index) => ({
          number: index + 1,
          title: item.title,
          text: item.description,
          list: item.list || [],
          img: item.img[0] || '',
          paragraph: item.paragraph || '', // optional
        }));

        setRows(mappedRows);
      } catch (error) {
        console.error('Error fetching services:', error);
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
              {/* Image */}
              <div
                className="flex-shrink-0 relative mb-4 md:mb-0 rounded-lg overflow-hidden"
                style={{ width: '250px', height: '140px' }}
              >
                <img
                  src={row.img}
                  alt={row.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text */}
              <div className="mobcenter">
                <h3 className="flex items-center justify-center md:justify-start text-2xl font-semibold text-[#e0dcd6]">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full mr-2 numberT">
                    {row.number}
                  </div>
                  {row.title}
                </h3>
                <p className="grText">{row.text}</p>

                {/* Custom bullet list */}
                {row.list && row.list.length > 0 && (
                  <ul
                    style={{
                      color: '#666',
                      textAlign: 'left',
                      paddingLeft: '20px',
                      listStyleType: 'none',
                      marginTop: '20px',
                    }}
                  >
                    {row.list.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          position: 'relative',
                          paddingLeft: '30px',
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '12px',
                            height: '12px',
                            backgroundColor: '#CBAB58',
                            borderRadius: '50%',
                            display: 'inline-block',
                          }}
                        ></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Paragraph under the list */}
                {row.paragraph && <p className="grText mt-4">{row.paragraph}</p>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
