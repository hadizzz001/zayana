'use client';
import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const NewsTicker = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('/api/brand');
        const data = await res.json();

        // Only take the first image of each brand
        const brandImages = data.map((item) => item.img[0]);
        setBrands(brandImages);
      } catch (error) {
        console.error('Error fetching brand data:', error);
      }
    };

    fetchBrands();
  }, []);

  // Loop the images for a continuous marquee effect
  const loopedImages = [...brands, ...brands];

  return (
    <div
      className="relative w-full py-2 mt-[2em] mb-[2em] overflow-hidden"
      style={{ position: 'relative' }}
    >
      <Marquee speed={60} gradient={false} pauseOnHover={false} direction="left">
        {loopedImages.map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '70px',
              filter: 'grayscale(100%) brightness(0%)',
              WebkitFilter: 'grayscale(100%) brightness(0%)',
            }}
          >
            <img
              src={src}
              alt={`brand-${index}`}
              style={{
                height: '80px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default NewsTicker;
