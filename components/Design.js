"use client"

import { useState } from 'react';

const page = () => {
  const [showDiv1, setShowDiv1] = useState(true);

  const toggleDiv = () => {
    setShowDiv1((prevShowDiv1) => !prevShowDiv1);
  };
  return (
    <>
<style
  type="text/css"
  dangerouslySetInnerHTML={{
    __html:
      '.logo1{ max-height: 250px;}.sywCarousel{background-color:#f4f4f4;color:#333;padding:30px 0 0;margin:0 auto;position:relative;text-align:center}.sywCarousel--imageSlider{position:relative;background-color:transparent;overflow:hidden;z-index:1}.sywCarousel--imageSlider.desktop{display:none}.sywCarousel--imageSlider-arrowPrev,.sywCarousel--imageSlider-arrowNext{display:none}.sywCarousel--imageSlider-content{text-align:left;display:flex;align-items:flex-start;width:100%;overflow-x:scroll;scroll-snap-type:both mandatory;-webkit-overflow-scrolling:touch;padding:20px 0 80px}.sywCarousel--imageSlider-content::-webkit-scrollbar{display:none}.sywCarousel--imageSlider .imageSlider__slide{display:flex;flex-direction:column;justify-content:center;background-color:#f4f4f4;min-width:85%;scroll-snap-align:start;scroll-snap-stop:always;padding-left:15px}.sywCarousel--imageSlider .imageSlider__slide:nth-child(4){padding-right:15px}.sywCarousel--imageSlider .imageSlider__slide .logo{width:100%;height:64vw;background-size:cover;background-repeat:no-repeat;background-position:center center}.sywCarousel--imageSlider .imageSlider__slide .logo>img{width:100%;display:block}.sywCarousel--imageSlider .imageSlider__slide .text{padding:15px;background-color:#fff;box-shadow:0 20px 20px -20px rgba(0,0,0,0.5);text-align:center}.sywCarousel--imageSlider .imageSlider__navDots{position:absolute;left:50%;bottom:15px;transform:translate(-50%);z-index:10;list-style:none;padding:0;margin:0;text-align:center}.sywCarousel--imageSlider .imageSlider__navDots-dot{display:inline;margin:0 7px;padding:0;list-style:none}.sywCarousel--imageSlider .imageSlider__navDots-dot.dot-active span{background:#ADADAD}.sywCarousel--imageSlider .imageSlider__navDots-dot span{display:inline-block;width:12px;height:12px;border:1px solid #ADADAD;border-radius:50%;cursor:pointer}.syw-floating-image{display:none}@media (min-width: 811px){.sywCarousel{padding:45px 0;max-width:unset;position:relative;background-color:transparent}.sywCarousel:after{display:block;content:"";height:100%;width:100%;position:absolute;background-color:#f4f4f4;bottom:0;clip-path:polygon(100% 0, 100% 88%, 50% 100%, 0 88%, 0 0);z-index:-1}.sywCarousel__title{margin-bottom:40px}.sywCarousel--imageSlider{display:flex;justify-content:center;margin:0 auto}.sywCarousel--imageSlider.desktop{display:flex}.sywCarousel--imageSlider.mobile{display:none}.sywCarousel--imageSlider-arrowPrev,.sywCarousel--imageSlider-arrowNext{height:374px;margin:0 25px;width:40px;display:flex;justify-content:center;align-items:center;cursor:pointer}.sywCarousel--imageSlider-arrowPrev:after,.sywCarousel--imageSlider-arrowNext:after{display:block;content:"";height:30px;width:30px}.sywCarousel--imageSlider-arrowPrev:after{border-left:1px solid #ADADAD;border-bottom:1px solid #ADADAD;transform:translateX(50%) rotate(45deg)}.sywCarousel--imageSlider-arrowNext:after{border-right:1px solid #ADADAD;border-top:1px solid #ADADAD;transform:translateX(-50%) rotate(45deg)}.sywCarousel--imageSlider-arrowPrev.arrow-invisible,.sywCarousel--imageSlider-arrowNext.arrow-invisible{opacity:0;pointer-events:none}.sywCarousel--imageSlider-content{padding:0 0 100px;max-width:770px}.sywCarousel--imageSlider .imageSlider__slide{flex-direction:row;min-width:100%;padding-left:0}.sywCarousel--imageSlider .imageSlider__slide-sub{width:50%;padding:0 10px}.sywCarousel--imageSlider .imageSlider__slide .logo{width:100%;height:30vw;max-height:280px}.sywCarousel--imageSlider .imageSlider__slide .text{padding:20px 35px;font-family: "Manrope", sans-serif;font-weight: 400; line-height: 1.5; font-size: 13px } .sywCarousel--imageSlider .imageSlider__navDots{bottom:40px}.sywCarousel--imageSlider .imageSlider__navDots-dot{margin:0 5px}.sywCarousel--imageSlider .imageSlider__navDots-dot span{width:14px;height:14px}.syw-floating-image{display:block;position:absolute;width:11vw;max-width:190px;left:0;bottom:-6vmax;z-index:1}.syw-floating-image.cards{top:-8vmax;right:0;left:auto}}\n'
  }}
/>

<style
  dangerouslySetInnerHTML={{
    __html:
      '\n\n  @media (min-width: 811px){\n<style>\n.sywCarousel:after {\n    display: block;\n    content: "";\n    height: 100%;\n    width: 100%;\n    position: absolute;\n    background-color: transparent !important;\n    bottom: 0;\n    clip-path: polygon(100% 0, 100% 88%, 50% 100%, 0 88%, 0 0);\n    z-index: -1;\n}\n}\n'
  }}
/>


<div className="sywCarousel">
 
 
 
   
 
</div> 

    </>
  )
}

export default page