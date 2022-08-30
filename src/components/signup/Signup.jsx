import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './Signup.css'
import { auth, db } from "../../config/Config";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [fullName, setFullName]= useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]=useState('');
    const [success, setSuccess]=useState('');
    const handleSignUp = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials)
            db.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccess('Signup successfully')
                setFullName('')
                setEmail('')
                setPassword('')
                setTimeout(()=> {
                    setSuccess('')
                    navigate('/login');
                },2000)
            }).catch(()=> {
                setError(error.message)
            })
        }).catch((error)=>{
            setError(error.message)
        })
    }
    return (
        
        <div className="container">
            <h1>Зарегистрироваться</h1>
            <hr />
            {success&&<>
            <div className="success-message">{ success }</div>
            </>}
            <form className="form-group" onSubmit={handleSignUp}>
                <label>ФИО</label>
                <input type="text" className="form-control" required 
                onChange={(e) => setFullName(e.target.value)} value={fullName}></input>
                <br />
                <label>E-mail</label>
                <input type="email" className="form-control" required
                onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <br />
                <label>Пароль</label>
                <input type="password" className="form-control" required
                onChange={(e)=> setPassword(e.target.value)} value={password}></input>
                <br />
                <div className="signup-btn">
                    <span>Already have an account? Sign in
                    <Link to="/login">Here</Link></span>
                    <button type="submit" className="btn btn-success btn-md">SIGN UP</button>
                </div>
            </form>
            {error&&<>
            <div className="error-message">{ error }</div>
            </>}
        </div>
    )
}
export default Signup