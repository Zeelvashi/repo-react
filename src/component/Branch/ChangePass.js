import React,{useState,useEffect} from 'react'
import logo from '../image/branch.png'
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from 'react-router-dom';
toast.configure();
const ChangePass = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [error, seterror] = useState('')
    const [err,seterrs]=useState({});


    const changepass = (e) => {
        e.preventDefault();
        if (confirmpassword !== password) {
            seterror("Password and confirmpassword must be same!")
        }
        else {
            Axios.put(`${process.env.REACT_APP_URL}/updatepassword/`, { username, password })
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
    const submit=(e)=>{
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
                    <form method='POST'>
                        <div className="fadeIn first">
                            <img src={logo} id="icon" alt="User Icon" />
                        </div>
                        <input type="text" id="login" className="fadeIn second" name="newusername" placeholder="Enter User Name" value={username} onChange={(e) => setusername(e.target.value)} />
                      <br/>  <span style={{ color: "red" }}>{err["username"]}</span>

                        <input type="password" id="newpassword" className="fadeIn third" name="pwd" placeholder="Enter New password" value={password} onChange={(e) => setpassword(e.target.value)} />
                        <br/>  <span style={{ color: "red" }}>{err["password"]}</span>

                         <input type="password" id="confirmpassword" className="fadeIn third" name="confirmpassword" placeholder="confirmpassword" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />
                         <br/><span style={{ color: "red" }}>{err["confirmpassword"]}</span>

                         <br/><span style={{ color: "red", fontSize: "17px" }}>{error}</span>
                        {/* <input type="submit" className="fadeIn fourth" value="Change Password" onClick={submit} /> */}
                        <button className='fadeIn fourth cpbtnbranch' onClick={submit}>Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePass