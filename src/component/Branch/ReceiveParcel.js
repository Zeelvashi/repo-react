import React, { useState, useEffect } from 'react'
import { Branchdash } from "./Branchdash";
import { useNavigate } from 'react-router-dom';
import { Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import "../assets/css/table.css";
import '../Admin/addfrm.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment';
import '../assets/css/allstyle.css'
import ReactPaginate from 'react-paginate';
import { getToken } from '../services/getToken';
toast.configure();

const ReceiveParcel = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState([]);
    const [branchname, setbranchname] = useState([]);
    const [Data, setData] = useState([]);
    const [isActive, setActive] = useState("true");
    const [assignid, setassignid] = useState("");
    const [staffdata, setstaffdata] = useState([]);
    const [filterdata, setfilterdata] = useState([]);
    const [timer, setTimer] = useState(null);
    const [assignto, setassignto] = useState();
    const [isEdit, setisEdit] = useState(false);
    const [Editid, setEditid] = useState([]);
    const [branchparcel, setbranchparcel] = useState([]);
    const [closeid, setcloseid] = useState([]);
    const [isclose, setisclose] = useState("");


    useEffect(() => {
        if (getToken) {
            Axios.get("http://localhost:8000/bloggedin", { headers: { 'authorization': getToken } })
                .then((res) => {

                    setusername(res.data.userValid.username);
                    setbranchname(res.data.userValid.branchname);
                    const branchname = res.data.userValid.branchname;
                    Axios.get(`http://localhost:8000/branchparceldata/${branchname}`)
                        .then((res) => {
                            setData(res.data.branchinfo);
                            setbranchparcel(res.data.bdata)
                            setstaffdata(res.data.stfdata);
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
    useEffect(() => {
        console.log("data:", Data);
        setfilterdata(branchparcel)
    }, [branchparcel])

    const handlesearch = (e) => {

        const b = e.target.value
        console.log("b", b);
        let fdata = branchparcel.filter((v) => {
            return v.branchparcelstatus.includes(b)
        })
        setfilterdata(fdata)


    }
    const assignparcel = (e, id) => {
        if (!isActive && assignto) {
            console.log("It Clicked");

            const assignd = { assignto: assignto.trim() };
            Axios.put(`http://localhost:8000/updateassignstatus/${id}`, assignd)
                .then((res) => {

                    Axios.get(`http://localhost:8000/branchparceldata/${branchname}`)
                        .then((res) => {
                            setData(res.data.branchinfo);
                            setbranchparcel(res.data.bdata)
                            setstaffdata(res.data.stfdata);
                        })
                    if (res.status === 200) {
                        toast.success("Assign Data Successfully..", { autoClose: 1000 }
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
            setActive(!isActive);
            setisclose(!isclose)

        }
        else {
            setActive(!isActive);

            setassignid(id);
        }

    };
    const editstus = (e, id, pastatus) => {
        let branchparcelstatus = " ";
        if (pastatus === "Received") {
            branchparcelstatus = "Ready To Delivery"

        }
        else {
            branchparcelstatus = "Received"

        }
        console.log("pstatus", { branchparcelstatus })
        Axios.put(`http://localhost:8000/updatebranchparcelstatus/${id}`, { branchparcelstatus })
            .then((res) => {
                Axios.get(`http://localhost:8000/branchparceldata/${branchname}`)
                    .then((res) => {
                        setData(res.data.branchinfo);
                        setbranchparcel(res.data.bdata)
                        setstaffdata(res.data.stfdata);
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
    const [pageNumber, setPageNumber] = useState(0);
    const userperpage = 7;
    const pagevisited = pageNumber * userperpage;
    const displaysusers = filterdata
        .slice(pagevisited, pagevisited + userperpage)
    
        .map((i, index) => (
            <tr key={i._id} className='tbltr'>
                <td>{index + 1}</td>
                <td>{i.referancenumber}</td>
                <td>{i.receivername}</td>
                <td>{i.branchprocessed}</td>
                <td>{i.receivedate}</td>
                {/* <td>{i.branchparcelstatus}</td> */}
                <td>{i.branchparcelstatus == "Delivered" ? (<span className='green'>{i.branchparcelstatus}</span>) : i.branchparcelstatus} </td>
                {
                    i.branchparcelstatus != "Delivered" ? (
                        <td>
                            <button className='bupdatebtn' onClick={(e) => editstus(e, i._id, i.branchparcelstatus)} >{i.branchparcelstatus == "Received" ? "Out For Delivery" : "Not-Ready"}</button>
                        </td>
                    ) : (<td><i className='fa fa-check green'>{i.deliverydate}</i></td>)
                }

                <td style={{ display: "grid" }}>
                    {!i.assignto ?
                        (
                            <button
                                className="assignto"
                                onClick={(e) => assignparcel(e, i._id)}>
                                {isActive ? "Assign To" : "Assign "}
                            </button>
                        ) : (i.assignto)}

                    {!isActive && assignid === i._id ? (

                        <select style={{ margin: "10px 0px" }} name='assigndata' value={assignto} onChange={(e) => setassignto(e.target.value)}>
                            <option value="">Select Staff Name </option>
                            {
                                staffdata.map((i) => (
                                    <option value={i.staffname}>{i.staffname}</option>
                                ))
                            }
                        </select>
                    ) : (
                        " "
                    )}
                </td>

            </tr>
        ))
    
        const pageCount = Math.ceil(filterdata.reverse().length / userperpage)
        const changePage = ({ selected }) => {
            setPageNumber(selected)
    }

    return (
        <div>
            <Branchdash />

            <main className="main-content position-relative  border-radius-lg ">
                <div>
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                        <div className="container-fluid py-1 px-3">
                            <nav aria-label="breadcrumb">
                                <h6 className="font-weight-bolder mb-0 mainad" style={{ marginLeft: "-27px" }}>Receive Parcel</h6>
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
                    <div className="row reshead ">
                        <div style={{ width: "26%" }}>
                            <h3 style={{marginLeft:"-38px"}}> Receive Parcel Detail</h3>
                        </div>
                        <div style={{ width: "74%", textAlign: "end" }}>
                            <label className='lblsearch'>
                                Search :
                            </label>
                            {/* <input type="text" placeholder='Enter Status' className='inputstatus' onChange={(e) => handlesearch(e)} /> */}
                            <select name="" onChange={(e) => handlesearch(e)} style={{ height: "30px", width: "150px", marginLeft: "20px", borderRadius: "3px" }} >
                                <option value="">All</option>
                                <option value="Received">Received</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>

                    <div className="row table-responsive mt-4">
                        <table className="table">
                            <thead>
                                <tr className='tbltr'>

                                    <th scope="col">Sr.No</th>
                                    <th scope="col">RefNo</th>
                                    <th scope="col">ReceiverName</th>
                                    <th scope="col">SenderBranchname</th>
                                    <th scope="col">Received Date</th>
                                    <th scope="col">ParcelStatus</th>
                                    <th scope='col'></th>
                                    <th scope="col">AssignTo</th>

                                </tr>
                            </thead>
                            <tbody>
                                {displaysusers}
                            </tbody>

                        </table>
                        <div className='pagenationbike'>
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ReceiveParcel