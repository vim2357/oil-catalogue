import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/Config";
import { useNavigate } from 'react-router-dom';

const Login =() => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]=useState('');
    const [success, setSuccess]=useState('');
    const handleSignIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then(()=>{
        setSuccess('Successfully signed in')
        setEmail('')
        setPassword('')
        setTimeout(()=> {
        setSuccess('')
        navigate('/')
        },2000 )
    }).catch(error => {
        setError(error.message)
    })
}
    return (
        <div className="container">
            {success&&<>
            <div className="success-message">{ success }</div>
            </>}
            <form className="form-group" onSubmit={handleSignIn}>
            <label>E-mail</label>
                <input type="email" className="form-control" required
                onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <br />
                <label>Password</label>
                <input type="password" className="form-control" required
                onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <br />
                <div className="signup-btn">
                    <span>Don't have an account? Sign up
                    <Link to="/signup">Here</Link></span>
                    <button type="submit" className="btn btn-success btn-md">Sign in</button>
                </div>
                </form>
                {error&&<>
            <div className="error-message">{ error }</div>
            </>}
        </div>
    )
                
            }
export default Login