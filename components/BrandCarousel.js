import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CarCard1 from './CarCard1'; // Ensure this component exists

const YourComponent = () => {
  const [allTemp2, setAllTemps2] = useState(); // Stores products per category

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/brand");
        const data = await response.json();
        setAllTemps2(data);
      } catch (error) {
        console.error("Error fetching the description:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <span className="ProvidersIfSelectedProductMatchesFilter  ">
      <content-block slug="product-page-wssb">

        <style dangerouslySetInnerHTML={{
          __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center;padding-bottom:10px} "
        }} />
        <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL px-3" data-product-list-category="ymal-slider">
          <div className="ProductTile-SliderContainer-Title br_text-3xl-serif br_text-white " style={{ textAlign: "left", textAlign: "left", fontSize: "1.3em", fontWeight: "bold", fontFamily: 'Manrope' }}>
            Our brands
            <span style={{ position: "absolute", right: "1em" }}><svg
              fill="#000000"
              viewBox="0 0 24 24"
              id="right-arrow"
              xmlns="http://www.w3.org/2000/svg"
              className="icon line"
              width={42}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path
                  id="primary"
                  d="M3,12H21m-3,3,3-3L18,9"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "1.5"
                  }}
                />
              </g>
            </svg>
            </span>
          </div>
          {allTemp2 && allTemp2?.length > 0 ? (
            <section style={{ maxWidth: "100%" }}>
              <Swiper spaceBetween={50} loop modules={[Autoplay]} autoplay={{
                delay: 2000,
                stopOnLastSlide: false,
                reverseDirection: true
              }} breakpoints={{
                150: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 6,
                },
              }}>
                <div className='home__cars-wrapper'>
                  {allTemp2.map((temp) => (
                    <SwiperSlide key={temp.id}><CarCard1 temp={temp} /></SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </section>
          ) : (
            <div className='home___error-container'>
              <h2 className='text-black text-xl dont-bold'>...</h2>
            </div>
          )}
        </div>
      </content-block>
    </span>
  );
};

export default YourComponent;
