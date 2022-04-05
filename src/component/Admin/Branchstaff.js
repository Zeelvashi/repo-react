import React from 'react';
import Dashboard from './Dashboard';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import './table.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { getToken } from '../services/getToken';
toast.configure();


const Branchstaff = () => {

    const [isActive, setActive] = useState("false");
    const [data, SetData] = useState([]);
    const navigate = useNavigate();
    const [username,setusername]=useState();

    useEffect(() => {
        Axios.get("http://localhost:8000/loggedin", { headers: { 'authorization': getToken } })
            .then((res) => {
                setusername(res.data.userValid.username);
                Axios.get("http://localhost:8000/staffinfo")
                    .then((res) => {
                        SetData(res.data.staffData);
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
                        Axios.delete(`http://localhost:8000/deleteStaffData/${id}`)
                            .then((res) => {
                                Axios.get("http://localhost:8000/staffinfo")
                                    .then((res) => {
                                        SetData(res.data.staffData);
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

    return (<div className={isActive ? "g-sidenav-show " : "g-sidenav-show  g-sidenav-pinned"}>

        <Dashboard />
        <main className="main-content position-relative  border-radius-lg ">
            <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl bg-gray" id="navbarBlur" navbar-scroll="true">
                <div className="container-fluid py-1 px-3">
                    <nav aria-label="breadcrumb">
                        <h6 className="font-weight-bolder mb-0 mainad">BranchStaff </h6>
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
            <div className="container-fluid mt-5">
                <div className="row reshead ">
                    <div className="col-md-3 col-sm-12">
                        <h3>Staff Detail</h3>
                    </div>
                    <div className='col-md-7 offset col-sm-0'></div>


                    <div className="col-md-2 col-sm-12 btnres">
                        <NavLink to="/addstaff">
                            <button className="btn addbtn">Add Staff</button>
                        </NavLink>

                    </div>
                </div>
                <div className="row table-responsive mt-4">
                    <table className="table">
                        <thead>
                            <tr>

                                <th scope="col">Action</th>
                                <th scope="col">StaffName</th>
                                <th scope="col">Email</th>
                                <th scope="col">BranchName</th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">ContatNumber</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((info) => (
                                <tr key={info._id}>
                                    <td>
                                        <NavLink to={{ pathname: `/editstaff/${info._id}` }}>
                                            <i className="fa fa-pencil-square-o pr-4 i1" aria-hidden="true" ></i>
                                        </NavLink>
                                        <i className="fa fa-trash-o i2" aria-hidden="true" onClick={(e) => submit(e, info._id)} ></i>
                                    </td>
                                    <td>{info.staffname}</td>
                                    <td>{info.staffemail}</td>
                                    <td>{info.branchname}</td>
                                    <td>{info.staffaddress}</td>
                                    <td>{info.city}</td>
                                    <td>{info.contactnumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
    )
};

export default Branchstaff;
