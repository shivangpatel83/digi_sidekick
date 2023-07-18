
import './login.css'
import { useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import APIService from '../../axios'

export const Login=()=>{
    const [loginMail, setLoginEmail ] = useState('')
    const [loginPassword, setLoginPassword ] = useState('')
    const navigate = useNavigate()



    const toggleClick= async ()=>{
        if(loginMail===``||loginPassword===``){
            toast.warn("Please Fill all the Fields!")
            return
        }
        try {
            const response = await APIService.post("/login",{
                    email: loginMail,
                    password: loginPassword
                })
             localStorage.setItem("token", response.data.token)
            toast.success("Login Successful")
             localStorage.setItem(`email`, loginMail)
            navigate(`/landingpage`)
        }
        catch (error){
            if(error.response.status === 401){
                toast.warn(error.response.data.error)
            }
            else if(error.response.status === 500){
                toast.warn(error.response.data.error)
            }
        }
    }



    return (

        <div className="loginSection">
                <h1>Start with Login.</h1>
            
                    <div className='loginContainer'>
                        <h2>Login Form</h2>


                <div className="email">
                    <label className='labelEmail' htmlFor="email">Email: </label>
                    <input className='inputEmail' onChange={(e)=>setLoginEmail(e.target.value)} value={loginMail} type="email" placeholder='Enter the Email'/>
                </div>
                <div className="password">
                    <label className='labelPassword' htmlFor="password">Password: </label>
                    <input className='inputPassword' onChange={(e)=>setLoginPassword(e.target.value)} value={loginPassword} type="password" placeholder='Enter the password'/>
                </div>
                <div className='loginBtn' onClick={toggleClick}><button>Log in</button></div>

                <div className="noAccount">Don't have Account Visit to <Link to='/signup'>Sign Up</Link></div>

            </div>
        </div>


    )
}