import React, { useEffect, useState } from 'react';
import Dashboard from '../Admin/Dashboard';
import { NavLink } from 'react-router-dom';
import Axios from "axios";
import "../Admin/table.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NavDropdown } from 'react-bootstrap';
import MainDashbord from './MainDashbord';
import { getToken } from '../services/getToken';
toast.configure();

const Branchtable = () => {
    const [isActive, setActive] = useState("false");
    const [data, SetData] = useState([]);
    const navigate = useNavigate();
    const [username,setusername]=useState();

    useEffect(() => {
        Axios.get("${process.env.LIVE_NODE}/loggedin", { headers: { 'authorization': getToken } })
        .then((res) => {
            setusername(res.data.userValid.username);
            Axios.get("${process.env.LIVE_NODE}/branchinfo")
            .then((res) => {
                SetData(res.data.branchData);
            })
        })

    }, [])

    const submit = (e, id) => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete..?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        Axios.delete(`${process.env.LIVE_NODE}/deleteBranchData/${id}`)
                            .then((res) => {
                                Axios.get("${process.env.LIVE_NODE}/branchinfo")
                                    .then((res) => {
                                        SetData(res.data.branchData);
                                    })
                                toast.success("Delete Successfully..", { autoClose: 1000 }
                                    , {
                                        position: "top-center",
                                    })
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {

                    }
                }
            ]
        })
    }
    function logout() {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }


    return (
        <div className={isActive ? "g-sidenav-show " : "g-sidenav-show  g-sidenav-pinned"}>
                <MainDashbord/>
            <main className="main-content position-relative  border-radius-lg ">
                <div>
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl bg-gray" id="navbarBlur" navbar-scroll="true">
                        <div className="container-fluid py-1 ">
                            <nav aria-label="breadcrumb">
                                <h6 className="font-weight-bolder mb-0 mainad" style={{marginLeft:"-38px"}}>Branch</h6>
                            </nav>
                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">

                                <ul className="navbar-nav  justify-content-end ml-auto">
                                    <li className="nav-item d-flex align-items-center resnav resicon">
                                        <span className="d-sm-inline  right1 d-flex">
                                            <i className="fa fa-user me-sm-1 icon1"></i>
                                            <NavDropdown className='navdd'title={username}>
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
                    <div className="container-fluid ">
                        <div className="row reshead" >
                            <div className="col-md-12 col-sm-12 mr-auto">
                                <h3 style={{marginLeft:"-1060px"}}>Branch Detail</h3>
                            </div>
                          </div>  
                            
                        <div className="row table-responsive mt-4 ">
                            <table className="table">
                                <thead>
                                    <tr className='tbltr'>

                                        <th scope="col">Action</th>
                                        <th scope="col">BranchName</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">ContatNumber</th>
                                        <th scope="col">E-Mail</th>
                                        <th scope="col">City</th>
                                        <th scope="col">ZipCode</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((info) => (
                                        <tr key={info._id} className="tbltr">
                                            <td>
                                                <NavLink to={{ pathname: `/editbranch/${info._id}` }} >
                                                    <i className="fa fa-pencil-square-o pr-4 i1" aria-hidden="true" ></i>
                                                </NavLink>
                                                <i className="fa fa-trash-o i2" aria-hidden="true" onClick={(e) => submit(e, info._id)}></i>
                                            </td>
                                            <td>{info.branchname}</td>
                                            <td>{info.branchaddress}</td>
                                            <td>{info.branchcontactnumber}</td>
                                            <td>{info.branchemail}</td>
                                            <td>{info.city}</td>
                                            <td>{info.zipcode}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
};

export default Branchtable;
