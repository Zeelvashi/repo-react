import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { NavDropdown } from "react-bootstrap";
import { getstaffToken } from '../services/getToken';
import './style.css';
import bg from "./bg.svg";
import logo from "../image/mainlogo.png"
import TermsandCondition from './TermsandCondition';
import Footer from '../User/Footer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const StaffInfo = () => {

    const navigate = useNavigate();
    const [isActive, setActive] = useState("false");
    const [username, setusername] = useState([]);
    const [tdispatch, settdispatch] = useState();
    const [total,settotal]=useState();
    useEffect(() => {
        if (getstaffToken) {
            Axios.get("http://localhost:8000/sloggedin", {
                headers: { authorization: getstaffToken },
            }).then((res) => {
                setusername(res.data.userValid.username);
                const username = res.data.userValid.username;
                const staffname=res.data.userValid.staffname;
                Axios.get(`http://localhost:8000/staffnotification/${staffname}`)
                .then((res)=>{
                        settotal(res.data.countnotify);
                })
                
            });
        }
            else {
            navigate("/");
        }
    }, []);
    function logout() {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    return (
        <div className="container-fluid staffmain">
            <div className="row">
                <div className="col-md-1">
                    <img src={logo} className="courierlogo"></img>
                </div>
                <div className="col-md-10 stitle">
                    <h3 className='hh3'><span className="knztitle">KNZ</span> Courier Management System</h3>
                </div>
                <div className="col-md-1 ">
                    <ul className="navbar-nav  justify-content-end ml-auto">

                   
                    <li >
                                        <span>
                                          
                                         <Popup trigger={<button className='bellicon' disabled={total ==0} >
                                            <i className="fa fa-bell" >
                                                <span className="badge"></span>

                                                {total > 0 && <span className="notifybadge">{total}</span>}

                                            </i>

                                            </button>}
                                                position="bottom center">

                                                {total > 0 &&
                                                    <i className='fa fa-close'  style={{ marginLeft: "230px", fontSize: "15px", color: "red" }}>
                                                    </i>}


                                                { <p>You've Got  <span style={{ color: "green", fontWeight: "bold" }}>{total}</span> New Parcels</p>
                                                }
                                            </Popup>


                                        </span>
                                    </li>

                        <li className="nav-item d-flex align-items-center resnav resicon">
                            <span className="d-sm-inline  mainad d-flex">
                                <div className="d-flex mt-4 rightside">  <i className="fa fa-user me-sm-1 staffuser"> </i>
                                    <NavDropdown title={username} className="stafflo">
                                        <NavDropdown.Item onClick={logout}>
                                            Logout
                                        </NavDropdown.Item>
                                        <NavDropdown.Item ><NavLink to='/changepassword'>Change Password</NavLink></NavDropdown.Item>
                                    </NavDropdown>
                                </div>

                            </span>
                        </li>
                        <li className="nav-item d-xl-none ps-3 d-flex align-items-center resnav">
                            <NavLink
                                to="#"
                                className="nav-link text-body p-0"
                                id="iconNavbarSidenav"
                                onClick={() => setActive(!isActive)}
                            >
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row textpmain">
                <p className='textp1'>WHEN TRUST IS MUST</p>
                <p className='textp2'>CHOOSE US!</p>
            </div>
            <div className="row">
                <div className="col-md-6 col-12">
                    {/* <div className="card cdcourier"> */}
                        {/* <h3 className="cardh3">Parcels History</h3> */}
                        <NavLink to="/totalparcel">
                            <button className="cardbtn">Parcel History</button>
                        </NavLink>
                    {/* </div> */}
                </div>

                <div className="col-md-6 col-12 ml">
                    <div className="b1">
                        {/* <div className="card cdcourier1 cdnewparcel "> */}
                            {/* <span className="rounded-circle ">
                                <p className='n1'>{tdispatch}</p></span>
                            <h3 className="cardh31">New Parcel</h3> */}
                            <NavLink to="/newparcel">
                                <button className="cardbtn1">New Parcel</button>
                            </NavLink>
                        {/* </div> */}
                    </div>

                </div>

            </div>


            <TermsandCondition/>
            <Footer/>
        </div>
    )
}

export default StaffInfo