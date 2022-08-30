import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Products from "../products/Products";
import { auth, db } from "../../config/Config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../products/productItem/ProductItem.css";
import { useNavigate } from "react-router-dom";

const Header = ({props}) => {
    const navigate = useNavigate()
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


useEffect(()=>{GetProducts()},[])
return user
}

const GetUserUid = () => {
    const [uid, setUid] = useState(null)
    useEffect(()=> {
        auth.onAuthStateChanged(user => {
            if(user) {setUid(user.uid)}
        })
    },[])
    return uid
}
const uid = GetUserUid()

    const [products, setProducts] = useState([])
    const GetProducts = async() => {
        const products = await db.collection('Products').get()
        const productsArr = []
        for (let snap of products.docs) {
            let data = snap.data()
            data.ID = snap.id
            productsArr.push({...data})
            if(productsArr.length === products.docs.length) {
                setProducts(productsArr)
            }
        }
    }
    
    const user = GetUser()
    let Product
    const addToCart = (product) => {
        if(uid!==null ) {
            Product = product
            Product['quantity']=1
            Product['totalPrice']=Product.quantity*Product.price
            db.collection('Cart' + uid).doc(product.ID).set(Product).then(
                console.log('succesfully added')
            )
        }
        else {
            navigate('/login')
        }
    }

    return (
        <div>
            <Navbar user={user} />
            
            {products.length > 0 && (
                <div className="container-fluid">
                    <h1 className="text-center">Products</h1>
                    <div className="products-store">
                        <Products products={products} addToCart={addToCart}/>
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className="container-fluid">Wait...</div>
            )}
        </div>
    )
}
export default Header