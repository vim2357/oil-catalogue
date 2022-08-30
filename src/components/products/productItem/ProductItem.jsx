import React from "react";
import './ProductItem.css'
const ProductItem = ({productItem, addToCart}) => {
    const handleAddToCart=()=> {
        addToCart(productItem)
    }
    console.log(productItem.url)
    return (
        <div className="product">
            <div className="product__img">
                <img src={productItem.url} alt="smth" />
            </div>
            <div className="product__title text">{productItem.title}</div>
            <div className="product__description text">{productItem.description}</div>
            <div className="product__price text">{productItem.price}</div>
            <button className="btn btn-danger btn-md" onClick={handleAddToCart}>ADD TO CART</button>
        </div>
    )
}
export default ProductItem