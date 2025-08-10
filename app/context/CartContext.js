"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    case "UPDATE_CART":
      return action.payload;
    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], (initial) => {
    if (typeof window !== "undefined") {
      try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : initial;
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        return initial;
      }
    }
  });

  const [quantities, setQuantities] = useState(() => {
    if (typeof window !== "undefined") {
      const storedQuantities = localStorage.getItem("quantities");
      return storedQuantities ? JSON.parse(storedQuantities) : {};
    }
  });

  const [selectedColors, setSelectedColors] = useState(() => {
    if (typeof window !== "undefined") {
      const storedColors = localStorage.getItem("selectedColors");
      return storedColors ? JSON.parse(storedColors) : {};
    }
  });

  const [selectedSizes, setSelectedSizes] = useState(() => {
    if (typeof window !== "undefined") {
      const storedSizes = localStorage.getItem("selectedSizes");
      return storedSizes ? JSON.parse(storedSizes) : {};
    }
  });

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("selectedColors", JSON.stringify(selectedColors));
  }, [selectedColors]);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("selectedSizes", JSON.stringify(selectedSizes));
  }, [selectedSizes]);

useEffect(() => {
  const newSubtotal = cart.reduce((acc, item) => {
    const quantity = quantities[item._id] || 1;

    let price = item.discount; // Default fallback

    if (item.selectedColor && item.selectedSize && Array.isArray(item.color)) {
      const colorMatch = item.color.find(c => c.color === item.selectedColor);
      if (colorMatch && Array.isArray(colorMatch.sizes)) {
        const sizeMatch = colorMatch.sizes.find(s => s.size === item.selectedSize);
        if (sizeMatch) {
          price = sizeMatch.price;
        }
      }
    }

    return acc + price * quantity;
  }, 0);

  setSubtotal(newSubtotal);
}, [quantities, cart]);


  const addToCart = (
    item,
    quantity = 1,
    selectedColor = "",
    selectedSize = ""
  ) => {
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => String(cartItem._id) === String(item._id)
    );

    if (existingCartItemIndex !== -1) {
      setQuantities((prev) => ({
        ...prev,
        [item._id]: quantity,
      }));

      setSelectedColors((prev) => ({
        ...prev,
        [item._id]: selectedColor,
      }));

      setSelectedSizes((prev) => ({
        ...prev,
        [item._id]: selectedSize,
      }));

      dispatch({
        type: "UPDATE_CART",
        payload: cart.map((cartItem) =>
          String(cartItem._id) === String(item._id)
            ? {
                ...cartItem,
                quantity,
                selectedColor,
                selectedSize,
              }
            : cartItem
        ),
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: [
          ...cart,
          {
            ...item,
            quantity,
            selectedColor,
            selectedSize,
          },
        ],
      });

      setQuantities((prev) => ({
        ...prev,
        [item._id]: quantity,
      }));

      setSelectedColors((prev) => ({
        ...prev,
        [item._id]: selectedColor,
      }));

      setSelectedSizes((prev) => ({
        ...prev,
        [item._id]: selectedSize,
      }));
    }
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });

    setQuantities((prev) => {
      const { [itemId]: removedItem, ...newQuantities } = prev;
      return newQuantities;
    });

    setSelectedColors((prev) => {
      const { [itemId]: removedColor, ...newColors } = prev;
      return newColors;
    });

    setSelectedSizes((prev) => {
      const { [itemId]: removedSize, ...newSizes } = prev;
      return newSizes;
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    setQuantities({});
    setSelectedColors({});
    setSelectedSizes({});
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        quantities,
        subtotal,
        selectedColors,
        selectedSizes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
