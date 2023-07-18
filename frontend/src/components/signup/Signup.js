import './signup.css'
import {useState } from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import APIService from "../../axios";


export const Signup =()=>{

    const navigate = useNavigate()
    const [firstName, setFirstName ] = useState('')
    const [lastName, setLastName ] = useState('')
    const [email, setEmail ] = useState('')
    const [country, setCountry ] = useState('')
    const [mobileNumber, setMobileNumber ] = useState('')
    const [password, setPassword ] = useState('')

    const toggleClick=async()=>{
        if(firstName=== ``|| lastName===``|| email===``|| country === `` || mobileNumber===``||password===``) {
            toast.info("Please fill the Information!!!")
                return
            }
            try {
                const response = await APIService.post("/signup", {
                    firstName,
                    lastName,
                    email,
                    mobileNumber,
                    password,
                    country,
                })
                if(response.data.status===401){
                    toast.error(response.data.error)
                    return
                }
                toast.success('Account Created successfully!!!');
                navigate('/')
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


    return(<div className='signupSection'>
        
        <h1>Start with Sign up.</h1>
    <div className="signupContainer">
        <h2>Sign up Form</h2>
        <div className="firstname">
            <label className='labelFirstName' htmlFor="firstname">First Name: </label>
            <input className='inputFirstName'  onChange={(e)=>setFirstName(e.target.value)} value={firstName} type="text" placeholder='Enter the First Name'/>
        </div>
        <div className="lastname">
            <label className='labelLastName' htmlFor="firstname">Last Name: </label>
            <input className='inputLastName' onChange={(e)=>setLastName(e.target.value)} value={lastName} type="text" placeholder='Enter the last Name'/>
        </div>
        <div className="email">
            <label className='labelEmail' htmlFor="firstname">Email: </label>
            <input className='inputEmail' onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter the Email'/>
        </div>
        <div className='code'>
        <label htmlFor="code">Country Code: </label>
        <input type="number" id="code" value={country} name="code" onChange={(e)=>setCountry(e.target.value)} placeholder='Do not use + symbol'/>
        </div>
        <div className="phone">
            <label className='labelPhone' htmlFor="firstname">Phone: </label>
            <input className='inputPhone' onChange={(e)=>setMobileNumber(e.target.value)} value={mobileNumber} type="tel" placeholder='1234567890'/>
        </div>
        <div className="password">
            <label className='labelPassword' htmlFor="firstname">Password: </label>
            <input className='inputPassword' onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Create Password'/>
        </div>
        <div className='signupBtn' onClick={toggleClick}><button>Sign up</button></div>
        <div className="noAccount">Already a User Visit to <Link to='/'>Login</Link></div>
    </div>

</div>
        )
}


