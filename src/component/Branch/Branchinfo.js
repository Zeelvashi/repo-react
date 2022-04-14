import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/getToken';
import Axios from "axios";
import '../assets/css/allstyle.css';
import { Branchdash } from './Branchdash';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Chart, Tooltip, Title, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
Chart.register(Tooltip, Title, ArcElement, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);
toast.configure();

const Branchinfo = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState();
    const [isActive, setActive] = useState("false");
    const [branchnames, setbranchname] = useState();
    const [username, setusername] = useState();
    const [notification, setnotification] = useState([]);
    const [staffnotification, setstaffnotification] = useState([]);
    const [staffcount, setstaffcount] = useState([]);
    const [demoNot, setDemonot] = useState();
    const [count, setcount] = useState(" ");
    const [total, settotal] = useState(0);
    const [flag, setflag] = useState("");
    const [popup, setpopup] = useState(false);
    const [info, setinfo] = useState({
        totalparcel: "",
        totalstaff: "",
        totalcollected: "",
        totalreceived: "",
        totaldispatch: "",
        totaldeliver: "",
        totaldestination: "",
        totaloutfordelivery: ""
    })


    const [piedata, setpiedata] = useState({
        datasets: [
            {
                data: [15, 33, 23, 54, 40],
                backgroundColor: ['#114B5F', '#184D47', '#035956', '#00917C', '#A5F0C5'],
                boderWidth: 7,
            },
        ],
        labels: [
            'Collected', 'In-tansit', 'Arrived At Destination', 'Received', 'Out For Delivery', 'Delivery'
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
                backgroundColor: ['#e50e0e'],
            },
            {
                label: 'Total Staff',
                data: [20],
                backgroundColor: ['#8f1414'],
            },
        ],
    });

    useEffect(() => {
        if (getToken) {
            Axios.get(`${process.env.LIVE_NODE}/bloggedin`, { headers: { 'authorization': getToken } })
                .then((res) => {
                    // console.log('first res', res.data);
                    // setuser(res.data.userValid.username);
                    // console.log('bnm is ',res.data.userValid.username);
                    setusername(res.data.userValid.username);
                    console.log("login successfully");
                    setbranchname(res.data.userValid.branchname)
                    const branchname = res.data.userValid.branchname
                    Axios.get(`${process.env.LIVE_NODE}/notificationdata/${branchname}`)
                        .then((res) => {
                            console.log("total:", res.data.total);

                            settotal(res.data.total)




                            let temp = [];

                            res.data.parceldata && res.data.parceldata.map((item) => {
                                temp.push(item);
                            })
                            res.data.staffparceldata && res.data.staffparceldata.map((item) => {
                                temp.push(item);
                            })

                           
                            // console.log('first res.data.parceldata', res.data.parceldata);
                            // console.log('first res.data.staffparceldata', res.data.staffparceldata);
                            // console.log('first temp', temp);

                            setnotification(temp);
                            // setDemonot({...demoNot, })

                        }
                        )
                    Axios.get(`${process.env.LIVE_NODE}/branchparceldata/${branchname}`)
                        .then((res) => {
                            // console.log(res.data.tparcel);
                            setinfo({
                                totalparcel: res.data.tparcel,
                                totalstaff: res.data.tstaff,
                                totalcollected: res.data.collectedparcel,
                                totalreceived: res.data.receiveparcel,
                                totaldispatch: res.data.tdispatch,
                                totaldeliver: res.data.tdeliver,
                                totaldestination: res.data.destination,
                                totaloutfordelivery: res.data.toutfordelivery

                            })
                            setpiedata({
                                datasets: [
                                    {
                                        data: [res.data.collectedparcel, res.data.tdispatch, res.data.destination, res.data.receiveparcel, res.data.toutfordelivery, res.data.tdeliver],
                                        backgroundColor: ['#ED5565', '#E9573F', '#FFCE54', '#37BC9B', '#4FC1E9', '#5D9CEC'],
                                        // '#00917C', '#A5F0C5,   #114B5F','#184D47', '#035956'
                                        boderWidth: 4
                                    },
                                ],
                                labels: [
                                    'Collected', 'In-tansit', 'Arrived At Destination', 'Received', 'Out For Delivery', 'Delivery'
                                ],
                            });
                            setbardata({
                                labels: ["Total Parcel , Total Staff"],
                                datasets: [
                                    {
                                        label: 'Total Parcel',
                                        data: [res.data.tparcel],
                                        backgroundColor: ['#e50e0e'],
                                    },
                                    {
                                        label: 'Total Staff',
                                        data: [res.data.tstaff],
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

    const clearnotify = () => {

        var branchnm = branchnames
        Axios.put(`${process.env.LIVE_NODE}/updateflag/${branchnm}`)
            .then((res) => {
                const branchname = branchnames
                Axios.get(`${process.env.LIVE_NODE}/notificationdata/${branchname}`)
                    .then((res) => {
                        console.log("total dataaa:", res.data.total);

                        settotal(res.data.total)

                        let temp = [];

                        res.data.parceldata && res.data.parceldata.map((item) => {
                            temp.push(item);
                        })
                        res.data.staffparceldata && res.data.staffparceldata.map((item) => {
                            temp.push(item);
                        })
                        setnotification(temp);
                    }
                    )
            })



    }

    const openpopup=()=>{
  setpopup(!popup)
    }

    function logout() {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }


    return (
        <div className={isActive ? "g-sidenav-show " : "g-sidenav-show   g-sidenav-pinned"}>
            <Branchdash />

            <main className="main-content position-relative  border-radius-lg ">
                <div>

                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                        <div className="container-fluid py-1 px-3">
                            <nav aria-label="breadcrumb">
                                <h6 className="font-weight-bolder mb-0 mainad" style={{marginLeft:"-13px"}}>Dashboard</h6>
                            </nav>
                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">

                                <ul className="navbar-nav  justify-content-end ml-auto">
                                    {/* <li className="nav-item d-flex align-items-center resnav resicon">
                                        <span className="d-sm-inline  right1 d-flex">

                                            <Popup trigger={<button type="button" className="btn style"  >
                                                Notifications <span className="badge badge-dark"></span>
                                                <div className="badge-block">
                                                    Notification<span className="badge badge-danger badge-overlap badge-notification badge-circle mb-5">{count}</span>
                                                </div>
                                            </button>}
                                                position="bottom center">

                                                {notification.map((i) => (
                                                    <p>Ref.No <span style={{ color: "red" }}>{i.referancenumber}</span> Parcel<span style={{ color: "green" }}> Delivered Successfully!</span></p>
                                                ))}
                                                {/* {setflag(!flag)} */}
                                    {/* </Popup> */}


                                    {/* </span> */}
                                    {/* </li> */}

                                    {/* <li>
                                        <i className="fa fa-bell"></i>
                                    </li> */}

                                    {/* <li className="nav-item d-flex align-items-center resnav resicon">
                                        <span className="d-sm-inline  right1 d-flex">
                                        <Popup trigger={<i className="fa fa-bell"></i>}
                                        </Popup>
                                            </span>
                                    </li> */}

                                    <li >
                                        <span>
                                          
                                         <Popup trigger={<button className='bellicon' disabled={total ==0} >
                                            <i className="fa fa-bell" onClick={openpopup}>
                                                <span className="badge"></span>

                                                {total > 0 && <span className="notifybadge">{total}</span>}

                                            </i>

                                            </button>}
                                                position="bottom center">

                                                {total > 0 &&
                                                    <i className='fa fa-close' onClick={clearnotify} style={{ marginLeft: "177px", fontSize: "15px", color: "red" }}>
                                                    </i>}


                                                {notification && notification.map((i) => (
                                                    <p>Ref.No <span style={{ color: "green", fontWeight: "bold" }}>{i.referancenumber}</span> Parcel <span>{i.assignto ? `Delivered By ${i.assignto}` : `Delivered To  ${i.pickupbranch}`}</span></p>
                                                ))}
                                            </Popup>


                                        </span>
                                    </li>





                                    <li className="nav-item d-flex align-items-center resnav resicon">
                                        <span className="d-sm-inline  right1 d-flex">
                                            <i className="fa fa-user me-sm-1 i2"></i>
                                            <NavDropdown className='navdd' title={username}>
                                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                                <NavDropdown.Item ><NavLink to='/changepass'>Change Password</NavLink></NavDropdown.Item>
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
                                    <div className='mx-auto' style={{ width: '58%', height: '45%' }}>
                                        <Pie data={piedata} />
                                    </div>
                                    <h5 className=''>Parcel Status Details</h5>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card card2">
                                    <div className='mx-auto mt-4' style={{ width: "80%", height: "157%" }}>
                                        <Bar data={bardata} className="mt-5" />
                                    </div>
                                    <h5 className=''>Total Parcel & Total  Branch</h5>
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
                                            <h3 className="text-s mb-0 text-capitalize">{info.totalparcel}</h3>
                                            <h4 className="mb-0">Total Parcel</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-danger text-sm font-weight-bolder"></span>Total Parcel At Branch</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 ">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-primary text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">group</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{info.totalstaff}</h3>
                                            <h4 className="mb-0">Total Staff</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Total Staff In Branch</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-g shadow-success text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">check</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{info.totalcollected}</h3>
                                            <h4 className="mb-0">Collected</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-danger text-sm font-weight-bolder"></span>Parcel Collected By Branch</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 ">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-info text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10 ">local_shipping</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{info.totaldispatch}</h3>
                                            <h4 className="mb-0">In Transit</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Dispatched By Branch</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-xl-3 col-sm-6 mb-xl-0 ">
                                <div className="card">
                                    <div className="card-header p-3 pt-2 artd">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-success text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">home</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{info.totaldestination}</h3>
                                            <h5 className="mb-0 text-start ml-3">Arrived At Destination</h5>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-danger text-sm font-weight-bolder"></span>Delivered At Destination</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4  ">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-g shadow-info text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10 ">check</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{info.totalreceived}</h3>
                                            <h4 className="mb-0">Received</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Received By Branch</p>
                                    </div>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4  box1" >
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-success text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">local_shipping</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{info.totaloutfordelivery}</h3>
                                            <h4 className="mb-0">Out For Delivery</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-danger text-sm font-weight-bolder"></span>Assign To Staff</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 ">
                                <div className="card">
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-g shadow-primary text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">check_circle</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{info.totaldeliver}</h3>
                                            <h4 className="mb-0">Delivered</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Delivered By Staff</p>
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

export default Branchinfo