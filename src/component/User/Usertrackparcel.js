import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Admin/trackparcelcss.css';
import Axios from "axios";
import moment, { normalizeUnits } from 'moment';
import './Trackcss.css';
import './usertrackcss.css'
import { useNavigate } from 'react-router-dom';
const Usertrackparcel = () => {
    const [show, Setshow] = useState("");
    const [ref, Setref] = useState([]);
    const [referr, Setreferr] = useState(" ");
    const [dataresult, setdataresult] = useState('');
    const [confirmcap, setconfirmcap] = useState('');
    const [isActive, setActive] = useState(false);
    const navigate = useNavigate();
    const [caperror, setcaperror] = useState();
    const [captcha, setcaptcha] = useState("");
    const [parcel, setparcel] = useState({
        parceldata: "",
        destinationdata: "",
        staffparceldata: ""
    });
    const [parcelstatus, setparcelstatus] = useState("");
    var result = " ";
    useEffect(() => {
        const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789"
        for (var i = 0; i < 6; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        console.log('result', result)
        setdataresult(result.trim());
    }, [])
    const setcap = () => {
        const referancenumber = ref;
        Axios.get(`${process.env.LIVE_NODE}/trackparcel/${referancenumber}`)
            .then((res) => {
                if (res.status == 400) {
                    Setreferr("Reference no. Not Exists")
                }
                else {
                    Setreferr('')
                    setcaptcha("captcha");
                }
            }).catch((err) => {
                console.log('err', err.request);
                console.log('err', err.response);
                console.log('err', err.response.data.message);
                setcaptcha('')
                Setreferr(err.response.data.message)
                console.log('first err', err)
            })
    }
    const handlesearch = (e) => {
        e.preventDefault();
        console.log('dataresult', dataresult);
        console.log('confirmcap', confirmcap);
        if (dataresult !== confirmcap) {
            setcaperror("Please Enter Valid Captcha")
        }
        else {
            setcaptcha("");
            const referancenumber = ref;
            Axios.get(`${process.env.LIVE_NODE}/trackparcel/${referancenumber}`)
                .then((res) => {
                    if (res.status === 200) {
                        Setshow("show");
                        setparcel({
                            parceldata: res.data.parceldata,
                            destinationdata: res.data.destinationdata,
                            staffparceldata: res.data.staffparceldata
                        })
                        if (res.data.staffparceldata.branchparcelstatus == "Delivered") {
                            setparcelstatus("Delivered");
                        }
                        else if (res.data.staffparceldata.parcelstatus == "Received") {
                            setparcelstatus("Ready For Delivere");
                        }
                        else if (res.data.destinationdata.parcelstatus == "Received") {
                            setparcelstatus("Pickedup By Destiny Branch");
                        }
                        else if (res.data.parceldata.branchparcelstatus == "Dispatch") {
                            setparcelstatus("In-Transit");
                        }
                        else if (res.data.parceldata.parcelstatus == "Collected") {
                            setparcelstatus("Collected");
                        }
                        else {
                            setparcelstatus("Data Not Available");
                        }
                    }
                    else if (res.status === 400) {
                        console.log("hi");
                        Setshow(" ");
                    }
                    else {
                        console.log("Error");
                    }
                })
        }
    }
    return (
        <div className="utmain">
            <div className={isActive ? "g-sidenav-show " : "g-sidenav-show  g-sidenav-pinned"}>
                {/* <Dashboard /> */}
                <main className="main-content position-relative  border-radius-lg trackmain">
                    {/* <div className="tracklogo">
                    <img src={mainlogo1} alt="" className='tracpulogo' />
                </div> */}
                    {/* <div className="row">
                    <div className="col-md-12 mx-auto">
                        <div className="tracuserktxt mx-auto">
                            <h3 className='tracktitle'> <span className='usertxtspan'>KNZ</span> Courier Service</h3>
                        </div>
                    </div>
                </div> */}
                    {!show && <div className="container srccon1 mt-6">
                        <h3>Track Your Parcel</h3>
                        <div className="search">
                            <input type="text" placeholder='Enter Referance Number..' name="reference" value={ref} onChange={(e) => Setref(e.target.value)} />
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <button className='btn mt-3 srhbtn' onClick={setcap}  >Next</button><br />
                            {console.log("reffno", referr)}
                            <span style={{ color: "red", marginRight: "110px" }}>{referr}</span>
                            <div>
                                {
                                    captcha === "captcha" ? (
                                        <>
                                            <div className='capspan'>
                                                <p className='cap1'>{dataresult}</p>
                                                <input type="text" placeholder='Enter Captcha' id='capinput' value={confirmcap} onChange={(e) => setconfirmcap(e.target.value)} autoComplete="off" />
                                                <button className='btn mt-3 capbtn' onClick={handlesearch} >Search</button>
                                            </div>
                                            <span style={{ color: "red" }}>{caperror}</span>
                                        </>
                                    ) : " "
                                }
                            </div>
                        </div>
                    </div>
                    }
                    {show === "show" ?
                        <div className='usermain1'>
                            <div className="trackmain1">
                                <h3 className='orderstatus mt-3'>Parcel Status</h3>
                                <h4 className='orderstatus mt-3'>Referance Number - <b>{parcel.parceldata.referancenumber}</b></h4>
                                <div className="row mt-3 usertrack2">
                                    <div className="track">
                                        <div className={parcelstatus === "Collected" || parcelstatus === "In-Transit" || parcelstatus === "Pickedup By Destiny Branch" || parcelstatus === "Ready For Delivere" || parcelstatus === "Delivered" ? "step active" : "step "}> <span className="icon"> <i className="fa fa-check"></i> </span> <span className="text">Order Collected</span> </div>
                                        <div className={parcelstatus === "In-Transit" || parcelstatus === "Pickedup By Destiny Branch" || parcelstatus === "Ready For Delivere" || parcelstatus === "Delivered" ? "step active" : "step "}> <span className="icon"> <i className="fa fa-truck"></i> </span> <span className="text"> In-Transit</span> </div>
                                        <div className={parcelstatus === "Pickedup By Destiny Branch" || parcelstatus === "Ready For Delivere" || parcelstatus === "Delivered" ? "step active" : "step "} > <span className="icon"> <i className="fa fa-box"></i> </span> <span className="text"> Pickedup By <span style={{ color: "rgb(55, 129, 226)", fontWeight: "bold" }}>{parcel.parceldata.pickupbranch}</span> Branch </span> </div>
                                        <div className={parcelstatus === "Ready For Delivere" || parcelstatus === "Delivered" ? "step active" : "step "}> <span className="icon"> <i className="fa fa-user"></i> </span> <span className="text">Ready For Delivere</span> </div>
                                        <div className={parcelstatus === "Delivered" ? "step active" : "step "}> <span className="icon"> <i className="fa fa-home"></i> </span> <span className="text">Delivered</span> </div>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-12 ">
                                        <div className="details1 d-table  mx-auto">
                                            <div className="d-table-row">
                                                <div className="d-table-cell" style={{ textAlign: "left" }}> Shipped with </div>
                                                <div className="d-table-cell" style={{ paddingLeft: "3rem", textAlign: "left" }}>{parcel.parceldata.branchprocessed}</div>
                                            </div>
                                            <div className="d-table-row">
                                                <div className="d-table-cell" style={{ textAlign: "left" }}> Estimated Delivery </div>
                                                <div className="d-table-cell" style={{ paddingLeft: "3rem", textAlign: "left" }}> {moment(parcel.parceldata.createdAt).add(7, 'days').format('LL')}</div>
                                            </div>
                                            <div className="d-table-row">
                                                <div className="d-table-cell" style={{ textAlign: "left" }}> Parcel Status </div>
                                                <div className="d-table-cell" style={{ paddingLeft: "3rem", textAlign: "left" }}>{parcelstatus} </div>
                                            </div>
                                            <div className="d-table-row">
                                                <div className="d-table-cell" style={{ textAlign: "left" }}> Sender Name </div>
                                                <div className="d-table-cell" style={{ paddingLeft: "3rem", textAlign: "left" }}>{parcel.parceldata.sendername} </div>
                                            </div>
                                            <div className="d-table-row">
                                                <div className="d-table-cell" style={{ textAlign: "left" }}> Receiver Name </div>
                                                <div className="d-table-cell" style={{ paddingLeft: "3rem", textAlign: "left" }}>{parcel.parceldata.receivername}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : " "}
                </main>
            </div>
        </div>
    )
};
export default Usertrackparcel;