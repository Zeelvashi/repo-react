import React, { useEffect, useState, useCallback } from 'react';
import { Branchdash } from "./Branchdash";
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
import ReactPaginate from 'react-paginate';
import moment from 'moment'
toast.configure();


function ViewParcel() {

    const navigate = useNavigate();
    const [username, setusername] = useState([]);
    const [branchname, setbranchname] = useState([]);
    const [Data, setData] = useState([]);
    const [isActive, setActive] = useState("true");
    const [assignid, setassignid] = useState("");
    const [staffdata, setstaffdata] = useState([]);
    const [filterdata, setfilterdata] = useState([]);
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
                    // console.log("branchname:",res.data.userValid.username);
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
    const [pageNumber, setPageNumber] = useState(0);
    const userperpage = 7;
    const pagevisited = pageNumber * userperpage;
    const displaysusers = filterdata
        .slice(pagevisited, pagevisited + userperpage)
        .map((info, index) => (
            <tr key={info._id} className='tbltr'>
                <td>
                    <i className="fa fa-trash-o i2" aria-hidden="true" onClick={(e) => submit(e, info._id)} ></i>
                </td>
                <td>{index + 1}</td>
                <td>{info.referancenumber}</td>
                <td>{info.receivername}</td>

                <td>{info.receivercontactnumber}</td>
                <td>{moment(info.createdAt).format('L')}</td>
                <td>{info.pickupbranch}</td>
                <td>{info.mainparcelstatus == "Delivered" ? (<span className='green'>{info.mainparcelstatus}</span>) : info.mainparcelstatus} </td>
                {
                    info.mainparcelstatus != "Delivered" ? (
                        <td>
                            <button className='viewupdatebtn' onClick={(e) => editstus(e, info._id, info.branchparcelstatus)} >{info.mainparcelstatus != "Dispatch" ? "Dispatch" : "UnDispatch"}</button>
                        </td>
                    ) : (<td><i className='fa fa-check green'></i></td>)
                }
            </tr>
        ))

    const pageCount = Math.ceil(filterdata.reverse().length / userperpage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const logout = () => {
        window.localStorage.clear();
        navigate('/');
        window.location.reload();

    }
    useEffect(() => {
        console.log("data:", Data);
        setfilterdata(Data)
    }, [Data])

    const handlesearch = (e) => {

        const b = e.target.value
        console.log("b", b);
        let fdata = Data.filter((v) => {
            return v.mainparcelstatus.includes(b)
        })
        setfilterdata(fdata)


    }


    const editstus = (e, id, pastatus) => {
        let branchparcelstatus = " ";
        let mainparcelstatus = " ";
        if (pastatus === "Collected") {
            branchparcelstatus = "Dispatch";
            mainparcelstatus = "Dispatch"

        }
        else if (pastatus === "Dispatch") {
            branchparcelstatus = "Collected";
            mainparcelstatus = "Collected"
        }
        else {
            branchparcelstatus = "Collected"

        }
        let statusdata = { branchparcelstatus, mainparcelstatus }

        Axios.put(`${process.env.REACT_APP_URL}/updateparcelstatus/${id}`, statusdata)
            .then((res) => {
                Axios.get(`${process.env.REACT_APP_URL}/branchparceldata/${branchname}`)
                    .then((res) => {
                        setData(res.data.branchinfo);
                        setbranchparcel(res.data.branchdata)
                        console.log("branchdata:", res.data.branchdata)
                        console.log("branchinfo:", res.data.branchinfo)
                        setstaffdata(res.data.staffdata);
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
    // const reassign = (id) => {
    //     setClose(!close)

    // }
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
                                <h6 className="font-weight-bolder mb-0 mainad" style={{ marginLeft: "-28px" }}>View Parcel</h6>
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
                        <div style={{ width: "26%", textAlign: "start" }}>
                            <h3 style={{marginLeft:"-10px"}}> Parcel Details </h3>
                        </div>
                        <div style={{ width: "74%", textAlign: "end" }}>
                            <label className='lblsearch'>
                                Search :
                            </label>
                            {/* <input type="text" placeholder='Enter Status' className='inputstatus' onChange={(e) => handlesearch(e)} /> */}
                            <select name="" onChange={(e) => handlesearch(e)} style={{ height: "30px", width: "150px", marginLeft: "20px", borderRadius: "3px" }} >
                                <option value="">All</option>
                                <option value="Collected">Collected</option>
                                <option value="Dispatch">Dispatch</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    </div>

                    <div className="row table-responsive mt-4">
                        <table className="table">
                            <thead>
                                <tr className='tbltr'>

                                    <th scope="col"></th>
                                    <th scope="col">Sr.No</th>

                                    <th scope="col">RefNo</th>
                                    <th scope="col">ReceiverName</th>

                                    <th scope="col">receiverPhno</th>
                                    <th scope="col">orderdate</th>
                                    <th scope="col">DestinationBranch</th>
                                    <th scope="col">ParcelStatus</th>
                                    <th scope="col"></th>


                                </tr>
                            </thead>
                            <tbody>
                                {displaysusers}
                                {/* {filterdata.map((info, index) => (
                                        <tr key={info._id} className='tbltr'>
                                            <td>
                                                <i className="fa fa-trash-o i2" aria-hidden="true" onClick={(e) => submit(e, info._id)} ></i>
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{info.referancenumber}</td>
                                            <td>{info.receivername}</td>

                                            <td>{info.receivercontactnumber}</td>
                                            <td>{moment(info.createdAt).format('L')}</td>
                                            <td>{info.pickupbranch}</td>
                                            <td>{info.mainparcelstatus == "Delivered" ? (<span className='green'>{info.mainparcelstatus}</span>) : info.mainparcelstatus} </td>
                                            {
                                                info.mainparcelstatus != "Delivered" ? (
                                                    <td>
                                                        <button className='viewupdatebtn' onClick={(e) => editstus(e, info._id, info.branchparcelstatus)} >{info.mainparcelstatus != "Dispatch" ? "Dispatch" : "UnDispatch"}</button>
                                                    </td>
                                                ) : (<td><i className='fa fa-check green'></i></td>)
                                            }
                                        </tr>
                                    ))} */}

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

export default ViewParcel