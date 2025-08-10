"use client"


import React from 'react'
import { useCart } from '../context/CartContext';

const page = () => {

    const { cart , removeFromCart } = useCart();


    cart?.forEach(element => {
        // console.log(element.id);
        removeFromCart(element.id) 
      });



    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n\n.Common_Button:focus, .Common_Button:hover { \n    background-image: none;\n    box-shadow: 0 20px 15px -17px rgba(0,0,0,.3), 0 1px 2px rgba(0,0,0,.3);\n    text-decoration: none;\n    color: white !important;\n}\n.Common_Button, .Common_Button:active, .Common_Button:visited {\n    background-color: #1f1a17;\n    background-image: none;\n    border-radius: 5px;\n    border: none;\n    box-shadow: 0 27px 15px -17px rgba(0,0,0,.3), 0 2px 4px rgba(0,0,0,.3);\n    color: #fff;\n    cursor: pointer;\n    display: block;\n    font-family: Lato,sans-serif;\n    font-size: 16px;\n    font-weight: 700;\n    height: 50px;\n    letter-spacing: 2px;\n    line-height: 50px;\n    outline: none;\n    text-decoration: none;\n    text-transform: uppercase;\n    transition: background-color .2s ease,box-shadow .2s ease;\n    width: 100%;\n}\n\n\n"
                }}
            />
            <div
                data-render-if="cart-is-initialised,cart-is-empty"
                className="Checkout_Empty"
                style={{ marginTop: "2em" }}
            >
                <div style={{ display: "inline-block" }}>
                <svg
                width="64px" height="64px"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  stroke="#fff"
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <path
      d="M3.74181 20.5545C4.94143 22 7.17414 22 11.6395 22H12.3607C16.8261 22 19.0589 22 20.2585 20.5545M3.74181 20.5545C2.54219 19.1091 2.95365 16.9146 3.77657 12.5257C4.36179 9.40452 4.65441 7.84393 5.7653 6.92196M3.74181 20.5545C3.74181 20.5545 3.74181 20.5545 3.74181 20.5545ZM20.2585 20.5545C21.4581 19.1091 21.0466 16.9146 20.2237 12.5257C19.6385 9.40452 19.3459 7.84393 18.235 6.92196M20.2585 20.5545C20.2585 20.5545 20.2585 20.5545 20.2585 20.5545ZM18.235 6.92196C17.1241 6 15.5363 6 12.3607 6H11.6395C8.46398 6 6.8762 6 5.7653 6.92196M18.235 6.92196C18.235 6.92196 18.235 6.92196 18.235 6.92196ZM5.7653 6.92196C5.7653 6.92196 5.7653 6.92196 5.7653 6.92196Z"
      stroke="#fff"
      strokeWidth="1.5"
    />{" "}
    <path
      d="M9 6V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V6"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />{" "}
  </g>
</svg> </div>
                <h1 className="EmptyCartBlurb">Thank you for your purchase!</h1>
                <p className='mb-10'>Your order has been successfully processed.</p>
                <a
                    href="/"
                    className="Common_Button"
                    data-auto-id="true"
                    id="protected/checkout/checkout-page-with-layout-conditionals-continueshoppingpath-2"
                >
                    Return home
                </a>
            </div>
        </>
    )
}

export default page