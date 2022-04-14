import React, { useState, useEffect } from 'react'
import { Branchdash } from './Branchdash'
import { useNavigate } from 'react-router-dom';
import { Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/getToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import "../assets/css/table.css";
import '../assets/css/allstyle.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment'
toast.configure();

const PendingParcel = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState([]);
    const [branchname, setbranchname] = useState([]);
    const [Data, setData] = useState([]);
    const [isActive, setActive] = useState("true");
    const [assignid, setassignid] = useState("");
    const [staffdata, setstaffdata] = useState([]);
    const [filterdata, setfilterdata] = useState("");
    const [timer, setTimer] = useState(null);
    const [assignto, setassignto] = useState("");
    const [isEdit, setisEdit] = useState(false);
    const [Editid, setEditid] = useState([]);
    const [branchparcel, setbranchparcel] = useState([]);
    const [parcelstatus, setparcelstatus] = useState([]);
    const [closeid, setcloseid] = useState([]);
    const [pendingdata, setpendingdata] = useState([]);
    const [isclose, setisclose] = useState("")


    useEffect(() => {
        if (getToken) {
            Axios.get(`${process.env.REACT_APP_URL}/bloggedin`, { headers: { 'authorization': getToken } })
                .then((res) => {

                    setusername(res.data.userValid.username);
                    setbranchname(res.data.userValid.branchname);
                    const branchname = res.data.userValid.branchname;
                    Axios.get(`${process.env.REACT_APP_URL}/branchparceldata/${branchname}`)
                        .then((res) => {
                            setData(res.data.branchinfo);
                            setbranchparcel(res.data.bdata)
                            console.log("branchdata:", res.data.bdata)
                            console.log("branchinfo:", res.data.branchinfo)
                            setstaffdata(res.data.stfdata);
                            setpendingdata(res.data.pendingdata)
                        })
                })
        } else {
            navigate('/')
        }
    }, [])

    const logout = () => {
        window.localStorage.clear();
        navigate('/');
        window.location.reload();

    }
    const handlesearch = (e) => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                let val = e.target.value;
                let fdata = Data.filter((v) => {
                    return v.parcelstatus.toLowerCase().includes(val.toLowerCase())
                })
                console.log(fdata);
                setfilterdata(fdata);
            }, 500)
        );
    }
 
    const editstus = (e, id, pastatus) => {
        let parcelstatus = " ";
        let branchparcelstatus = " ";
        
        if (pastatus === "Pending") {
            parcelstatus = "Received";
            branchparcelstatus = "Received";
           
        }
        else {
            parcelstatus = "Pending"

        }
        let statusdata = { parcelstatus,branchparcelstatus}

        Axios.put(`${process.env.REACT_APP_URL}/updatependingparcelstatus/${id}`, statusdata)
            .then((res) => {
                Axios.get(`${process.env.REACT_APP_URL}/branchparceldata/${branchname}`)
                    .then((res) => {
                        // setData(res.data.branchinfo);
                        // setbranchparcel(res.data.branchdata)
                        // console.log("branchdata:", res.data.branchdata)
                        // console.log("branchinfo:", res.data.branchinfo)
                        // setstaffdata(res.data.staffdata);
                        setpendingdata(res.data.pendingdata)
                    })
                if (res.status === 200) {
                    toast.success("Updated Successfully..", { autoClose: 1000 }
                        , {
                            position: "top-center",
                        })
                }
            })
            .catch((error) => {
                toast.error("Fail To Update Data", {
                    position: "top-center",
                })
            })

    }
    const editdata = (e, id) => {
        setisEdit(!isEdit);
        setEditid(id);
    }
    const submit = (e, id) => {
        confirmAlert({
            title: '',
            message: 'Are you sure you want to delete..?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        Axios.delete(`${process.env.REACT_APP_URL}/deleteparceldata/${id}`)
                            .then((res) => {
                                Axios.get(`${process.env.REACT_APP_URL}/branchparceldata/${branchname}`)
                                    .then((res) => {
                                        setData(res.data.branchinfo);
                                        setbranchparcel(res.data.branchdata);
                                        setstaffdata(res.data.staffdata);
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
    const cleardata = (e, id) => {
        setisclose("true")
        setcloseid(id);
        console.log("It Clicked", id);
    }


    return (
        <div>
            <Branchdash />
            <main className="main-content position-relative  border-radius-lg ">
                <div>
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                        <div className="container-fluid py-1 px-3">
                            <nav aria-label="breadcrumb">
                                <h6 className="font-weight-bolder mb-0 mainad"style={{marginLeft:"-30px"}}>Pending Parcel</h6>
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
                </div>


                <div className="container-fluid mt-3">
                    <div className="reshead" style={{textAlign:"start"}}>
                        
                            <h3 style={{marginLeft:"-15px"}}>Pending Parcel Detail</h3>
                        

                    </div>

                    <div className="row table-responsive mt-4">
                        <table className="table">
                            <thead>
                                <tr className='tbltr'>
                                    <th scope="col">Action</th>
                                <th scope="col">Sr.No</th>
                                    <th scope="col">RefNo</th>
                                    <th scope="col">ReceiverName</th>
                                    <th scope="col">ReceiverAddress</th>
                                    {/* <th scope="col">receiverPhno</th> */}
                                    <th scope="col">orderdate</th>
                                    <th scope="col">Destination Branch</th>
                                    <th scope="col">ParcelStatus</th>
                                    <th scope="col"></th>


                                </tr>
                            </thead>
                            <tbody>
                                {(pendingdata ? pendingdata : " ").map((info,index) => (
                                    <tr key={info._id} className='tbltr'>
                                        <td>
                                            <i className="fa fa-trash-o i2" aria-hidden="true" onClick={(e) => submit(e, info._id)} ></i>
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{info.referancenumber}</td>
                                        <td>{info.receivername}</td>
                                        <td>{info.receiveraddress}</td>
                                        {/* <td>{info.receivercontactnumber}</td> */}
                                        <td>{moment(info.createdAt).format('L')}</td>
                                        <td>{info.pickupbranch}</td>
                                        <td>{info.parcelstatus}</td>
                                        <td>
                                            <button className='viewupdatebtn' onClick={(e) => editstus(e, info._id, info.parcelstatus)} >{info.parcelstatus === "Pending" ? "Received" : " "}</button>
                                        </td>
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

export default PendingParcel