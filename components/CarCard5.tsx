"use client";

import { useState } from "react";
import { TempProps } from "../types";

interface CarCardProps {
    temp: TempProps;
}

const CarCard5 = ({ temp }: CarCardProps) => {
    const { _id, title, price, discount, img, category, stock, type, color } = temp;
    const [isTouched, setIsTouched] = useState(false);


    return (
        <a href={`/product?id=${_id}`}>
            <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]">
                <div className="Layout br_contents">
                    <center>
                        <span className="br_contents br_edition-">
                            <div className="m-1">
                                <div className="initial:br_row-span-1 br_col-start-1 br_row-start-1 br_relative">
                                    <div className="br_aspect-[1/1] sm:br_aspect-square">

                                        <div className="br_w-full br_h-full br_relative br_flex br_items-center br_justify-center">
                                            <div className="relative inline-block w-[200px] h-[200px]">
                                                <img
                                                    src={img[0]}
                                                    alt="Default"
                                                    className="w-full h-full object-cover object-center rounded"
                                                />

                                                {(
                                                    (type === 'single' && parseInt(stock) === 0) ||
                                                    (type === 'collection' &&
                                                        color?.every(color =>
                                                            color.sizes?.every(size => parseInt(size.qty) === 0)
                                                        )
                                                    )
                                                ) && (
                                                        <div className="absolute inset-0 bg-gray-600 bg-opacity-70 text-white flex items-center justify-center text-lg font-bold z-10 rounded">
                                                            Out of Stock
                                                        </div>
                                                    )}

                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="text-center flex flex-col items-center justify-center px-3">
                                    <h3 style={{ height: "100px" }} className="text-center">
                                        <a href={`/product?id=${_id}`} className="text-current no-underline">
                                            <h2 className="text-sm font-bold myGray py-1">{title}</h2>
                                            <div className="price-container inline-flex flex-wrap gap-x-2 items-baseline justify-center text-white">
                                                <span className="font-light text-[11px] py-1 line-through text-gray-400">
                                                    ${parseFloat(price).toFixed(2)}
                                                </span>
                                                <span className="font-light text-[11px] py-1 rounded myRed">
                                                    ${parseFloat(discount).toFixed(2)}
                                                    <span className="ml-1 text-[10px]">
                                                        {Math.round(((price - discount) / price) * 100)}% off
                                                    </span>
                                                </span>
                                            </div>
                                        </a>
                                    </h3>
                                </div>

                            </div>
                        </span>
                    </center>
                </div>
            </div>
        </a>
    );
};

export default CarCard5;
