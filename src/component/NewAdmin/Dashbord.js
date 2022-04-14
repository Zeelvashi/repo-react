import React from 'react'
import './Firstpgcss.css';
import { useEffect } from 'react'
import Axios from 'axios'
import { useState } from 'react'
import { getToken } from '../services/getToken';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MainDashbord from './MainDashbord';


const Demo = () => {


    const navigate = useNavigate();
    const [user, setuser] = useState()
    const [isActive, setActive] = useState("false");
    const [branchname, setbranchname] = useState()
    const [branchdata, setbranchdata] = useState([])


    useEffect(() => {
        if (getToken) {
            Axios.get(`${process.env.LIVE_NODE}/loggedin`, { headers: { 'authorization': getToken } })
                .then((res) => {
                    console.log('first res', res.data.userValid.username);
                    setuser(res.data.userValid.username);
                    Axios.get(`${process.env.LIVE_NODE}/branchinfo`)
                        .then((res) => {
                            const data = res.data.branchData;
                            console.log(data);
                            // data.map((i) => {
                            //     console.log('bnm is  ', i.branchname);
                            // })
                            setbranchdata(data);
                            console.log('data is', data);
                            console.log('first bnm', res.data.branchData.branchname);
                            setbranchname(res.data.branchData.username);
                        })
                })
        }
    }, [])
    function logout() {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }

    return (


        <div className='fpgmain'>
            <MainDashbord />
            <main className="main-content position-relative  border-radius-lg ">
                <div>
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                        <div className="container-fluid py-1 px-3">
                            <nav aria-label="breadcrumb">
                                <h6 className="font-weight-bolder mb-0 mainad" style={{marginLeft:"-35px"}}>Dashboard</h6>
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
                </div>

                <main className="mainfpg">
                    <div className="row mt-4">
                        {
                            branchdata.map((i) => (
                                <div className="col-xl-3 col-sm-6 mb-4" >


                                    <section className="card-section">
                                        <div className="fpgcard">
                                            <div className="flip-card">
                                                <div className="flip-card__container">
                                                    <div className="card-front">
                                                        <div className="card-front__tp card-front__tp--beach">


                                                            <p className="card-front__heading" style={{color:"white"}}>
                                                                Branch Name
                                                            </p>
                                                            <h2 className="card-front__text-price" style={{color:"black"}}>
                                                                {i.branchname}
                                                            </h2>
                                                        </div>

                                                        <div className="card-front__bt">
                                                            <p className="card-front__text-view card-front__text-view--beach" >
                                                                <NavLink to={{ pathname: `/suratdetails/${i.branchname}` }}style={{color:"rgba(112, 5, 5, 0.8)"}}>
                                                                    View Details
                                                                </NavLink>
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    </section>



                                </div>
                            ))}
                    </div>


                </main>

            </main>



        </div>
    )
}

export default Demo