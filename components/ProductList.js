import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CarCard from './CarCard';
import { useRouter } from "next/navigation";

const YourComponent = () => {
    const [categories, setCategories] = useState({});
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/products', { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();

                // Group products by category
                const groupedData = data.reduce((acc, product) => {
                    const category = product.category || 'Uncategorized';
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(product);
                    return acc;
                }, {});

                setCategories(groupedData);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div className="ProvidersIfSelectedProductMatchesFilter mt-4">
            <>
                {/* Inline Styles */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center; }",
                    }}
                />

                <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL px-3" data-product-list-category="ymal-slider">
                    {Object.keys(categories).length > 0 ? (
                        Object.keys(categories).map((category) => (
                            <div key={category} className="mb-8">
                                {/* Title Section */}
                                <div className="flex items-center justify-between w-full">
                                    <h1 className="py-2 leading-[0rem] font-stretch-[66.66%] not-italic tracking-widest uppercase  transition text-nowrap font-bold text-3xl myBB">
                                        {category}
                                    </h1>
                                    <button id="mybbtn" className='myBB' onClick={() => router.push("/search?cat="+category)}>Shop All</button>
                                </div>
                                <div className="w-[70px] h-[5px] bg-[#1f1a17] mt-1 mb-5"></div>

                                {/* Swiper Section */}
                                {categories[category].length > 0 ? (
                                    <section className="mb-5" style={{ maxWidth: "100%" }}>
                                        <Swiper
                                            spaceBetween={20}
                                            loop
                                            autoplay={{ delay: 3000 }}
                                            breakpoints={{
                                                150: { slidesPerView: 2 },
                                                768: { slidesPerView: 4 },
                                            }}
                                        >
                                            {categories[category].map((temp) => (
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
                        ))
                    ) : (
                        <div className="home___error-container">
                            <h2 className="text-black text-xl font-bold">No products available</h2>
                        </div>
                    )}
                </div>
            </>
        </div>
    );
};

export default YourComponent;
