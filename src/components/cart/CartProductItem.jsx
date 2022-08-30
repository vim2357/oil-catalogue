import React from "react";
import "../products/productItem/ProductItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus as IconPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus as IconMinus } from "@fortawesome/free-solid-svg-icons";
import {auth, db } from '../../config/Config'
import AddProduct from "../addproduct/AddProduct";
const CartProductItem = ({cartProduct, deleteProduct, addProduct}) => {
    const handleDeleteProduct = () => {
        deleteProduct(cartProduct)
    }
    const handleAddProduct = () => {
        addProduct(cartProduct)
    }
    const handleDelete = () => {
            auth.onAuthStateChanged(user=>{
                if(user){
                    db.collection('Cart' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                        console.log('successfully deleted');
                    })
                }
            })
    }
    return (
        <div className="product">
            <div className="product__img">
                <img src={cartProduct.url} />
            </div>
            <div className="product__title text">{cartProduct.title}</div>
            <div className="product__description text">{cartProduct.description}</div>
            <div className="product__price text">{cartProduct.price}</div>
             <div className="product__quantity-box text">
                <div className="action"onClick={handleAddProduct}><FontAwesomeIcon icon={IconPlus} /></div>
                <div>{cartProduct.quantity}</div>
                <div className="action" onClick={handleDeleteProduct}><FontAwesomeIcon icon={IconMinus} /></div>
             </div>
             <div className="product__total-price text">{cartProduct.totalPrice} тг</div>
             <div className="btn btn-danger btn-md" onClick={handleDelete}>DELETE</div>
        </div>
    )
}
export default CartProductItem