import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { NavLink } from 'react-router-dom';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../assets/css/allstyle.css';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/getToken';
toast.configure();


const Parceldata = () => {
    const [Data, SetData] = useState([]);
    const [isEdit, setisEdit] = useState(false);
    const [Editid, setEditid] = useState([]);
    const [parcelstatus, setparcelstatus] = useState([]);
    const [filterdata, setfilterdata] = useState("");
    const [timer, setTimer] = useState(null);
    const [isActive, setActive] = useState("false");
    const navigate = useNavigate();
    const [username,setusername]=useState()

    useEffect(() => {
        Axios.get("http://localhost:8000/loggedin", { headers: { 'authorization': getToken } })
            .then((res) => {
                setusername(res.data.userValid.username);
                Axios.get("http://localhost:8000/parcelinfo")
                    .then((res) => {
                        SetData(res.data.ParcelData);
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
                        Axios.delete(`http://localhost:8000/deleteparceldata/${id}`)
                            .then((res) => {
                                Axios.get("http://localhost:8000/parcelinfo")
                                    .then((res) => {
                                        SetData(res.data.ParcelData);
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

    const editstus = (e, id) => {
        const pstatus = { parcelstatus };
        console.log("It Clicked", pstatus);
        Axios.put(`http://localhost:8000/updateparcelstatus/${id}`, pstatus)
            .then((res) => {
                Axios.get("http://localhost:8000/parcelinfo")
                    .then((res) => {
                        SetData(res.data.ParcelData);
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
        setisEdit(!isEdit);


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
    const editdata = (e, id) => {
        setisEdit(!isEdit);
        setEditid(id);
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
                        <h6 className="font-weight-bolder mb-0 mainad">Parcel</h6>
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
                        <h3>Parcel Detail</h3>
                    </div>
                    <div className='col-md-7 offset col-sm-0'></div>


                    <div className="col-md-2 col-sm-12 btnres">
                        <NavLink to="/addparcel">

                            <button className="btn addbtn">Add Parcel</button>
                        </NavLink>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 offset">

                    </div>
                    <div className="col-md-4 col-sm-12 mt-2">
                        <label className='lblsearch'>
                            Search :
                        </label>
                        <input type="text" placeholder='Enter Status' className='inputstatus' onChange={(e) => handlesearch(e)} />
                    </div>
                </div>
                <div className="row table-responsive mt-4">
                    <table className="table">
                        <thead>
                            <tr>

                                <th scope="col">Action</th>
                                <th scope="col">ReferenceNumber</th>
                                <th scope="col">SenderName</th>
                                <th scope="col">Pick-up Branch</th>
                                <th scope="col">ReceiverName</th>
                                <th scope="col">Receiver Address</th>
                                <th scope="col">Status</th>


                            </tr>
                        </thead>
                        <tbody>
                            {(filterdata ? filterdata : Data).map((info) => (
                                <tr key={info._id}>
                                    <td>
                                        <i className="fa fa-pencil-square-o mr-4 i1" aria-hidden="true" onClick={(e) => editdata(e, info._id)} ></i>
                                        <i className="fa fa-trash-o i2" aria-hidden="true" onClick={(e) => submit(e, info._id)}></i>
                                    </td>
                                    <td>{info.referancenumber}</td>
                                    <td>{info.sendername}</td>
                                    <td>{info.pickupbranch}</td>
                                    <td>{info.receivername}</td>
                                    <td>{info.receiveraddress}</td>
                                    <td> {isEdit && Editid === info._id ?
                                        <select name='parcelstatus' value={info.parcelstatus} onChange={(e) => setparcelstatus(e.target.value)}>
                                            <option value="Collected">Collected</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Pick-up">Pick-up</option>
                                            <option value="Dispatch">Dispatch</option>
                                        </select> : info.parcelstatus}</td>
                                    <td>{isEdit && Editid === info._id ?
                                        <button onClick={(e) => editstus(e, Editid)}>Update Record</button> : ""}</td>
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

export default Parceldata;
