import React from 'react'
import logo from '../image/staff1.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../style.css';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { NavLink } from "react-router-dom";
toast.configure();

const StaffLogin = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [err,seterr]=useState({});


    const login = (e) => {
        e.preventDefault();
        Axios.post(`${process.env.LIVE_NODE}/stafflogin`, { username, password })
            .then((res) => {
                if(res.status === 200) {
                    navigate('/staffhome');
                    localStorage.setItem("stafftoken", `Bearer ${res.data.stafftoken}`)
                    window.location.reload();
                    toast.success("Login Successfully..",{autoClose:1000}
                    ,{
                        position:"top-center",
                    })                   
                }
                if (res.status === 400) {
                    toast.error("Invalid Details", {
                        position: "top-center",
                    })
                }
            })
            .catch((error)=>{
                toast.error("Invalid Details",{
                    position:"top-center",
                })          
            })
}
const validation=()=>
{
    const err = {};
    let isValid = true;
    if (!username) {
        err.username = "Please Enter UserName";
        isValid = false;
    }
    if (!password) {
        err.password = "Please Enter Password";
        isValid = false;
    }

    seterr(err);
        return isValid;
}
const submit=(e)=>{
    e.preventDefault();
    const isValid = validation();
    console.log(isValid);
    if (isValid) {
        login(e);
    }
}
    return (
        <div>
            <h5>Staff Login</h5>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src={logo} id="icon2" alt="User Icon" />
                    </div>
                    <form method='POST' >
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" value={username} onChange={(e) => setusername(e.target.value)} />
                        <span style={{ color: "red" }}>{err["username"]}</span>
                        <input type="password" id="password" className="fadeIn third" name="login" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                        <span style={{ color: "red" }}>{err["password"]}</span>
                        <input type="submit" className="fadeIn fourth" value="Log In" onClick={submit} />
                        <NavLink to='/forgotpassword' style={{color:"blue",textDecoration:"underline"}}>Forgot Password..?</NavLink>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default StaffLogin
