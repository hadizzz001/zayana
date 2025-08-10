"use client";

import { TempProps } from "../types";
import { motion } from "framer-motion";

interface CarCardProps {
  temp: TempProps;
}

const CarCard = ({ temp }: CarCardProps) => {
  const { _id, title, price, discount, img, category, description } = temp;

const shortDesc = description
  ? description.replace(/<[^>]*>/g, "").substring(0, 15) + "..."
  : "";


  return (
  <a href={`/product?id=${_id}`} >
    <motion.div 
      className="myTable"
    >
      {/* 1st Row - Image */}
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2nd Row - Title (left aligned) */}
      <div className="myProduct1   px-2  ">{title}</div>

      {/* 3rd Row - Description & Category (left aligned) */}
      <div className="myRow px-2  ">
        <p className="myP1 ">{shortDesc}</p>
        <p className="myP1  ">{category}</p>
      </div>

      {/* 4th Row - Discount & Price (flex) */}
      <div className=" px-2   flex justify-between items-center">
        <span className="line-through text-gray-500 myP2">${price}</span>
        <span className="  myP2">USD ${discount}</span>
      </div>
    </motion.div>
    </a>
  );
};

export default CarCard;
