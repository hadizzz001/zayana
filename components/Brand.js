'use client';
import Marquee from 'react-fast-marquee';

const staticImages = [
  'https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png',
  'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png',
];

const NewsTicker = () => {
  const loopedImages = [...staticImages, ...staticImages];

  return (
    <div
      className="relative w-full py-2 mt-[2em] mb-[2em] overflow-hidden "
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
