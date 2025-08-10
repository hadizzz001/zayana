import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const NewCarousel = () => {
  const slider = React.useRef(null);


  var settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ],
  };




  return (
    <div className="container" style={{ width: "50%", marginBottom: "5em" }}>

      <Slider ref={slider} {...settings} >
        <div style={{ boxShadow: "0 20px 20px -20px rgba(0,0,0,1.5)", textAlign: "center" }}>
          <img src="https://bellroy-cms-images.imgix.net/4414/slider-image03.jpg?auto=format&fit=max" className="w-100" />
          <div className="card-body bg-white" style={{ minHeight: "75px", boxShadow: "0 20px 20px -20px rgba(0,0,0,0.5)", textAlign: "center" }}>
            <p>Made from premium, environmentally certified leather, that only gets better with age...</p>
          </div>
        </div>
        <div>
          <img src="https://bellroy-cms-images.imgix.net/4414/slider-image03.jpg?auto=format&fit=max" className="w-100" />
          <div className="card-body bg-white" style={{ minHeight: "75px" }}>
            <p>Made from premium, environmentally certified leather, that only gets better with age...</p>
          </div>
        </div>
        <div>
          <img src="https://bellroy-cms-images.imgix.net/4414/slider-image03.jpg?auto=format&fit=max" className="w-100" />
          <div className="card-body bg-white" style={{ minHeight: "75px" }}>
            <p>Made from premium, environmentally certified leather, that only gets better with age...</p>
          </div>
        </div>
        <div  >
          <img src="https://bellroy-cms-images.imgix.net/4414/slider-image03.jpg?auto=format&fit=max" className="w-100" />
          <div className="card-body bg-white" style={{ minHeight: "75px" }}>
            <p>Made from premium, environmentally certified leather, that only gets better with age...</p>
          </div>
        </div>
        <div  >
          <img src="https://bellroy-cms-images.imgix.net/4414/slider-image03.jpg?auto=format&fit=max" className="w-100" />
          <div className="card-body bg-white" style={{ minHeight: "75px" }}>
            <p>Made from with age...</p>
          </div>
        </div>
        <div hidden>
          <img src="https://bellroy-cms-images.imgix.net/4414/slider-image03.jpg?auto=format&fit=max" className="w-100" />
          <div className="card-body bg-white" style={{ minHeight: "75px" }}>
            <p>Made from  age...</p>
          </div>
        </div>
      </Slider> 
      <button id="newB1" onClick={() => slider?.current?.slickPrev()} style={{outline:"none",position: "relative",bottom: "17em"}}>
      <img src="https://res.cloudinary.com/duppvjinz/image/upload/v1701378393/na1bumitzgok5nsce2ka.png" width={50} alt="" />
      </button> 
      <button id="newB2" onClick={() => slider?.current?.slickNext()} style={{outline:"none",position: "relative",bottom: "17em"}}>
      <img src="https://res.cloudinary.com/duppvjinz/image/upload/v1701378050/ffqppg6tbrjzieswchsf.png" width={50} alt="" /> 
      </button> 
    </div>



  )
}

export default NewCarousel