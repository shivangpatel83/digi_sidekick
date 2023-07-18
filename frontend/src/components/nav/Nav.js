import { useNavigate } from "react-router-dom"
import "./nav.css"

export const Nav=()=>{
    const navigation = useNavigate();
    const email = localStorage.getItem(`email`)
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem(`email`)
        navigation('/')
    }
    
    return(
          <nav>
            <h1>{email?email:``}</h1>
            <button onClick={handleLogOut}>Log Out</button>
        </nav>
    )
    
}