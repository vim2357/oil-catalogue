import React from "react";
import CartProductItem from "./CartProductItem";

const CartProducts = ({cartProducts, addProduct, deleteProduct}) => {
   return cartProducts.map((cartProduct)=>(
      <CartProductItem key={cartProducts.ID} cartProduct={cartProduct} addProduct={addProduct} deleteProduct={deleteProduct}/>
   ))
}
export default CartProducts