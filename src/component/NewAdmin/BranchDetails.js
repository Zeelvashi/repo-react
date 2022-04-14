import React from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import { useState } from 'react'
import { getToken } from '../services/getToken';
import { NavLink } from 'react-router-dom';
import { Button, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MainDashbord from './MainDashbord'
import ReactPaginate from 'react-paginate';
import './Admincss.css';
const SuratDetails = () => {
    const navigate = useNavigate();
    const [user, setuser] = useState()
    const [isActive, setActive] = useState("false");
    const [branchname, setbranchname] = useState();
    const [show, setshow] = useState(" ");
    const [staffshow, setstaffshow] = useState(" ");
    const [pdata, setpdata] = useState([]);
    const [rdata, setrdata] = useState([]);
    const [stfdata, setstfdata] = useState([]);
    const [bname, setbname] = useState("")
    const [total, settotal] = useState({
        rcount: "",
        ccount: "",
        maincount: ""
    })
    const [tstaff, settotalstaff] = useState(" ")
    // const [Data,setData]=useState(pdata);
    const url = window.location.href;
    const bnm = url.substring(url.lastIndexOf('/') + 1);
    console.log(bnm);
    const branchnm = bnm.replace(/%20/g, " ");
    useEffect(() => {
        if (getToken) {
            Axios.get(`${process.env.LIVE_NODE}/loggedin`, { headers: { 'authorization': getToken } })
                .then((res) => {
                    console.log('first res', res.data.userValid);
                    setuser(res.data.userValid.username);
                    Axios.get(`${process.env.LIVE_NODE}/branchdata/${bnm}`)
                        .then((res) => {
                            console.log(res.data.branchdata);
                            settotalstaff(res.data.totalstaff)
                            settotal({
                                rcount: res.data.rcount,
                                ccount: res.data.prcount,
                                maincount: res.data.maincount
                            })
                        })
                })
        }
    }, [])
    function logout() {
        localStorage.clear();
        navigate('/maindash');
        window.location.reload();
    }
    const handelshow = (e) => {
        setstaffshow(" ");
        e.preventDefault();
        Axios.get(`${process.env.LIVE_NODE}/branchdata/${bnm}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log('parcel data are ', res.data.prdata);
                    setpdata(res.data.prdata)
                    setrdata(res.data.rdata);
                    setshow("show");
                    let temp = [];
                    res.data.prdata && res.data.prdata.map((i) => {
                        temp.push(i);
                    })
                    res.data.rdata && res.data.rdata.map((i) => {
                        temp.push(i);
                    })
                    setpdata(temp);
                }
                else if (res.status === 400) {
                    console.log("hi");
                    setshow(" ");
                }
                else {
                    console.log("Error");
                }
            })
    }
    const handelstaff = (e) => {
        e.preventDefault();
        setshow(" ");
        Axios.get(`${process.env.LIVE_NODE}/branchdata/${bnm}`)
            .then((res) => {
                if (res.status === 200) {
                    // setpdata(res.data.prdata)
                    setstfdata(res.data.stfdata)
                    console.log('stf data', res.data.stfdata);
                    setstaffshow("fshow");
                    setbname(res.data.stfdata)
                    console.log('uygh', res.data.stfdata.branchname);
                }
                else if (res.status === 400) {
                    console.log("hi");
                    setshow(" ");
                }
                else {
                    console.log("Error");
                }
            })
    }
    const [pageNumber, setPageNumber] = useState(0);
    const userperpage = 5;
    const pagevisited = pageNumber * userperpage;
    const displayparcel = pdata
        .slice(pagevisited, pagevisited + userperpage)
        .map((i) => (
            // console.log('ref no is ',i.referancenumber);
            <tr key={i._id} className='tbltr'>
                {console.log("name", i.receivername)}
                <td>{i.referancenumber}</td>
                <td>{i.receivername}</td>
                <td>{i.sendername}</td>
                <td>{i.receiveraddress}</td>
                <td>{i.receivercontactnumber}</td>
                <td>{i.parcelstatus}</td>
            </tr>
        ))
    const pageCount = Math.ceil(pdata.length / userperpage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    // stf pagignatiion


    const [pageNumber1, setPageNumber1] = useState(0);
    const userperpage1 = 5;
    const pagevisited1 = pageNumber1 * userperpage1;
    const displaystaff = stfdata
        .slice(pagevisited1, pagevisited1 + userperpage1)
        .map((info, index) => (
            // console.log('ref no is ',i.referancenumber);
            <tr key={info._id} className='tbltr'>
                {console.log("name", info.staffname)}
                <td>{index + 1}</td>
                <td>{info.staffname}</td>
                <td>{info.staffemail}</td>
                <td>{info.branchname}</td>
                <td>{info.staffaddress}</td>
                <td>{info.city}</td>
                <td>{info.contactnumber}</td>
            </tr>
        ))
    const pageCount1 = Math.ceil(stfdata.length / userperpage1)
    const changePage1 = ({ selected }) => {
        setPageNumber1(selected)
    }



    return (
        <div>
            <MainDashbord />
            <main className="main-content position-relative  border-radius-lg ">
                <div>
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                        <div className="container-fluid py-1 px-3">
                            <nav aria-label="breadcrumb">
                                <h6 className="font-weight-bolder mb-0 mainad">{branchnm}</h6>
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
                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4  box1" >
                                <div className="card" style={{ height: "150px" }}>
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-g shadow-success text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">view_in_ar</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{total.maincount}</h3>
                                            <h4 className="mb-0">Total Parcel</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3 view">
                                        <p className="mb-0"><span className="text-danger text-sm font-weight-bolder">
                                            <button onClick={handelshow} className="viewbtn">
                                                <b style={{ color: "red" }}>View Details</b>
                                            </button>
                                        </span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 ">
                                <div className="card" style={{ height: "150px" }}>
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-primary text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">group</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{tstaff}</h3>
                                            <h4 className="mb-0">Total Staff</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3 view">
                                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">
                                            <button onClick={handelstaff} className="viewbtn">
                                                <b style={{ color: "green", fontWeight: "bold", border: "none" }}>View Details</b>
                                            </button>
                                        </span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                <div className="card" style={{ height: "150px" }}>
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-g shadow-success text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">check</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{total.ccount}</h3>
                                            <h4 className="mb-0">Collected</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p style={{ marginTop: "-10px" }}><span className="text-danger text-sm font-weight-bolder" >
                                            <b>Total Collected Parcel</b>
                                        </span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 " >
                                <div className="card" style={{ height: "150px" }}>
                                    <div className="card-header p-3 pt-2">
                                        <div className="icon icon-lg icon-shape bg-gradient-o shadow-primary text-center border-radius-xl mt-n4 position-absolute i1">
                                            <i className="material-icons opacity-10">check_circle</i>
                                        </div>
                                        <div className="text-end pt-1">
                                            <h3 className="text-s mb-0 text-capitalize">{total.rcount}</h3>
                                            <h4 className="mb-0">Received</h4>
                                        </div>
                                    </div>
                                    <hr className="dark horizontal my-0" />
                                    <div className="card-footer p-3">
                                        <p style={{ marginTop: "-10px" }}><span className="text-success text-sm font-weight-bolder">
                                            <b style={{ color: "green", fontWeight: "bold", marginTop: "-10px" }}>Totel Received Parcel</b>
                                        </span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {show === "show" ?
                    <div className="row table-responsive mt-4">
                        <table className="table">
                            <thead>
                                <tr className='tbltr'>
                                    <th scope="col">RefNo</th>
                                    <th scope="col">ReceiverName</th>
                                    <th scope="col">SenderName</th>
                                    <th scope="col">ReceiverAddress</th>
                                    <th scope="col">receiverPhno</th>
                                    <th scope="col">ParcelStatus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayparcel}
                                {/* {
                                    pdata.map((i) => (
                                        // console.log('ref no is ',i.referancenumber);
                                        <tr key={i._id} className='tbltr'>
                                            {console.log("name", i.receivername)}
                                            <td>{i.referancenumber}</td>
                                            <td>{i.receivername}</td>
                                            <td>{i.sendername}</td>
                                            <td>{i.receiveraddress}</td>
                                            <td>{i.receivercontactnumber}</td>
                                            <td>{i.parcelstatus}</td>
                                        </tr>
                                    ))}
                                {
                                    rdata.map((i) => (
                                        // console.log('ref no is ',i.referancenumber);
                                        <tr key={i._id} className='tbltr'>
                                            {console.log("name", i.receivername)}
                                            <td>{i.referancenumber}</td>
                                            <td>{i.receivername}</td>
                                            <td>{i.sendername}</td>
                                            <td>{i.receiveraddress}</td>
                                            <td>{i.receivercontactnumber}</td>
                                            <td>{i.parcelstatus}</td>
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
                    : " "}
                {staffshow === "fshow" ?
                    <div className="row table-responsive mt-4">
                        <table className="table">
                            <thead>
                                <tr className='tbltr'>
                                    <th scope="col">Sr.No</th>
                                    <th scope="col">StaffName</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">BranchName</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">City</th>
                                    <th scope="col">ContatNumber</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displaystaff}
                                {/* {
                                    stfdata.map((info, index) => (
                                        // console.log('ref no is ',i.referancenumber);
                                        <tr key={info._id} className='tbltr'>
                                            {console.log("name", info.staffname)}
                                            <td>{index + 1}</td>
                                            <td>{info.staffname}</td>
                                            <td>{info.staffemail}</td>
                                            <td>{info.branchname}</td>
                                            <td>{info.staffaddress}</td>
                                            <td>{info.city}</td>
                                            <td>{info.contactnumber}</td>
                                        </tr>
                                    ))} */}
                            </tbody>
                        </table>
                        <div className='pagenationbike'>
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount1}
                                onPageChange={changePage1}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </div>
                    </div>
                    : " "}
            </main>
        </div>
    )
}
export default SuratDetails













