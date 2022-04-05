import React, { useState, useEffect } from 'react'
import './Staffhomecss.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { NavDropdown } from "react-bootstrap";
import { getstaffToken } from '../services/getToken';
import logo from "../image/mainlogo.png"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const StaffHome = () => {


    const navigate = useNavigate();
    const [isActive, setActive] = useState("false");
    const [username, setusername] = useState([]);
    const [data, setdata] = useState([]);
    const [total, settotal] = useState();
    const [staffnames, setstaffname] = useState("");


    useEffect(() => {
        Axios.get("http://localhost:8000/sloggedin", {
            headers: { authorization: getstaffToken },
        }).then((res) => {
            setusername(res.data.userValid.username);
            const username = res.data.userValid.username;
            Axios.get(`http://localhost:8000/stfprofile/${username}`)
                .then((res) => {
                    setdata(res.data.staffdata);
                    console.log(res.data.staffdata);
                });

            const staffname = res.data.userValid.staffname.trim();
            setstaffname(staffname)
            console.log("staffname", staffname);
            Axios.get(`http://localhost:8000/staffnotification/${staffname}`)
                .then((res) => {
                    settotal(res.data.countnotify);
                    console.log("total::", res.data.countnotify);
                })

        });


    }, []);
    const clearnotify = () => {

        var staffnm = staffnames
        Axios.put(`http://localhost:8000/staffclose/${staffnm}`)
            .then((res) => {
                const staffname = staffnames

                Axios.get(`http://localhost:8000/staffnotification/${staffname}`)
                    .then((res) => {

                        settotal(res.data.countnotify);
                        console.log("total::", res.data.countnotify);
                    })
                // Axios.get(`http://localhost:8000/staffnotification/${staffname}`)
                //     .then((res) => {
                //         console.log("total dataaa:", res.data.countnotify);
                // settotal(res.data.countnotify)


                //                             }
                //     )
            })



    }

    function logout() {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }


    return (
        <div>
            <div className="logostf">
                <div>
                    <img src={logo} className="stflogo"></img>

                </div>
                <div className='bell'>


                    <span>

                        <Popup trigger={<button className='bellicon' disabled={total == 0} >
                            <i className="fa fa-bell" >
                                <span className="badge"></span>

                                {total > 0 && <span className="notifybadge">1</span>}

                            </i>

                        </button>}
                            position="bottom center">

                            {total > 0 &&
                                <i className='fa fa-close' onClick={clearnotify} style={{ marginLeft: "175px", fontSize: "15px", color: "red" }}>
                                </i>}


                            {total == 0 ? " " : <p>You've Got  <span style={{ color: "green", fontWeight: "bold" }}>{total}</span> New Parcels</p>
                            }
                        </Popup>


                    </span>
                </div>

                <i className="fa fa-user me-sm-1 stfuser"> </i>
                <NavDropdown title={username} className="stflogout">
                    <NavDropdown.Item onClick={logout}>
                        Logout
                    </NavDropdown.Item>
                    <NavDropdown.Item ><NavLink to='/changepassword'>Change Password</NavLink></NavDropdown.Item>
                </NavDropdown>

            </div>
            <div className='stfmain'>
                <h3 className='stfh4 mb-5' style={{ color: "#2196f3" }}>A Company is only as good as the people it keeps</h3>

                <div className="stfcon">
                    <div className="stfcard">
                        <div className="box">
                            <div className="content">
                                {/* <h2></h2>
                                <h3>Card One</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, totam velit? Iure nemo labore inventore?</p>
                                <a href="#">Read More</a> */}
                                <h3>Profile</h3>
                                <label htmlFor="">Name : </label> <p>{data.staffname}</p><br />
                                <label htmlFor="">Email : </label><p>{data.staffemail}</p><br />
                                <label htmlFor="">Contact-no : </label><p>{data.contactnumber}</p><br />
                                <label htmlFor="">Branch Name :</label><p>{data.branchname}</p>
                            </div>
                        </div>
                    </div>

                    <div className="stfcard">
                        <div className="box">
                            <div className="content">
                                {/* <h2></h2>
                                <h3>Card Two</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, totam velit? Iure nemo labore inventore?</p>
                                <a href="#">Read More</a> */}
                                <h3>Activity</h3>
                                <NavLink to="/newparcel" className="new1">
                                    New Parcel
                                </NavLink>
                                <br />
                                <NavLink to="/totalparcel" className="new2">
                                    Parcel History
                                </NavLink>

                            </div>
                        </div>
                    </div>

                    <div className="stfcard">
                        <div className="box">
                            <div className="content">
                                <h3>Terms And Condition</h3>
                                <ul>
                                    <li className='terms'>every parcel have to deliver  customer without any  delay.</li>
                                </ul>
                                <ul>
                                    <li className='terms'>It Is your compeleted responsibility  if you demage any parcel.</li>
                                </ul>
                                <ul>
                                    <li className='terms'>You should be taking a max of 4 leave at a time. (For this leave will be approved if you inform before two weeks and as per your workload.)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffHome