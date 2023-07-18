import APIService from "../../axios"
import "./userData.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Nav } from "../nav/Nav";
import { toast } from "react-toastify";


export const UserData=()=>{
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);



    const handleDelete = async (id) => {
            try{
            const res = await APIService.delete(`/deleteuser/${id}`)
            if(res.status===201){
                toast.success(`User deleted successfully`)
                const res = await APIService.get('getuser')
                setUsers(res.data.allUsers)
            }
            else{
                toast.warn(`Unauthorize to delete User!`)
            }
        }
        catch(error){
            if(error.response.status === 500){
                toast.warn(error.response.data.error)
            }
        }
    }

   useEffect(()=>{
    const fun=async()=>{
        const res = await APIService.get("/getuser")
        setUsers(res.data.allUsers)
    }
        fun()   
   },[])

    return (
        <div className="usersContainer">
        <Nav/>
        <h1>Users</h1>
        <div className="userData">{
            users.map((user) => {
                return (
                    <div key = {user._id} className="userInfo">
                    <div className='entry'>
                    <li key = {user._id}>{user.firstName} {user.lastName}</li>
                    </div>
                    <div className="btns">
                    <button className="editButton button" onClick={() => navigate(`/userEdit/${user._id}`)}>Edit</button>
                    <button className="deleteButton button" onClick={()=>{handleDelete(user._id)}}>Delete</button>
                    </div>
                    </div>
                )
                })
                }
        </div>
   
        </div>
    )
}