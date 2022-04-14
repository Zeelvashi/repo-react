import React from 'react'
import { Branchdash } from './Branchdash'
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from "axios";
import moment from 'moment';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/getToken';
import { NavLink } from 'react-router-dom';
import '../Admin/trackparcelcss.css'
const BranchReport = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState()
    const [info, setinfo] = useState();
    const [staffname, setstaffname] = useState([]);
    const [isActive, setActive] = useState("false");
    const [sdate, setdate] = useState()
    const [show, Setshow] = useState("");
    const [branchshow, setbranchshow] = useState("");
    const [pdata, setpdata] = useState([]);
    const [bdate, setbdate] = useState([]);
    const [btodate, settobdate] = useState();
    const [stodate, settosdate] = useState();
    const [parcelstatus, setparcelstatus] = useState([]);
    const [readytodelivery, setreadytodelivery] = useState([]);
    const [rdata, setrdata] = useState([]);
    const [nodata, setnodata] = useState([]);
    const [rbranchname, setbranchname] = useState("");
    const [bopen, setbopen] = useState(" ")
    const [sopen, setsopen] = useState(false)
    var calenderdt = moment(sdate).format('L');
    var claenderbtodate = moment(btodate).format('L');
    var rcount = 0;
    var dcount = 0;
    var branchcalenderdt = moment(bdate).format('L');
    var staffcalenderdt = moment(stodate).format('L');
    useEffect(() => {
        if (getToken) {
            setbdate(" ")
            Axios.get(`${process.env.REACT_APP_URL}/bloggedin`, { headers: { 'authorization': getToken } })
                .then((res) => {
                    setusername(res.data.userValid.username);
                    setbranchname(res.data.userValid.branchname);
                    const branchname = res.data.userValid.branchname;
                    Axios.get(`${process.env.REACT_APP_URL}/branchparceldata/${branchname}`)
                        .then((res) => {
                            console.log('stf data', res.data.stfdata);
                            setstaffname(res.data.stfdata);
                        })
                })
        }
    }, [])
    function logout() {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }
    const hendlesearch = (e) => {
        e.preventDefault();
        setbranchshow(" ");
        const staffname = info;
        Axios.get(`${process.env.REACT_APP_URL}/staffreport/${staffname}`)
            .then((res) => {
                if (res.status === 200) {
                    Setshow("show");
                }
                else if (res.status === 400) {
                    console.log("hi");
                    Setshow(" ");
                }
                else {
                    console.log("Error");
                }
                setpdata(res.data.staffdata);
            })
    }
    const handlebranchsearch = () => {
        Setshow(" ");
        const branchname = rbranchname;
        const pstatus = parcelstatus
        Axios.get(`${process.env.REACT_APP_URL}/branchparcelreport/${branchname}/${pstatus}/${bdate}/${btodate}`,)
            .then((res) => {
                if (bdate) {
                    console.log("parceldata:", res.data.parceldata);
                    setrdata(res.data.parceldata);
                    setnodata(res.data.nodata)
                    setbranchshow("branchshow");
                }
            })
    }
    const handlebranchclick = () => {
        setsopen(" ");
        setinfo(" ");
        setdate(" ");
        settosdate(" ")
        Setshow(" ");
        if (bopen === "branch") {
            setbopen(" ");
            setbdate(" ");
        }
        else {
            setbopen("branch");
        }
    }
    const handlestaffclick = () => {
        setbopen(" ");
        setbdate(" ");
        settobdate(" ");
        setbranchshow(" ");
        if (sopen === "staff") {
            setsopen(" ");
            setinfo(" ");
            setdate(" ");
        }
        else {
            setsopen("staff");
        }
        // handlebranchclick(" ")
        // setbranchname(" ");
        // setbdate(" ");
    }
    return (
        <div>
            <Branchdash />
            <main className="main-content position-relative  border-radius-lg ">
                <div>
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
                        <div className="container-fluid py-1 px-3">
                            <nav aria-label="breadcrumb">
                                <h6 className="font-weight-bolder mb-0 mainad" style={{ marginLeft: "-45px" }}>Reports</h6>
                            </nav>
                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">
                                <ul className="navbar-nav  justify-content-end ml-auto">
                                    <li className="nav-item d-flex align-items-center resnav resicon">
                                        <span className="d-sm-inline  right1 d-flex">
                                            <i className="fa fa-user me-sm-1 icon1"></i>
                                            <NavDropdown className='navdd' title={username} >
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
                    <div className="container-fluid">
                        <div className="pannel1 row">
                            <div className="col-md-3">
                                <button className='reportbtn12' onClick={handlebranchclick}>
                                    Branch Report
                                </button>
                            </div>
                            {bopen === "branch" ? (<>
                                <div className="col-md-3 select1">
                                    Select Branch Status: <select className='option1' name="" id="" value={parcelstatus} onChange={(e) => setparcelstatus(e.target.value)}>
                                        <option value="" >select</option>
                                        <option value="Collected" >Collected</option>
                                        <option value="Delivered" >Delivered</option>
                                        <option value="Received" >Received</option>
                                        <option value="Delivered By Staff" >Delivered By Staff</option>
                                    </select>
                                </div>
                                <div className="col-md-2">
                                   From : <input className='date1' type="date" value={bdate} onChange={(e) => setbdate(e.target.value)} />
                                </div>
                                <div className="col-md-2">
                                  To : <input className='date1' type="date" value={btodate} onChange={(e) => settobdate(e.target.value)} />
                                </div>
                                <div className="col-md-2">
                                    <button className='rbtn' onClick={handlebranchsearch}>
                                        Parcel Report
                                    </button>
                                </div>
                            </>
                            ) : ""
                            }
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="pannel1 row">
                            <div className="col-md-3 ">
                                <button className='reportbtn' onClick={handlestaffclick}>
                                    Staff Report
                                </button>
                            </div>
                            {sopen === "staff" ? (<>
                                <div className="col-md-3 select1 ml-0" >
                                    Select Staff Name :  <select className='option1 ' value={info} onChange={(e) => setinfo(e.target.value)}>
                                        <option value="">Select Staff Name </option>
                                        {
                                            staffname.map((i) => (
                                                <option value={i.staffname}>{i.staffname}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-md-2">
                                   From : <input className='date1' type="date" value={sdate} onChange={(e) => setdate(e.target.value)} />
                                </div>
                                <div className="col-md-2">
                                  To :  <input className='date1' type="date" value={stodate} onChange={(e) => settosdate(e.target.value)} />
                                </div>
                                <div className="col-md-2">
                                    <button className='rbtn' onClick={hendlesearch}>
                                        Satff Report
                                    </button>
                                </div>
                            </>
                            ) : ""}
                        </div>
                    </div>
                    {
                        sopen === " " && branchshow === "branchshow" ?
                            <div className="row table-responsive mt-4">
                                <table className="table">
                                    <thead>
                                        <tr className='tbltr'>
                                            <th scope='col'>Ref.No</th>
                                            {/* <th scope="col">Sender Name</th> */}
                                            <th scope="col">Receiver Name</th>
                                            <th scope="col">Sender Email</th>
                                            <th scope='col'>Receiver Email</th>
                                            <th scope='col'>Parcel Status</th>
                                            <th scope='col'>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {///branch
                                            (rdata ? rdata : " ").map((i) => (
                                                <>
                                                    {
                                                        parcelstatus == "Collected" ? (
                                                            moment(i.createdAt).format('L') >= branchcalenderdt && moment(i.createdAt).format('L') <= claenderbtodate ? (
                                                                rcount = rcount + 1,
                                                                <tr key={i._id} className='tbltr'>
                                                                    <td>{i.referancenumber}</td>
                                                                    {/* <td>{i.sendername}</td> */}
                                                                    <td>{i.receivername}</td>
                                                                    <td>{i.senderemail}</td>
                                                                    <td>{i.receiveremail}</td>
                                                                    <td>{i.parcelstatus}</td>
                                                                    <td>{moment(i.createdAt).format('L')}</td>
                                                                </tr>
                                                            ) : ""
                                                        ) : parcelstatus == "Delivered" ? (
                                                            moment(i.deliverydate).format('L') >= branchcalenderdt && moment(i.deliverydate).format('L') <= claenderbtodate ? (
                                                                rcount = rcount + 1,
                                                                <tr key={i._id} className='tbltr'>
                                                                    <td>{i.referancenumber}</td>
                                                                    {/* <td>{i.sendername}</td> */}
                                                                    <td>{i.receivername}</td>
                                                                    <td>{i.senderemail}</td>
                                                                    <td>{i.receiveremail}</td>
                                                                    <td>{i.mainparcelstatus}</td>
                                                                    <td>{moment(i.deliverydate).format('L')}</td>
                                                                </tr>
                                                            ) : ""
                                                        ) : parcelstatus == "Received" ? (
                                                            moment(i.receivedate).format('L') >= branchcalenderdt && moment(i.receivedate).format('L') <= claenderbtodate ? (
                                                                rcount = rcount + 1,
                                                                <tr key={i._id} className='tbltr'>
                                                                    <td>{i.referancenumber}</td>
                                                                    {/* <td>{i.sendername}</td> */}
                                                                    <td>{i.receivername}</td>
                                                                    <td>{i.senderemail}</td>
                                                                    <td>{i.receiveremail}</td>
                                                                    <td>{i.parcelstatus}</td>
                                                                    <td>{moment(i.receivedate).format('L')}</td>
                                                                </tr>
                                                            ) : ""
                                                        ) : parcelstatus == "Delivered By Staff" ? (
                                                            moment(i.deliverydate).format('L') >= branchcalenderdt && moment(i.deliverydate).format('L') <= claenderbtodate ? (
                                                                rcount = rcount + 1,
                                                                <tr key={i._id} className='tbltr'>
                                                                    <td>{i.referancenumber}</td>
                                                                    {/* <td>{i.sendername}</td> */}
                                                                    <td>{i.receivername}</td>
                                                                    <td>{i.senderemail}</td>
                                                                    <td>{i.receiveremail}</td>
                                                                    <td>{i.branchparcelstatus}</td>
                                                                    <td>{moment(i.deliverydate).format('L')}</td>
                                                                </tr>
                                                            ) : ""
                                                        ) : " "
                                                    }
                                                </>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            : " "
                    }
                    {
                        bopen === " " && show === "show" ?
                            <div className="row table-responsive mt-4">
                                <table className="table">
                                    <thead>
                                        <tr className='tbltr'>
                                            <th scope='col'>Referance Number</th>
                                            {/* <th scope="col">Sender Name</th> */}
                                            <th scope="col">Receiver Name</th>
                                            <th scope="col">Sender Email</th>
                                            <th scope='col'>Receiver Email</th>
                                            <th scope='col'>Parcel Status</th>
                                            <th scope='col'>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {///staff
                                            pdata.map((item) => (
                                                moment(item.receivedate).format('L') >= calenderdt && moment(item.receivedate).format('L') <= staffcalenderdt && item.parcelstatus == "Received" ? (
                                                    rcount = rcount + 1,
                                                    console.log("rcountL", rcount),
                                                    <tr key={item._id} className='tbltr'>
                                                        <td>{item.referancenumber}</td>
                                                        {/* <td>{item.sendername}</td> */}
                                                        <td>{item.receivername}</td>
                                                        <td>{item.senderemail}</td>
                                                        <td>{item.receiveremail}</td>
                                                        <td>{item.parcelstatus}</td>
                                                        <td>{item.receivedate}</td>
                                                    </tr>
                                                ) : ""
                                            )
                                            )}
                                        {
                                            pdata.map((item) => (
                                                moment(item.deliverydate).format('L') >= calenderdt && moment(item.deliverydate).format('L') <= staffcalenderdt && item.branchparcelstatus == "Delivered" ? (
                                                    dcount = dcount + 1,
                                                    console.log("dcount", dcount),
                                                    <tr key={item._id} className='tbltr'>
                                                        <td>{item.referancenumber}</td>
                                                        {/* <td>{item.sendername}</td> */}
                                                        <td>{item.receivername}</td>
                                                        <td>{item.senderemail}</td>
                                                        <td>{item.receiveremail}</td>
                                                        <td>{item.branchparcelstatus}</td>
                                                        <td>{item.deliverydate}</td>
                                                    </tr>
                                                ) : ""
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {pdata ? (
                                    <b style={{ fontSize: "20px" }} >
                                        Total Parcel <span style={{ color: "orangered" }}>Received</span>  & <span className='green'>Delivered</span> by {info} is  : <span style={{ color: "orangered" }}>{rcount}</span> & <span className='green'>{dcount}</span>
                                    </b>
                                ) : ""}
                            </div>
                            : " "
                    }
                </div>
            </main>
        </div>
    )
}
export default BranchReport