import React from "react";
import Navbar from "../navbar/Navbar";
import { useState, useEffect } from "react";
import { auth, db } from "../../config/Config";
import "../products/productItem/ProductItem.css";
import CartProductItem from "./CartProducts";
import CartProducts from "./CartProducts";

const Cart = () => {
    const GetUser = () => {
        const [isAuthenticated, setIsAuthenticated] = useState(null);
        const [user, setUser] = useState()
    
    useEffect(() => {
      auth.onAuthStateChanged(user=> {
        if(user) {
            db.collection('users').doc(user.uid).get().then(snapshot=>{
                setUser(snapshot.data().FullName)
            })
        }
      });
    }, []);
    return user
    }
    const user = GetUser()
    
    const [cartProducts, setCartPRoducts] = useState([])
    useEffect(()=> {
        auth.onAuthStateChanged(user=>{
            if(user) {
                db.collection('Cart'+user.uid).onSnapshot(snapshot=>{
                    const newCartProductItem = snapshot.docs.map((doc)=>( {
                        ID: doc.id,
                        ...doc.data()
                    }))
                    setCartPRoducts(newCartProductItem)
                })
            }
            else {
                console.log('sign in')
            }
        })
    })
    let product
    const addProduct = (cartProduct) => {
        product = cartProduct
        product.quantity = product.quantity + 1
        product.totalPrice = product.quantity * product.price
        auth.onAuthStateChanged(user=> {
            if(user) {
                db.collection('Cart' + user.uid ).doc(cartProduct.ID).update(product).then(()=>{
                    console.log('added')
                })
            }
        })
    }
    const deleteProduct = (cartProduct) => {
        product = cartProduct
        product.quantity = product.quantity - 1
        product.totalPrice = product.quantity * product.price
        auth.onAuthStateChanged(user=> {
            if(user) {
                db.collection('Cart' + user.uid ).doc(cartProduct.ID).update(product).then(()=>{
                    console.log('deleted')
                })
            }
        })
    }
    return (
        <>
            <Navbar user={user}/>
            {cartProducts.length===0 && (
                <div className="container-fluid">
                    No products to show
                </div>
            )}
            {cartProducts.length>=1 && (
                <div className="container-fluid">
                    <h2 className="text-center">List of Products</h2>
                    <div className="products-store">
                        <CartProducts cartProducts={cartProducts} addProduct={addProduct} deleteProduct={deleteProduct}/>
                    </div>
                </div>
            )}
        </>
    )
}
export default Cart