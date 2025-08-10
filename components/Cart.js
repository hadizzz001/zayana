import React, { useState, useEffect } from 'react';
import { useCart } from '../app/context/CartContext';
import { useBooleanValue } from '../app/context/CartBoolContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CarCard5 from '../components/CarCard5';

const Cart = () => {
    const { cart, removeFromCart, quantities, subtotal, addToCart } = useCart();
    const [localQuantities, setLocalQuantities] = useState(quantities);
    const { isBooleanValue, setBooleanValue } = useBooleanValue();
    const [errors, setErrors] = useState({});
    const [allTemp2, setAllTemps2] = useState();
    const [maxStock, setMaxStock] = useState({}); // Store max stock for each item

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
    };



    useEffect(() => {
        setLocalQuantities(quantities);
        console.log("new qtyy: ", quantities);

    }, [quantities]);



    const handleClickc = () => {
        var cartb = document.getElementById("cartid");
        var cartb2 = document.getElementById("cartid2");
        setBooleanValue(!isBooleanValue);
        if (cartb && cartb2) {
            if (isBooleanValue) {
                cartb2.className += " MiniCart_Cart-visible";
            } else {
                cartb2.classList.remove("MiniCart_Cart-visible");
            }
        }
    };


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`api/products`);
      const data = await response.json();
      setAllTemps2(data.slice(0, 5));  // Only keep first 5 items
    } catch (error) {
      console.error("Error fetching the description:", error);
    }
  };

  fetchData();
}, []);







    useEffect(() => {
        const fetchStock = async () => {
            const updatedStock = {};
            for (const item of cart) {
                try {
                    const response = await fetch(`/api/stock/${item._id}`);
                    const data = await response.json();
                    updatedStock[item._id] = parseInt(data.stock, 10);
                } catch (error) {
                    console.error("Error fetching stock:", error);
                    updatedStock[item._id] = 1; // Default to 1 if fetch fails
                }
            }
            setMaxStock(updatedStock);
        };

        fetchStock();
    }, [cart]);




    const handleQuantityChange = (itemId, quantity) => {
        let newQuantity = parseInt(quantity, 10);

        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1; // Prevent negative or zero values
        } else if (newQuantity > (maxStock[itemId] || 1)) {
            newQuantity = maxStock[itemId]; // Limit to max stock
        }

        addToCart(
            cart.find((item) => item._id === itemId),
            newQuantity
        );

        setLocalQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: newQuantity,
        }));
    };




    return (
        <>
            <div>
                <div className="MiniCart_Slider_Overlay" id="cartid" />
                <div className="MiniCart_Slider">
                    <div className="MiniCart_Slider_CloseButton">
                        <slot name="close-button" />
                    </div>
                    <slot />
                </div>
            </div>

            <div className="Checkout">
                <div id="cartid2" className="MiniCart_Cart" style={{ zIndex: "99999999" }}>
                    <div className="MiniCart_Cart_Heading br_text-grey-500 mt-2">

                        <span className="myGray">Your shopping bag</span>
                        <button
                            slot="close-button"
                            className="MiniCart_Cart_CloseButton"
                            aria-label="Close"
                            id="cartid"
                            style={{ zIndex: "99999999999" }}
                            onClick={handleClickc}
                        >
                            <div className="MiniCart_Cart_CloseButtonIcon" />
                        </button>
                    </div>

                    <div data-render-if="!cart-is-empty" className="MiniCart_Cart_CheckoutCart">
                        <div className="Checkout_Cart_Wrapper Checkout_Cart_Wrapper--All">
                            <div className="Checkout_Cart_TableHeading">
                                <span className="Checkout_Cart_TableHeading_Quantity">Qty</span>
                                <span className="Checkout_Cart_TableHeading_Total">Total price</span>
                            </div>
                            <div className="Checkout_Cart_LineItems">
                                {cart && cart.length > 0 ? (
                                    cart.map((obj) => (
                                        <div key={obj._id}>
                                            <div className="Checkout_Cart_LineItems_LineItem">
                                                <div className="Checkout_Cart_LineItems_LineItem_Thumb">
                                                    <img src={obj.img[0]} alt={obj.title} />
                                                </div>
                                                <div className="Checkout_Cart_LineItems_LineItem_Details myGray">
                                                    {obj.title}
                                                    <div>
                                                        <span className="myGray">Category:</span>
                                                        <span className="myGray">{obj.category}</span>
                                                    </div>
                                                    <div className="Checkout_Cart_LineItems_LineItem_Details_Quantity">
                                                        <span className="myGray">Qty:</span>

                                                        <input
                                                            type="number"
                                                            className="myGray"
                                                            value={localQuantities[obj._id] || 1}
                                                            onChange={(e) => handleQuantityChange(obj._id, e.target.value)}
                                                            min="1"
                                                            max={maxStock[obj._id] || 1}
                                                        />



                                                    </div>
                                               
                                                    <div className="Checkout_Cart_LineItems_LineItem_Price">
                                                        <span className="Currency">
                                                            <span className="Currency_Monetary myGray">
                                                              {obj.type === 'collection' && obj.selectedSize ? obj.color.find(c => c.color === obj.selectedColor)?.sizes.find(s => s.size === obj.selectedSize)?.price * (localQuantities[obj._id]) : obj.discount * (localQuantities[obj._id] || 1)}
 
                                                            </span>
                                                            <span className="Currency_Code myGray">USD</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="Checkout_Cart_LineItems_LineItem_Remove" onClick={() => handleRemoveFromCart(obj._id)}>
                                                    <span className="Checkout_Cart_LineItems_LineItem_Remove_Cross">
                                                        <span />
                                                        <span />
                                                    </span>
                                                    <span className="Checkout_Cart_LineItems_LineItem_Remove_Spinner">
                                                        <span />
                                                    </span>
                                                </button>
                                            </div>

                                        </div>
                                    ))
                                ) : (
                                    <div data-render-if="cart-is-empty" className="MiniCart_Cart_EmptyCart">
                                        <span className="myGray">You have no items in your shopping bag.</span>
                                    </div>
                                )}

                                <div>
                                    <div className="Checkout_Cart_LineItems_LineItem Checkout_Cart_LineItems_LineItem-SalesPromotion Checkout_Cart_LineItems_LineItem-SalesPromotion-Custom">
                                        <div className="Checkout_Cart_LineItems_LineItem_Details">
                                            <div className="Checkout_Cart_LineItems_LineItem_Price">
                                                <span className="Currency">
                                                    <span className="Currency_Monetary">Total: ${subtotal.toFixed(2)}</span>

                                                    <span className="Currency_Code">USD</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a className="Common_Button Common_Button--short MiniCart_Cart_CtaButton" href="/checkout" rel="nofollow">
                                <span>Go to checkout</span>
                            </a>

                           

                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
