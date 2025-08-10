import React, { useState, useEffect } from "react";

const QuantitySelector = ({ initialQty = 1, productId, onChange, type, selectedColor, selectedSize }) => {
  const [qty, setQty] = useState(initialQty);
  const [maxStock, setMaxStock] = useState(null); // Store max stock



  useEffect(() => {
    setQty(1);
    const fetchStock = async () => {
      try {
        const response = await fetch(`/api/stock/${productId}`);
        const data = await response.json();

        if (response.ok && data.stock) {
          setMaxStock(parseInt(data.stock, 10));
        } else {
          console.error("Failed to fetch stock:", data.error);
        }
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    const fetchStock1 = async () => {
      try {
        const response = await fetch(`/api/stock1/${productId},${selectedColor}`);
        const data = await response.json();

        console.log("data123: ", data);

        if (response.ok && data.qty) {
          setMaxStock(parseInt(data.qty, 10));
        } else {
          console.error("Failed to fetch stock1:", data.error);
        }
      } catch (error) {
        console.error("Error fetching stock1:", error);
      }
    };

const fetchStock2 = async () => {
  try {
    const response = await fetch(`/api/stock2/${productId},${selectedColor},${selectedSize}`);
    const data = await response.json();

    console.log("data444: ", data);

    if (response.ok && data.qty !== undefined) {
      setMaxStock(parseInt(data.qty, 10));
    } else {
      console.error("Failed to fetch stock2:", data.error || "Unknown error");
      setMaxStock(0); // Optional: reset max stock if fetch failed
    }
  } catch (error) {
    console.error("Error fetching stock2:", error);
    setMaxStock(0); // Optional: reset max stock if error occurs
  }
};



    if (type === "collection") {
      if (productId && selectedColor && selectedSize) { 
        fetchStock2();
      }
      else {
        fetchStock1();
      }

    } else {
      fetchStock();
    }
  }, [productId, selectedColor, selectedSize]);


  const handleIncrement = () => {
    if (maxStock !== null && qty < maxStock) { // Prevent exceeding max stock
      setQty(qty + 1);
      onChange(qty + 1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      onChange(qty - 1);
    }
  };

  return (
    <div className="quantity-selector">
      <button
        className="myNewC"
        type="button"
        onClick={handleDecrement}
        style={{ width: "20px", backgroundColor: "initial", marginRight: "5px", fontWeight: "900" }}
      >
        -
      </button>
      <input
        type="number"
        value={qty}
        readOnly
        style={{ width: "30px", color: "initial" }}
      />
      <button
        className="myNewC"
        type="button"
        onClick={handleIncrement}
        style={{ width: "20px", backgroundColor: "initial", marginLeft: "5px", fontWeight: "900" }}
        disabled={maxStock !== null && qty >= maxStock} // Disable if at max stock
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
