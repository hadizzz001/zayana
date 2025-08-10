"use client";

import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";


export default function OrderButton({ cartItems, disabled, userData }) {

  const [isVisible, setIsVisible] = useState(false);

  const order = async () => {
    setIsVisible(true)
    const data = await fetch(`/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        userData
      }),
    });

    if (!data.ok) {
      return toast.error("Failed to create order");
    }

    const { url } = await data.json();

    window.location.href = url;
  };

  return (
    <>
      <button
        className="Common_Button Common_Button--short MiniCart_Cart_CtaButton"
        onClick={order}
        disabled={disabled}
        hidden={isVisible}
      >
        Continue
      </button>

      <button
        className="Common_Button Common_Button--short MiniCart_Cart_CtaButton bg-white" 
        hidden={!isVisible}
        disabled
      >
        <img
            src="/load.gif"  // Replace with the path to your loading GIF
            alt="Loading..."
            style={{ width: '40px', height: '40px', marginRight: '8px', display:'inline' }}
          />
      </button>
    </>
  );
}
