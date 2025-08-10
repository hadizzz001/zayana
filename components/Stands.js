"use client"
import Script from 'next/script'
import { useState, useEffect } from "react";
import { fetchTemp1} from '../utils'

export default function Test() {
  const defaultBgImage = 'https://ucarecdn.com/89550036-3e93-49ec-af7e-ef9043cae270/ha.webp';
  const hoverBgImage = 'https://res.cloudinary.com/duppvjinz/image/upload/v1712060162/fyfvqc5ewr2aqccfsflp.webp';

  const defaultBgImage1 = 'https://ucarecdn.com/3ae384bd-5669-462c-8a2a-0654fcf03067/oa.webp';
  const hoverBgImage1 = 'https://res.cloudinary.com/duppvjinz/image/upload/v1712059955/sa4bgzzhte0ycx5leejc.webp';

  const defaultBgImage2 = 'https://ucarecdn.com/37cd4780-cfcc-4b01-a560-9e17ea673787/ofa.webp';
  const hoverBgImage2 = 'https://res.cloudinary.com/duppvjinz/image/upload/v1712059955/en6tiwnle1k7jed0jam8.webp';

  const defaultBgImage3 = 'https://ucarecdn.com/aec52b90-b3cf-4840-92e8-c213c72f9e73/ma.webp';
  const hoverBgImage3 = 'https://res.cloudinary.com/duppvjinz/image/upload/v1712059955/yrt9da39oomvcjklvi6c.webp';


  const [bgImage, setBgImage] = useState(defaultBgImage);
  const [bgImage1, setBgImage1] = useState(defaultBgImage1);
  const [bgImage2, setBgImage2] = useState(defaultBgImage2);
  const [bgImage3, setBgImage3] = useState(defaultBgImage3);
  const [allTemp, setTemp] = useState()
  let b



  const a = async () => {
    b = await fetchTemp1("Household")
    setTemp(b)
  }
  useEffect(() => {
    a()
  }, [])









  return (
    <>

      <style
        data-shopify=""
        dangerouslySetInnerHTML={{
          __html:
            '\n    :root {\n      --scrollbar-width: 0px;\n\n\n      --COLOR-VIDEO-BG: #cecec4;\n\n\n      --COLOR-BG: #dadad2;\n      --COLOR-BG-TRANSPARENT: rgba(218, 218, 210, 0);\n      --COLOR-BG-SECONDARY: #dadad2;\n      --COLOR-BG-RGB: 218, 218, 210;\n\n      --COLOR-TEXT-DARK: #000000;\n      --COLOR-TEXT: #212121;\n      --COLOR-TEXT-LIGHT: #595956;\n\n\n      /* === Opacity shades of grey ===*/\n      --COLOR-A5: rgba(33, 33, 33, 0.05);\n      --COLOR-A10: rgba(33, 33, 33, 0.1);\n      --COLOR-A15: rgba(33, 33, 33, 0.15);\n      --COLOR-A20: rgba(33, 33, 33, 0.2);\n      --COLOR-A25: rgba(33, 33, 33, 0.25);\n      --COLOR-A30: rgba(33, 33, 33, 0.3);\n      --COLOR-A35: rgba(33, 33, 33, 0.35);\n      --COLOR-A40: rgba(33, 33, 33, 0.4);\n      --COLOR-A45: rgba(33, 33, 33, 0.45);\n      --COLOR-A50: rgba(33, 33, 33, 0.5);\n      --COLOR-A55: rgba(33, 33, 33, 0.55);\n      --COLOR-A60: rgba(33, 33, 33, 0.6);\n      --COLOR-A65: rgba(33, 33, 33, 0.65);\n      --COLOR-A70: rgba(33, 33, 33, 0.7);\n      --COLOR-A75: rgba(33, 33, 33, 0.75);\n      --COLOR-A80: rgba(33, 33, 33, 0.8);\n      --COLOR-A85: rgba(33, 33, 33, 0.85);\n      --COLOR-A90: rgba(33, 33, 33, 0.9);\n      --COLOR-A95: rgba(33, 33, 33, 0.95);\n\n      --COLOR-BORDER: rgb(235, 235, 226);\n      --COLOR-BORDER-LIGHT: #e4e4dc;\n      --COLOR-BORDER-HAIRLINE: #d3d3ca;\n      --COLOR-BORDER-DARK: #c1c1a6;\n      /* === Bright color ===*/\n      --COLOR-PRIMARY: #ffffff;\n      --COLOR-PRIMARY-HOVER: #d9d9d9;\n      --COLOR-PRIMARY-FADE: rgba(255, 255, 255, 0.05);\n      --COLOR-PRIMARY-FADE-HOVER: rgba(255, 255, 255, 0.1);\n      --COLOR-PRIMARY-OPPOSITE: #000000;\n\n\n      /* === Secondary Color ===*/\n      --COLOR-SECONDARY: #5b2a14;\n      --COLOR-SECONDARY-HOVER: #1e0c04;\n      --COLOR-SECONDARY-FADE: rgba(91, 42, 20, 0.05);\n      --COLOR-SECONDARY-FADE-HOVER: rgba(91, 42, 20, 0.1);\n      --COLOR-SECONDARY-OPPOSITE: #ffffff;\n\n\n      /* === link Color ===*/\n      --COLOR-LINK: #212121;\n      --COLOR-LINK-HOVER: #5b2a14;\n      --COLOR-LINK-FADE: rgba(33, 33, 33, 0.05);\n      --COLOR-LINK-FADE-HOVER: rgba(33, 33, 33, 0.1);\n      --COLOR-LINK-OPPOSITE: #ffffff;\n\n\n      /* === Product grid sale tags ===*/\n      --COLOR-SALE-BG: rgba(0, 0, 0, 0);\n      --COLOR-SALE-TEXT: #d02e2e;\n      --COLOR-SALE-TEXT-SECONDARY: rgba(0, 0, 0, 0);\n\n      /* === Product grid badges ===*/\n      --COLOR-BADGE-BG: rgba(0, 0, 0, 0);\n      --COLOR-BADGE-TEXT: #212121;\n\n      /* === Product sale color ===*/\n      --COLOR-SALE: #5b2a14;\n\n      /* === Gray background on Product grid items ===*/\n      --filter-bg: 1.0;\n      /* === Helper colors for form error states ===*/\n      --COLOR-ERROR: #721C24;\n      --COLOR-ERROR-BG: #F8D7DA;\n      --COLOR-ERROR-BORDER: #F5C6CB;\n\n\n\n      --RADIUS: 0px;\n      --RADIUS-SM: 0px;\n\n\n      --COLOR-ANNOUNCEMENT-BG: #ffffff;\n      --COLOR-ANNOUNCEMENT-TEXT: #ab8c52;\n      --COLOR-ANNOUNCEMENT-BORDER: #e6ddcb;\n\n      --COLOR-HEADER-BG: rgba(0, 0, 0, 0);\n      --COLOR-HEADER-LINK: #5b2a14;\n      --COLOR-HEADER-LINK-HOVER: #5b2a14;\n\n      --COLOR-MENU-BG: rgba(0, 0, 0, 0);\n      --COLOR-MENU-BORDER: rgba(0, 0, 0, 0);\n      --COLOR-MENU-LINK: #212121;\n      --COLOR-MENU-LINK-HOVER: #212121;\n      --COLOR-SUBMENU-BG: #dadad2;\n      --COLOR-SUBMENU-LINK: #212121;\n      --COLOR-SUBMENU-LINK-HOVER: #ffffff;\n      --COLOR-MENU-TRANSPARENT: #ffffff;\n\n      --COLOR-FOOTER-BG: #dadad2;\n      --COLOR-FOOTER-TEXT: #ffffff;\n      --COLOR-FOOTER-LINK: #ffffff;\n      --COLOR-FOOTER-LINK-HOVER: #5b2a14;\n      --COLOR-FOOTER-BORDER: #000000;\n\n      --TRANSPARENT: rgba(255, 255, 255, 0);\n\n      /* === Default overlay opacity ===*/\n      --overlay-opacity: 0;\n\n      /* === Custom Cursor ===*/\n\n      --icon-zoom-in: url("cdn/shop/t/151/assets/icon-zoom-in.svg@v=126996651526054293301699441056");\n      --icon-zoom-out: url("cdn/shop/t/151/assets/icon-zoom-out.svg@v=128675709041987423641699441056");\n\n      /* === Typography ===*/\n      --PRODUCT-GRID-ASPECT-RATIO: 70.0%;\n      --PRODUCT-GRID-SIZE-PIECE: 7.0;\n\n\n      --FONT-WEIGHT-BODY: 400;\n      --FONT-WEIGHT-BODY-BOLD: 500;\n\n      --FONT-STACK-BODY: "Neue Haas Unica", sans-serif;\n      --FONT-STYLE-BODY: normal;\n      --FONT-STYLE-BODY-ITALIC: Liquid error (snippets/css-variables line 245): font_modify can only be used with a font drop;\n      --FONT-ADJUST-BODY: 0.9;\n\n      --FONT-WEIGHT-HEADING: 700;\n      --FONT-WEIGHT-HEADING-BOLD: 700;\n\n      --FONT-STACK-HEADING: "Caslon Old Face", serif;\n      --FONT-STYLE-HEADING: normal;\n      --FONT-STYLE-HEADING-ITALIC: Liquid error (snippets/css-variables line 253): font_modify can only be used with a font drop;\n      --FONT-ADJUST-HEADING: 0.75;\n\n      --FONT-STACK-NAV: "Neue Haas Unica", sans-serif;\n      --FONT-STYLE-NAV: normal;\n      --FONT-STYLE-NAV-ITALIC: Liquid error (snippets/css-variables line 258): font_modify can only be used with a font drop;\n      --FONT-ADJUST-NAV: 0.75;\n\n      --FONT-WEIGHT-NAV: 400;\n      --FONT-WEIGHT-NAV-BOLD: 500;\n\n      --FONT-SIZE-BASE: 0.9rem;\n      --FONT-SIZE-BASE-PERCENT: 0.9;\n\n      --ICO-SELECT: url("cdn/shop/t/151/assets/ico-select.svg@v=115630813262522069291699441056");\n\n      /* === Parallax ===*/\n      --PARALLAX-STRENGTH-MIN: 125.0%;\n      --PARALLAX-STRENGTH-MAX: 135.0%;\n      --gutter: 60px;\n      --grid: repeat(4, minmax(0, 1fr));\n      --grid-tablet: repeat(3, minmax(0, 1fr));\n      --grid-small: repeat(2, minmax(0, 1fr));\n      --grid-mobile: repeat(1, minmax(0, 1fr));\n      --gap: 20px;\n      --base-animation-delay: 0ms;\n    }\n  '
        }}
      />




      <link
        href="cdn/shop/t/151/assets/theme.css@v=150447602840016411881700499020.css"
        rel="stylesheet"
        type="text/css"
        media="all"
      />
      <Script only="Test" src="cdn/shop/t/151/assets/lazysizes.js@v=111431644619468174291699441056" />
      <Script only="Test" src="cdn/shop/t/151/assets/vendor.js@v=13180339602732822851699441056" />
      <Script only="Test" src="cdn/shop/t/151/assets/theme.js@v=3037200527243251081699441056" />




      <main role="main" id="MainContent" className="main-content">
        <div
          id="shopify-section-template--21602747875626__55a023da-d0ae-4d81-83e8-4589132b3ca5"
          className="shopify-section"
        >
          {/* /sections/section-collection.liquid */}
          <style
            data-shopify=""
            dangerouslySetInnerHTML={{
              __html:
                "\n          #Collection--template--21602747875626__55a023da-d0ae-4d81-83e8-4589132b3ca5 {\n            --PT: 0px;\n            --PB: 0px;\n\n            --grid: repeat(3, minmax(0, 1fr));\n            --grid-tablet: repeat(3, minmax(0, 1fr));\n            --grid-small: repeat(2, minmax(0, 1fr));\n            --grid-mobile: repeat(2, minmax(0, 1fr));\n          }\n        "
            }}
          />


          <section
            id="Collection--template--21602747875626__55a023da-d0ae-4d81-83e8-4589132b3ca5"
            className="index-products section-padding layout--grid"
            data-section-id="template--21602747875626__55a023da-d0ae-4d81-83e8-4589132b3ca5"
            data-section-type="product-grid"
          >
            <div className="grid-container">
              <div className="product-grid-outer">
                <div
                  className=" "
                  data-options='{"watchCSS": true, "cellAlign": "left", "pageDots": false, "prevNextButtons": true,  "wrapAround": false, "groupCells": true}'
                  data-arrow-position-middle=""
                >






 




                  {allTemp && allTemp?.length > 0 ? (
 <div className="grid-container">
 {allTemp.map((item, index) => (
   <div
     key={index}
     className="product-item one-third medium--one-third small--one-half product-item--borderless product-item--centered product-item--outer-text product-item--has-quickbuy product-item--template--21602747875626__55a023da-d0ae-4d81-83e8-4589132b3ca5-1"
     data-product-grid-item=""
     data-slide={0}
     data-slide-index={0}
   >
     <div
       className="product-item__image double__image"
       data-product-image=""
     >
       <a
         className="product-link"
         href={`/product?id=${item.id}`}
         aria-label="Brothers Dopp Kit Duo . Brownish"
         data-grid-link="/products/brothers-dopp-kit-duo-brownish"
       >
         <div
           className="product-item__bg lazyload"
           style={{
             backgroundImage: `url('${item.img[0]}')`,
             backgroundSize: 'contain',
             backgroundPosition: 'center',
             width: '100%', // Adjust as needed
             height: '100%', // Adjust as needed
             backgroundRepeat: "no-repeat"
           }} >
           &nbsp;
         </div>
       </a>
     </div>
     <div
       className="product-information"
       data-aos="fade"
       data-aos-delay={0}
       data-aos-duration={800}
       data-aos-anchor=".product-item--template--21602747875626__55a023da-d0ae-4d81-83e8-4589132b3ca5-1"
       data-product-information=""
     >
       <a
         className="product-link product-link--info"
         href={`/product?id=${item.id}`}
         aria-label="Brothers Dopp Kit Duo . Brownish"
         data-grid-link="/products/brothers-dopp-kit-duo-brownish"
       >
         <p className="product__grid__title product__grid__element">
           <span className="product__grid__title__default product__grid__element__default">
             {item.title}
           </span>
         </p>
         <p className="product__grid__title product__grid__element">
           <span className="product__grid__title__default product__grid__element__default">
             ${item.price}
           </span>
         </p>
       </a>
     </div>
   </div>
 ))}
 <style jsx>{`
   .grid-container {
     display: grid;
     grid-template-columns: repeat(4, 1fr);
     gap: 16px; /* Adjust the gap as needed */
   }

   @media (max-width: 768px) { /* Adjust the breakpoint as needed */
     .grid-container {
       grid-template-columns: 1fr;
     }
   }

   .product-item {
     /* Your existing styles for product-item */
   }
   .product-item__image {
     /* Your existing styles for product-item__image */
   }
   .product-link {
     /* Your existing styles for product-link */
   }
   .product-item__bg {
     /* Your existing styles for product-item__bg */
   }
   .product-information {
     /* Your existing styles for product-information */
   }
   .product__grid__title {
     /* Your existing styles for product__grid__title */
   }
 `}</style>
</div>
                  ) : (
                    <div className='home___error-container'>
                      <h2 className='text-black text-xl dont-bold'>...</h2>

                    </div>
                  )

                  }






                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>

  )
}


























