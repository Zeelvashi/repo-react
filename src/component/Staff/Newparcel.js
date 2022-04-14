import React, { useEffect, useState } from 'react'
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { Button, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getstaffToken } from '../services/getToken';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';
import Axios from "axios";
import home from '../image/home.png';
import './style.css'

toast.configure();

const Newparcel = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState([]);
    const [staffname, setstaffname] = useState([]);
    const [data, setdata] = useState([]);
    const [isEdit, setisEdit] = useState(false);
    const [Editid, setEditid] = useState([]);
    const [parcelstatus, setparcelstatus] = useState([]);
    useEffect(() => {
        if (getstaffToken) {
            Axios.get(`${process.env.REACT_APP_URL}/sloggedin`, {
                headers: { authorization: getstaffToken },
            }).then((res) => {
                setusername(res.data.userValid.username);
                setstaffname(res.data.userValid.staffname)
                console.log("data:", res.data.userValid.staffname)
                const username = res.data.userValid.staffname;
                Axios.get(`${process.env.REACT_APP_URL}/staffparceldata/${username}`)
                    .then((res) => {
                        console.log("d:", res.data.staffdata)
                        setdata(res.data.staffdata);
                    });


            });
        } else {
            navigate("/");
        }
    }, []);
    const editstus = (e, id, pastatus) => {
        let branchparcelstatus = " ";
        if (pastatus === "Received") {
            branchparcelstatus = "Delivered"

        }
        else {
            branchparcelstatus = "Received"

        }
        console.log("pstatus", { branchparcelstatus })
        Axios.put(`${process.env.REACT_APP_URL}/updatestaffparcelstatus/${id}`, { branchparcelstatus })
            .then((res) => {
                const username = staffname
                Axios.get(`${process.env.REACT_APP_URL}/staffparceldata/${username}`)
                    .then((res) => {
                        console.log("d:", res.data.staffdata)
                        setdata(res.data.staffdata);
                    });
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

    return (
        <div className='nparcelmain'>
            <NavLink to="/staffhome">
                <img src={home} alt="home" className='homeicon' />
            </NavLink>
            <h3>New Parcel Data</h3>
            <div className="container mt-3 tblnparcel">
                <div className="row table-responsive mt-4">
                    <table className="table">
                        <thead>
                            <tr className='tbltr'>
                                <th scope="col">RefNo</th>
                                <th scope="col">ParcelStatus</th>
                                <th scope="col">ReceiverName</th>
                                <th scope="col">ReceiverAddress</th>
                                <th scope="col">receiverPhno</th>
                                <th scope="col">Receive Date</th>


                            </tr>
                        </thead>
                        <tbody>
                            {data.map((info) => (
                                <tr key={info._id} className='tbltr'>
                                    <td>{info.branchparcelstatus == "Delivered" ? <span style={{ color: 'green', fontWeight: 'bold' }}>{info.referancenumber}</span> : info.referancenumber}</td>
                                    <td>
                                        <button className='staffupdatebtn' onClick={(e) => editstus(e, info._id, info.branchparcelstatus)} >{info.branchparcelstatus == "Received" ? "Delivered" : "UnDelivered"}</button>
                                    </td>
                                    <td>{info.receivername}</td>
                                    <td>{info.receiveraddress}</td>
                                    <td>{info.receivercontactnumber}</td>
                                    <td>{info.receivedate}</td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default Newparcel