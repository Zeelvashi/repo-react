import React, { useState, useEffect } from 'react'
import logo from '../image/staff1.png'
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './style.css'
import './changepasscss.css'
toast.configure();

const ChangePassword = () => {


    const navigate = useNavigate();
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [error, seterror] = useState('');
    const [err,seterrs]=useState({});


    const changepass = (e) => {
        e.preventDefault();
        if (confirmpassword !== password) {
            seterror("Password and confirmpassword must be same!")
        }
        else {
            Axios.put(`${process.env.REACT_APP_URL}/updatestaffpassword/`, { username, password })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success("Change Successfully..", { autoClose: 1000 }
                            , {
                                position: "top-center",
                            })
                        localStorage.clear();
                        navigate('/');
                        window.location.reload();

                    }
                })
        }

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
        if(!confirmpassword){
            err.confirmpassword = "Please Enter Confirm Password";
            isValid = false;

        }
    
        seterrs(err);
            return isValid;
    }
    const onsubmit=(e)=>{
        e.preventDefault();
        const isValid = validation();
        console.log(isValid);
        if (isValid) {
            changepass(e);
        }
    }


    return (
        <div className='branchchangepass'>
            <div className="wrapper1 fadeInDown">
                <div className="formContent">
                    <h3>Change Your Password</h3>
                    <form method='POST'>
                        <div className="fadeIn first">
                            <img src={logo} id="icon" alt="User Icon" />
                        </div>
                        <input type="text" id="login" className="fadeIn second" name="newusername" placeholder="Enter User Name" value={username} onChange={(e) => setusername(e.target.value)} />
                        <br/>  <span style={{ color: "red" }}>{err["username"]}</span>

                        <input type="password" id="newpassword" className="fadeIn third" name="pwd" placeholder="Enter New password" value={password} onChange={(e) => setpassword(e.target.value)} />
                        <br/>  <span style={{ color: "red" }}>{err["password"]}</span>

                        <input type="password" id="confirmpassword" className="fadeIn third" name="confirmpassword" placeholder="Confirm password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />
                        <br/><span style={{ color: "red" }}>{err["confirmpassword"]}</span>
                        <span style={{ color: "red", fontSize: "17px" }}>{error}</span>

                        {/* <input type="submit" className="fadeIn fourth cpbtn" value="Change Password" onClick={changepass} /> */}
                        <button className='fadeIn fourth cpbtn' onClick={onsubmit}>Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword