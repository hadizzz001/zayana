import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CarCard from './CarCard'; // Ensure this component exists

const YourComponent = () => {
    const [hotSaleItems, setHotSaleItems] = useState([]);
    const [allTemps1, setAllTemps1] = useState();

    useEffect(() => {
        fetchCategories();
        fetchCategories1();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/products', { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                const filteredData = data.filter(item => item.category === 'New Arrivals');
                setHotSaleItems(filteredData);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    const fetchCategories1 = async () => {
        try {
            const response = await fetch(`/api/hot`);
            if (response.ok) {
                const data = await response.json();
                setAllTemps1(data[0]);
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
                    {hotSaleItems.length > 0 ? (
                        <>
                            <style dangerouslySetInnerHTML={{
                                __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center; }"
                            }} />
                            <div className="ProductTile-SliderContainer px-3">
                                <div className="ProductTile-SliderContainer-Title br_text-3xl-serif br_text-white"
                                    style={{ textAlign: "left", fontSize: "1.3em", fontWeight: "bold", fontFamily: 'Manrope' }}>
                                    {/* {allTemps1 ? (
                                        <>
                                            <a style={{ color: 'red' }} href={`/search?cat=Hot Sale`}>{allTemps1.title}</a>
                                        </>



                                    ) : (
                                        <p>No products Title</p>
                                    )} */}
                                    <a   href={`/search?cat=New Arrivals`}>{allTemps1.title}</a>
                                    <span style={{ position: "absolute", right: "1em" }}>
                                        <svg fill="#000000" viewBox="0 0 24 24" width={42}>
                                            <path d="M3,12H21m-3,3,3-3L18,9" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                                <section className='mb-5' style={{ maxWidth: "100%" }}>
                                    <Swiper spaceBetween={5} loop breakpoints={{
                                        150: { slidesPerView: 3 },
                                        768: { slidesPerView: 6 },
                                    }}>
                                        <div className="home__cars-wrapper">
                                            {hotSaleItems.map((temp) => (
                                                <SwiperSlide key={temp.id}>
                                                    <CarCard temp={temp} />
                                                </SwiperSlide>
                                            ))}
                                        </div>
                                    </Swiper>
                                </section>
                            </div>
                        </>
                    ) : (
                        <div className="home___error-container">
                            <h2 className="text-black text-xl font-bold">No Hot Sale products available</h2>
                        </div>
                    )}
                </div>
            </content-block>
        </div>
    );
};

export default YourComponent;
