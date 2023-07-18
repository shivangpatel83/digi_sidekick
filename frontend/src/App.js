import './App.css';
import { Signup } from './components/signup/Signup';
import { Login } from './components/login/Login';
import { UserData } from './components/userData/UserData';
import {Route, Routes} from 'react-router-dom'
import {ToastContainer} from "react-toastify";
import UserEdit from './components/userEdit/UserEdit';
import ProtectedRoute from './components/ProtectedRoute';
import {NoRoute} from "./components/NoRoute"
import 'react-toastify/dist/ReactToastify.css'



function App() {
  return (
    <div className="App">
       <ToastContainer autoClose={1000} position={"top-center"} hideProgressBar={true}/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={ <Signup/>}/>
        <Route path="/landingpage" element={<ProtectedRoute><UserData/></ProtectedRoute>}/>
        <Route path='/userEdit/:id' element={<ProtectedRoute><UserEdit/></ProtectedRoute>}/>
      <Route path='*' element={<NoRoute/>}/>
      </Routes>
    </div>
  );
}

export default App;
