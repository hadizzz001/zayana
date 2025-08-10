import React from 'react';

const OutOfStockComponent = ({ itemName }) => {
  const whatsappNumber = '96176334886'; // Replace with your WhatsApp number (no +)

  const message = `I want to preorder this item ${itemName}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div>
      <p className='mt-10' style={{ color: "#222", fontSize: "24px" }}>Out of Stock</p>
      <a className="Common_Button Common_Button--short MiniCart_Cart_CtaButton" href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <span style={{color:'white'}}><center>PREORDER</center></span>
      </a>
    </div>
  );
};

export default OutOfStockComponent;
