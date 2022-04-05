import React, { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
import { NavDropdown } from 'react-bootstrap';
import { getToken } from '../services/getToken';
import { NavLink } from 'react-router-dom';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

const Report = () => {

    const [data, SetData] = useState([])
    const navigate = useNavigate();
    const [isActive, setActive] = useState("false");
    const [username, setusername] = useState()

    useEffect(() => {
        Axios.get("http://localhost:8000/loggedin", { headers: { 'authorization': getToken } })
            .then((res) => {
                setusername(res.data.userValid.username);
                Axios.get("http://localhost:8000/comment")
                    .then((res) => {
                        SetData(res.data.commentData);
                        console.log('data', res.data.commentData);
                    })
            })

    }, [])
    function logout() {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }

    return (

        <div>
            <Dashboard />
            <main className="main-content position-relative  border-radius-lg ">
                <div>
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl bg-gray" id="navbarBlur" navbar-scroll="true">
                        <div className="container-fluid py-1 px-3">
                            <nav aria-label="breadcrumb">
                                <h6 className="font-weight-bolder mb-0 mainad">Branch</h6>
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
                    <div className="container-fluid mt-5 ">
                        <div className="row table-responsive mt-4">
                            <table className="table">
                                <thead>
                                    <tr>

                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">E-Mail</th>
                                        <th scope="col">Comment</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((i) => (
                                            <tr key={i._id}>
                                                <td>{i.firstname}</td>
                                                <td>{i.lastname}</td>
                                                <td>{i.email}</td>
                                                <td>{i.comment}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Report