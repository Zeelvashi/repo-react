import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import './style.css'
import { NavLink } from "react-router-dom";
toast.configure();
const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState('')
    // const [staffemail, setstaffemail] = useState('')
    const [show, setshow] = useState(' ');
    const [otp, setotp] = useState(' ')
    const [err, seterrs] = useState({});
    const [username, setusername] = useState('');
    // const [staffusername, setstaffusername] = useState(' ')
    const sendOtp = (e) => {
        e.preventDefault();
        var result = " "
        const randomChars = "123456789"
        for (var i = 0; i < 6; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        const data = { email, result, username }
        Axios.post("http://localhost:8000/sendotp", data)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("OTP Send Successfully..", { autoClose: 1000 }
                        , {
                            position: "top-center",
                        })
                    setshow("show")
                }
            })
            .catch((error) => {
                toast.error("Invalid Details", {
                    position: "top-center",
                })
            })
    }
    const Verifyotp = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8000/verifyotp", { username, otp, email })
            .then((res) => {
                if (res.status === 200) {
                    navigate('/staffhome');
                    localStorage.setItem("stafftoken", `Bearer ${res.data.stafftoken}`)
                    window.location.reload();
                    toast.success("Login Successfully..", { autoClose: 1000 }
                        , {
                            position: "top-center",
                        })
                }
            })
            .catch((error) => {
                toast.error("Invalid OTP Detail", {
                    position: "top-center",
                })
            })
    }
    const validation = () => {
        const err = {};
        let isValid = true;
        if (!username) {
            err.username = "Please Enter UserName";
            isValid = false;
        }
        if (!email) {
            err.email = "Please Enter Password";
            isValid = false;
        }
        // if(!confirmpassword){
        //     err.confirmpassword = "Please Enter Confirm Password";
        //     isValid = false;
        // }
        seterrs(err);
        return isValid;
    }
    const submit = (e) => {
        e.preventDefault();
        const isValid = validation();
        console.log(isValid);
        if (isValid) {
            sendOtp(e);
        }
    }
    return (
        <div className='forgotpass'>
            <div className="container w-50 fpmain">
                <div className="row">
                    {/* <div className='col-md-4 offset'></div> */}
                    <div className="col-md-12 mx-auto">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="text-center">
                                    <h3><i className="fa fa-lock fa-4x"></i></h3>
                                    <h2 className="text-center">Forgot Password?</h2>
                                    <h4>
                                        {show == "show" ?
                                            "Enter OTP"
                                            : "We will send OTP on your email address"}
                                    </h4>
                                    <div className="panel-body">
                                        <form id="register-form" role="form" autocomplete="off" className="form" method="post">
                                            {show == " " ? (
                                                <>
                                                    <div className="form-group mx-auto">
                                                        <label for="exampleInputEmail1" className='mt-4'>User Name</label>
                                                        <input type="email" className="form-control mx-auto text-center fpfrm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter UserName"
                                                            style={{ border: "2px solid black", width: "300px" }} name='username' value={username} onChange={(e) => { setusername(e.target.value) }}
                                                        />
                                                        <span style={{ color: "red" }}>{err["username"]}</span>
                                                        <br />
                                                        <label for="exampleInputEmail1" className='mt-4'>Email address</label>
                                                        <input type="email" className="form-control mx-auto text-center fpfrm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                                            style={{ border: "2px solid black", width: "300px" }} name='email' value={email} onChange={(e) => { setemail(e.target.value) }}
                                                        />
                                                        <span style={{ color: "red" }}>{err["email"]}</span>
                                                    </div>
                                                    <button style={{ border: "none", marginTop: "10px", padding: "10px", width: "200px", backgroundColor: "blue", color: "white" }} onClick={submit}>Send OTP</button>
                                                </>
                                            ) : " "}
                                            <input type="hidden" className="hide" name="token" id="token" value="" />
                                            {show == "show" ? (
                                                <>
                                                    <input type="text" className='fpfrm' placeholder='Enter OTP' style={{ border: "2px solid black", width: "250px" }} name='otp' value={otp} onChange={(e) => setotp(e.target.value.trim())} />
                                                    <span style={{ color: "red" }}>{err["otp"]}</span>
                                                    <br />
                                                    <button style={{ border: "none", marginTop: "10px", padding: "10px", width: "250px", backgroundColor: "blue", color: "white" }} onClick={Verifyotp}>Verify OTP</button>
                                                </>
                                            ) : ""}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-4"></div> */}
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword