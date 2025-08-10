// "use client";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
 
import { useState, useEffect } from "react";







const Review =   () => {
    const [allTemp, setTemp] = useState<any>()
 
    useEffect(() => {
     fetchProducts(); 
   }, []);
   
   const fetchProducts = async () => {
     const response = await fetch('/api/rate');
     if (response.ok) {
       const data = await response.json();
       setTemp(data);
     } else {
       console.error('Failed to fetch products');
     }
   };












    return (
        <div style={{ marginTop: "1em", marginBottom: "1em" }}>
            <Carousel autoPlay infiniteLoop interval={3000} showArrows={false} showStatus={false} showIndicators={false} showThumbs={false} >
                {allTemp && allTemp?.length > 0 ? (

                    allTemp.map((post: any) => (
                        <div>
                            <center>
                                <article className='container' style={{maxWidth: "500px"}}>
                                    <div className="flex items-center mb-4" style={{ display: "inline" }}>
                                        <img className="w-20 h-20 rounded-full" src="https://www.svgrepo.com/show/527946/user-circle.svg" alt="" />
                                        <div className="font-medium myBB">
                                            <p>{post.name}</p> 
                                        </div>
                                    </div>


                                    {Array.from({ length: post.stars }, (_, index) => (
                                        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse" style={{ display: "inline-flex" }}>
                                            <svg className="w-6 h-6 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </div>

                                    ))}





                                    <p className="mb-2 text-gray-500 dark:text-gray-400">{post.description}</p>

                                </article>
                            </center>
                        </div>
                    ))


                ) : (
                    <div className='home___error-container'>
                        <h2 className='text-black text-xl dont-bold'>...</h2>

                    </div>
                )

                }

            </Carousel>
        </div>

    );
};

export default Review;
