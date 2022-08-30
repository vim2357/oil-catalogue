import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping as Icon } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../config/Config";
import { useNavigate } from 'react-router-dom';

const Navbar = ({user}) => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        auth.signOut().then(()=>{
            navigate('/login')
        })
    }

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <Link className="logo" to="/"><img src="https://formula-oil.com/sites/default/files/logo_0_1.png" className="logo" /></Link>
                
                <div className="text">Смазочные материалы в Казахстане и Кыргызстане</div>
            </div>

            <div className="navbar__links">
                {!user&& <>
                <Link className="link" to="/signup">SIGN UP</Link>
                <Link className="link" to="/signin">SIGN IN</Link>
                </>}
                {user&& <>
                <div><Link className="link" to="/">{user}</Link></div>
                <div className="cart-button">
                    <Link className="link" to="/cart">
                        <FontAwesomeIcon icon={Icon} />
                    </Link>
                    {/* <span className="cart-quantity">{totalQuantity}</span> */}
                </div>
                <div className="btn btn-danger btn-md" onClick={handleSignOut}>SIGN OUT</div>
                </>}
            </div>
            
        </div>
    )
}

export default Navbar