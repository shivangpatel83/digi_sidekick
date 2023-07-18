import React, { useEffect } from 'react'
import './userEdit.css'
import {useState } from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import APIService from "../../axios";
import { Nav } from '../nav/Nav';

export default function UserEdit() {
    const navigate = useNavigate()
    const params = useParams();
    const [firstName, setFirstName ] = useState('')
    const [lastName, setLastName ] = useState('')
    const [email, setEmail ] = useState('')
    const [country, setCountry ] = useState('')
    const [mobileNumber, setMobileNumber ] = useState('')

    useEffect(()=>{
        const fun= async()=>{
            const res = await APIService.get(`/finduser/${params.id}`)
            const {firstName, lastName,email,country,mobileNumber}= res.data.data
            setFirstName(firstName)
            setLastName(lastName)
            setEmail(email)
            setCountry(country)
            setMobileNumber(mobileNumber)
        }
        fun()
    },[])

    const toggleClick=async()=>{
        if(firstName=== ``|| lastName===``|| email===``|| country === `` || mobileNumber===``) {
            toast.info("Please fill the Information!!!")
                return
            }
            try {
                const response = await APIService.put(`/updateuser/${params.id}`,{
                    firstName,
                    lastName,
                    email,
                    mobileNumber,
                    country,
                })

                if(response.data.status===400){
                    toast.error(response.data.error)
                    return
                }

                toast.success('Account Edit successfully!!!');
                navigate('/landingpage')
            }
            catch (error){
                if(error.response.status === 400){
                    toast.warn(error.response.data.message[0])
                }
            }
              
    }


    return(
        <> 
        <Nav/>
        <div className='signupSection'>
    <div className="signupContainer">
        <h2>User Edit</h2>
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
        <div className='signupBtn' onClick={toggleClick}><button>Update</button></div>
    </div>
    </div>
</>

        )
}
