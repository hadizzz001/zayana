import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CarCard from './CarCard'; // Ensure this component exists
import { useRouter } from "next/navigation";

const YourComponent = () => {
    const [allTemps, setAllTemps] = useState(); // Stores products per category
    const router = useRouter();
    useEffect(() => {
        fetchCategories();
    }, []);

const fetchCategories = async () => {
  try {
    const response = await fetch('/api/products5', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      setAllTemps(data.slice(0, 10));  // take only first 10 products
    } else {
      console.error('Failed to fetch categories');
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};






    return (
        <div className="ProvidersIfSelectedProductMatchesFilter mt-4">

            <content-block slug="product-page-wssb">
                <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL">

                    {allTemps && Object.keys(allTemps).length > 0 ? (

                        <>

                            <style dangerouslySetInnerHTML={{
                                __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center; }  "
                            }} />






                            <div className="  ProductTile-SliderContainer ProductTile-SliderContainer--YMAL px-3" data-product-list-category="ymal-slider">

                                <div className="flex items-center justify-between w-full">
                                    <h1 className="py-2 leading-[0rem] font-stretch-[66.66%] not-italic tracking-widest uppercase text-[#222] transition text-nowrap font-bold text-[16px] myGray">
                                        New Arrivals
                                    </h1>
                                    <button
                                        id='mybbtn'
                                        className='myGray  '
                                        onClick={() => router.push("/search?cat=yes")}
                                    >
                                        Shop All
                                    </button>
                                </div>
                                <div className="w-[70px] h-[5px] bg-[#1f1a17] mt-1 mb-5"></div>






                                {allTemps.length > 0 ? (
                                    <section className=' mb-5' style={{ maxWidth: "100%" }}>
                                        <Swiper
                                            modules={[Autoplay]} // Include Autoplay module
                                            spaceBetween={20}
                                            loop={true} // Enable looping
                                            autoplay={{
                                                delay: 2000, // 2 seconds delay
                                                disableOnInteraction: false, // Keeps autoplay even after interaction
                                            }}
                                            breakpoints={{
                                                150: {
                                                    slidesPerView: 2,
                                                },
                                                768: {
                                                    slidesPerView: 4,
                                                },
                                            }}
                                        >
                                            {allTemps.map((temp) => (
                                                <SwiperSlide key={temp.id}>
                                                    <CarCard temp={temp} />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </section>



                                ) : (
                                    <p>No products available in {category}</p>
                                )}
                            </div>
                        </>

                    ) : (
                        <div className="home___error-container">
                            <h2 className="text-black text-xl font-bold">No products available</h2>
                        </div>
                    )}
                </div>

            </content-block>
        </div>
    );
};

export default YourComponent;
