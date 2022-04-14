import React, { useState, useEffect } from 'react'
import { Branchdash } from './Branchdash';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Axios from "axios";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../services/getToken';
toast.configure();

const BranchStaff = () => {

    const navigate = useNavigate();
    const [isActive, setActive] = useState(false)
    const [data, setdata] = useState([]);
    const [branchname, setbranchname] = useState([]);
    const [username, setusername] = useState([])

    useEffect(() => {
        Axios.get(`${process.env.LIVE_NODE}/bloggedin`, { headers: { 'authorization': getToken } })
            .then((res) => {
                console.log('bst bnm is', res.data.userValid.branchname);
                setbranchname(res.data.userValid.branchname);
                setusername(res.data.userValid.username);
                const branchname = res.data.userValid.branchname
                Axios.get(`${process.env.LIVE_NODE}/branchparceldata/${branchname}`)
                    .then((res) => {
                        console.log('stf data', res.data.stfdata);
                        setdata(res.data.stfdata);
                    })
            })

    }, [])

    function logout() {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }
    const submit = (e, id) => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete..?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        Axios.delete(`${process.env.LIVE_NODE}/deleteStaffData/${id}`)
                            .then((res) => {
                                Axios.get(`${process.env.LIVE_NODE}/branchparceldata/${branchname}`)
                                    .then((res) => {
                                        setdata(res.data.stfdata);
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
    return (
        <div>
            <Branchdash />
            <main className="main-content position-relative  border-radius-lg ">
                <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                    <div className="container-fluid py-1 px-3">
                        <nav aria-label="breadcrumb">
                            <h6 className="font-weight-bolder mb-0 mainad" style={{marginLeft:"-27px"}}>Branch Staff</h6>
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
                <div className="container-fluid mt-3">
                    <div className="row reshead ">

                        <div className="col-md-3 col-sm-12" style={{marginLeft:"-78px"}}>
                            <h3 className='mr-auto'>Staff Detail</h3>
                        </div>
                        <div className='col-md-7 offset col-sm-0'></div>


                        <div className="col-md-2 col-sm-12 btnres" style={{marginLeft:"60px"}}>
                            <NavLink to="/addbranchstaff">
                                <button className="btn addbtn">Add Staff</button>
                            </NavLink>

                        </div>
                    </div>
                    <div className="row table-responsive mt-3">
                        <table className="table">
                            <thead>
                                <tr className='tbltr'>

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
                                    <tr key={info._id} className='tbltr'>
                                        <td>
                                            <NavLink to={{ pathname: `/editbranchstaff/${info._id}` }}>
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
}

export default BranchStaff