"use client";
import { useCart } from '../app/context/CartContext';
import { useState } from 'react';

const WhatsAppButton = ({ inputs, items, total, delivery, code }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, isModalOpen, toggleModal, subtotal } = useCart();
  const [error, setError] = useState(null);



  const createOrder = async () => {
    try {
      // 1. Update stock
      for (const item of items) {
        const quantityToDecrease = parseInt(item.quantity, 10);

        let url;
        let body;

        if (item.type === 'single') {
          url = `/api/stock/${item._id}`;
          body = { qty: quantityToDecrease };
        } else if (item.type === 'collection' && item.selectedSize) {
          url = `/api/stock2/${item._id}`;
          body = {
            id: item._id,
            qty: quantityToDecrease,
            color: item.selectedColor,
            size: item.selectedSize
          };
        } else {
          url = `/api/stock1/${item._id}`;
          body = {
            id: item._id,
            color: item.selectedColor,
            qty: quantityToDecrease
          };
        }

        const response = await fetch(url, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Failed to update stock");
        }
      }


      // 2. Save order (optional) 
      const orderResponse = await fetch("/api/sendOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, inputs, total, delivery, code }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      // 3. Send email via server action (through API)
      const emailResponse = await fetch("/api/sendEmail3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          inputs,
          subtotal,
          delivery,
          total,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Failed to send email");
      }

      alert("Order placed successfully!");

    } catch (error) {
      console.error("Error processing order:", error);
      alert(error.message || "Something went wrong");
    }
  };




  const handleClick = async () => {
    if (!validateInputs(inputs)) {
      setError('Please fill the required fields and on the right format.');
      return;
    }

    const url = createWhatsAppURL(inputs, items, total, delivery, code, subtotal);
    window.open(url, '_blank');
    createOrder();
    clearCart();
    setError(null);
  };

  const validateInputs = (inputs) => {
    const { country, city, address, fname, lname, phone, email } = inputs;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      country &&
      city &&
      address &&
      fname &&
      lname &&
      phone &&
      email &&
      emailRegex.test(email)
    );
  };


  return (
    <div className='container'>
      {error && <div className='myBB3'>{error}</div>}
      <span className="ProvidersSingleProduct--selected">
        <button onClick={handleClick} type="button" className="AddToCart HtmlProductAddToCart" style={{ borderRadius: "0" }}  >
          <span>Order Now!</span>
        </button>
      </span>
    </div>
  );
};

export default WhatsAppButton;

const createWhatsAppURL = (inputs, items, total, delivery, code, subtotal) => {
  const { country, city, apt, address, fname, lname, phone, email } = inputs;
 


  // Formatting the message
  const message = `
    *Customer Information:*
    Email: ${email}
    Name: ${fname} ${lname} 
    Phone: ${phone}
    Country: ${country}
    City: ${city}
    Address: ${address}
    Apt-floor: ${apt}


    *Order Details:*
    ${items.map((item, index) => `
      Item ${index + 1}:
      - Name: ${item.title} 
      - Quantity: ${item.quantity}
      - Price: $${(() => {
      const colorObj = item.color?.find(c => c.color === item.selectedColor);
      const sizeObj = colorObj?.sizes?.find(s => s.size === item.selectedSize);
      return sizeObj?.price ?? item.discount;
    })()}

      - Color: ${item.selectedColor}
      - Size: ${item.selectedSize}
      - Image: ${item.img[0]} 
    `).join('\n')}

    Subtotal: $${subtotal.toFixed(2)}
    Delivery fee: $${delivery}
    *Total Amount:* $${total}
  `;

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = '96176334886';
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
