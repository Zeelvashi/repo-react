import React, { useEffect, useState } from 'react';
import Dashboard from "./Dashboard";
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/getToken';
import Axios from "axios";
import '../assets/css/allstyle.css';
import { Chart, Tooltip, Title, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Bar } from "react-chartjs-2";
import {Pie} from "react-chartjs-2"
Chart.register(Tooltip, Title, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Info = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState();
    const [isActive, setActive] = useState("false");
    const [Data, setdata] = useState({
        totalbranch: "",
        totalstaff: "",
        totalparcel: "",
        collected: "",
        shipped: "",
        dispatch: "",
        delivered: "",
        pickedup: ""
    });
    const [piedata, setpiedata] = useState({
        datasets: [
            {
                data: [15, 33, 23, 54, 40],
                backgroundColor: ['#114B5F', '#184D47', '#035956', '#00917C', '#A5F0C5'],
                boderWidth: 7,
            },
        ],
        labels: [
            'Collected', 'Shipped', 'Picked-Up', 'Dispatch', 'Delivered'
        ],
    });
    const [bardata, setbardata] = useState({
        labels: [
            'TotalParcel and Total Staff'
        ],
        datasets: [
            {
                label: 'Total Parcel',
                data: [10],
                backgroundColor: ['yellow'],
            },
            {
                label: 'Total Parcel',
                data: [20],
                backgroundColor: ['red'],
            }, {
                label: 'Total Parcel',
                data: [30],
                backgroundColor: ['orange'],
            },
        ],
    });

    useEffect(() => {
        if (getToken) {
            Axios.get("http://localhost:8000/loggedin", { headers: { 'authorization': getToken } })
                .then((res) => {
                    console.log('first res', res.data.userValid.username);
                    setuser(res.data.userValid.username);
                    Axios.get("http://localhost:8000/showdata")
                        .then((res) => {
                            setdata({
                                totalbranch: res.data.totalbranch,
                                totalparcel: res.data.totalparcel,
                                totalstaff: res.data.totalstaff,
                                collected: res.data.tcollected,
                                shipped: res.data.tshipped,
                                dispatch: res.data.tdispatch,
                                pickedup: res.data.tpickup,
                                delivered: res.data.tdelevered
                            })
                            setpiedata({
                                datasets: [
                                    {
                                        data: [res.data.tcollected, res.data.tshipped, res.data.tdispatch, res.data.tpickup, res.data.tdelevered],
                                        backgroundColor: ['#114B5F','#184D47', '#035956', '#00917C', '#A5F0C5'],
                                        boderWidth: 4
                                    },
                                ],
                                labels: [
                                    'Collected', 'Shipped', 'Picked-Up', 'Dispatch', 'Delivered'
                                ],
                            });
                            setbardata({
                                labels: ["Total Parcel, Total Branch ,Total Staff"],
                                datasets: [
                                    {
                                        label: 'Total Parcel',
                                        data: [res.data.totalparcel],
                                        backgroundColor: ['#e50e0e'],
                                    },
                                    {
                                        label: 'Total Branch',
                                        data: [res.data.totalbranch],
                                        backgroundColor: ['#d13828'],
                                    },
                                    {
                                        label: 'Total Staff',
                                        data: [res.data.totalstaff],
                                        backgroundColor: ['#8f1414'],
                                    },
                                ],
                            })
                        })
                })
        } else {
            navigate('/')
        }
    }, [])

    function logout() {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }

    return (
        <div className={isActive ? "g-sidenav-show " : "g-sidenav-show   g-sidenav-pinned"}>
            <Dashboard />

            <main className="main-content position-relative  border-radius-lg ">
                <div>

                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                        <div className="container-fluid py-1 px-3">
                            <nav aria-label="breadcrumb">
                                <h6 className="font-weight-bolder mb-0 mainad">Dashboard</h6>
                            </nav>
                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">

                                <ul className="navbar-nav  justify-content-end ml-auto">
                                    <li className="nav-item d-flex align-items-center resnav resicon">
                                        <span className="d-sm-inline  right1 d-flex">
                                            <i className="fa fa-user me-sm-1 icon1"></i>
                                            <NavDropdown className='navdd' title={user} >
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
                    <div className="container-fluid">
                        <div className="row mt-4">
                        <div className='col-md-6 col-12'>
                            <div className='card card1'>
                            <div className='mx-auto' style={{ width: '58%', height: '45%'}}>
                                <Pie data={piedata} />
                            </div>
                            <h5 className=''>Parcel Status Details</h5>
                            </div>
                        </div>
                            <div className="col-md-6">
                                <div className="card card2">
                                    <div className='mx-auto mt-4' style={{ width: "80%", height: "160%" }}>
                                        <Bar data={bardata} className="mt-5" />
                                    </div>
                                    <h5 className=''>Total Parcel Total , Branch & Total Staff</h5>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="container-fluid py-4">
                        <div className="row mt-6">
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4  box1" >
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-g shadow-success text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">view_in_ar</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{Data.totalparcel}</h3>
                                            <h4 className="mb-0">Total Parcel</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-danger text-sm font-weight-bolder">-2%</span> than yesterday</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 ">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-primary text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">home</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{Data.totalbranch}</h3>
                                            <h4 className="mb-0">Total Branch</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span>than lask month</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-g shadow-success text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">group</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{Data.totalstaff}</h3>
                                            <h4 className="mb-0">Total Staff</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-danger text-sm font-weight-bolder">-2%</span> than yesterday</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-info text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10 ">check_circle</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{Data.collected}</h3>
                                            <h4 className="mb-0">Collected</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+5% </span>than yesterday</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mt-5' >


                            <div className="col-xl-3 col-sm-6">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-info text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10 ">local_shipping</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{Data.shipped}</h3>
                                            <h4 className="mb-0">Shipped</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+5% </span>than yesterday</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 dis1">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-g shadow-success text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">shopping_cart</i>
                                        </div>
                                        <div className="text-end pt-1 ">
                                            <h3 className="text-s mb-0 text-capitalize">{Data.pickedup}</h3>
                                            <h4 className="mb-0">Picked-Up</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-danger text-sm font-weight-bolder">-2%</span> than yesterday</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 ">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-primary text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">send</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{Data.dispatch}</h3>
                                            <h4 className="mb-0">Dispatch</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+3% </span>than lask month</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4  box1" >
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-g shadow-dark text-center border-radius-xl mt-n4 position-absolute i1 ">
                                            <i className="material-icons opacity-10  ">check</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{Data.delivered}</h3>
                                            <h4 className="mb-0">Delivered</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+55% </span>than lask week</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Info