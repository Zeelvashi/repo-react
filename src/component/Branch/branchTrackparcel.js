import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Branchdash } from './Branchdash'
import Axios from "axios";
import moment from 'moment';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/getToken';
import { NavLink } from 'react-router-dom';
import '../Admin/trackparcelcss.css'

const BranchTrackparcel = () => {

    const [Data, SetData] = useState([]);
    const [show, Setshow] = useState("");
    const [ref, Setref] = useState([]);
    const [num, setnum] = useState({});
    const [nodata, setnodata] = useState(false);
    const [isActive, setActive] = useState("false");
    const [username,setusername]=useState()
    const navigate = useNavigate();

    useEffect(() => {
        if (getToken) {
            Axios.get("http://localhost:8000/bloggedin", { headers: { 'authorization': getToken } })
                .then((res) => {
                    setusername(res.data.userValid.username);
                })
        }
    },[])

    const handlesearch = (e) => {
        e.preventDefault();
        const referancenumber = ref;
        Axios.get(`http://localhost:8000/parcedata/${referancenumber}`)
            .then((res) => {
                if (res.status === 200) {
                    Setshow("show");
                }
                else if (res.status === 400) {
                    console.log("hi");
                    Setshow(" ");
                }
                else {
                    console.log("Error");
                }

                SetData(res.data.ParcelData)

            })
    }
    function logout() {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }

    return (
        <div>
            <Branchdash />
            <main className="main-content position-relative  border-radius-lg ">
                <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl bg-gray" id="navbarBlur" navbar-scroll="true">
                    <div className="container-fluid py-1 px-3">
                        <nav aria-label="breadcrumb">
                            <h6 className="font-weight-bolder mb-0 mainad">Track Parcel</h6>
                        </nav>
                        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">

                            <ul className="navbar-nav  justify-content-end ml-auto">
                                <li className="nav-item d-flex align-items-center resnav resicon">
                                    <span className="d-sm-inline  right1 d-flex">
                                        <i className="fa fa-user me-sm-1 icon1"></i>
                                        <NavDropdown className='navdd' title={username}>
                                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </span>
                                </li>
                                <li className="nav-item d-xl-none ps-3 d-flex align-items-center resnav">
                                    <NavLink to="#" className="nav-link text-body p-0" id="iconNavbarSidenav" onClick={() => setActive(!isActive)}>
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
                </nav>
                <div className="container srccon">
                    <div className="search">
                        <input type="text" placeholder='Enter Referance Number..' value={ref} onChange={(e) => Setref(e.target.value)} />
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <button className='btn mt-3 srhbtn' onClick={(e) => handlesearch(e)} >Search</button>
                    </div>
                </div>

                {show === "show" ?
                    Data.map((info) => (

                        <div className="container-fluid mt-5 ">
                            <div className="row">
                                <div className="col-md-12 mr-auto">
                                    <h5>Tracking Details</h5>
                                </div>
                            </div>
                            <div className="row  mainbox mt-3">
                                <div className="col-md-3 bo1">
                                    <h5>Estimated Delivery time:</h5>
                                    {moment(info.createdAt).add(7, 'days').format('LL')}
                                </div>
                                <div className="col-md-3 bo2">
                                    <h5>Shipping BY:</h5>
                                    knz courier service
                                </div>
                                <div className="col-md-3 bo3">
                                    <h5>Status:</h5>
                                    {info.parcelstatus}

                                </div>
                                <div className="col-md-3 bo4">
                                    <h5>Tracking Number:</h5>
                                    {info.referancenumber}
                                </div>
                            </div>

                            <div className="row mt-5">
                                <div className="track">
                                    <div className={info.parcelstatus === "Collected" || info.parcelstatus === "Shipped" || info.parcelstatus === "Pick-up" || info.parcelstatus === "Dispatch" || info.parcelstatus === "Delivered" ? "step active" : "step "}> <span className="icon"> <i className="fa fa-check"></i> </span> <span className="text">Order Collectesd</span> </div>
                                    <div className={info.parcelstatus === "Shipped" || info.parcelstatus === "Pick-up" || info.parcelstatus === "Dispatch" || info.parcelstatus === "Delivered" ? "step active" : "step "}> <span className="icon"> <i className="fa fa-user"></i> </span> <span className="text"> Shipped</span> </div>
                                    <div className={info.parcelstatus === "Pick-up" || info.parcelstatus === "Dispatch" || info.parcelstatus === "Delivered" ? "step active" : "step "} > <span className="icon"> <i className="fa fa-truck"></i> </span> <span className="text"> Picked Up </span> </div>
                                    <div className={info.parcelstatus === "Dispatch" || info.parcelstatus === "Delivered" ? "step active" : "step "}> <span className="icon"> <i className="fa fa-box"></i> </span> <span className="text">Ready for Dispatch</span> </div>
                                    <div className={info.parcelstatus === "Delivered" ? "step active" : "step "}> <span className="icon"> <i className="fa fa-home"></i> </span> <span className="text">Delivered</span> </div>
                                </div>
                            </div>
                        </div>
                    )) : " "}

            </main>
        </div>
    )
}

export default BranchTrackparcel