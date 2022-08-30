import React from "react";
import ProductItem from "./productItem/ProductItem";

const Products = ({ products, addToCart }) => {
    return products.map((productItem)=>(
            <ProductItem key={productItem.ID} productItem={productItem}
            addToCart={addToCart} />
    ))
}
export default Products