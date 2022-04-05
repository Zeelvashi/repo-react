import React, { useEffect, useState } from 'react'
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
// import { Button, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { getstaffToken } from '../services/getToken';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';
import Axios from "axios";
import home from '../image/home.png';
import ReactPaginate from 'react-paginate';
import '../assets/css/allstyle.css'


const Totalparcel = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState([]);
    const [data, setdata] = useState([]);

    const [staffname, setstaffname] = useState([]);


    useEffect(() => {
        if (getstaffToken) {
            Axios.get("http://localhost:8000/sloggedin", {
                headers: { authorization: getstaffToken },
            }).then((res) => {
                setusername(res.data.userValid.username);
                console.log(res.data.userValid.staffname);
                setstaffname(res.data.userValid.staffname)
                const username = res.data.userValid.staffname;
                Axios.get(`http://localhost:8000/staffparceldata/${username}`)
                    .then((res) => {
                        setdata(res.data.staffdatadelivere);
                        console.log(res.data.staffdatadelivere);
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
        Axios.put(`http://localhost:8000/updatestaffparcelstatus/${id}`, { branchparcelstatus })
            .then((res) => {
                const username = staffname
                Axios.get(`http://localhost:8000/staffparceldata/${username}`)
                    .then((res) => {
                        console.log("d:",res.data.staffdatadelivere)
                        setdata(res.data.staffdatadelivere);
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
    const [pageNumber, setPageNumber] = useState(0);
    const userperpage = 7;
    const pagevisited = pageNumber * userperpage;
    const displaysusers = data
        .slice(pagevisited, pagevisited + userperpage)
        .map((info) => (
            <tr key={info._id} className='tbltr'>
                <td>{info.referancenumber}</td>

                <td>{info.receivername}</td>
                {/* <td>{info.receiveraddress}</td> */}
                <td>{info.receivercontactnumber}</td>
                <td>{info.branchparcelstatus}</td>
                <td> {info.deliverydate}</td>
               
            </tr>
        ))

    const pageCount = Math.ceil(data.length / userperpage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return (
        <div className='tparcelmain'>
            <NavLink to="/staffhome">
                <img src={home} alt="home" className='homeicon' />
            </NavLink>
            <h3 className="text-center">Parcel Details</h3>
            <div className="container mt-3 historytable">
                <div className="row table-responsive mt-4">
                    <table className="table tblhistory">
                        <thead style={{borderBottom:"none"}}>
                            <tr className='tbltr'>
                                <th scope="col">RefNo</th>  
                                <th scope="col">ReceiverName</th>
                                {/* <th scope="col">ReceiverAddress</th> */}
                                <th scope="col">receiverPhno</th>
                                <th scope="col">ParcelStatus</th>
                                <th scope="col">Delivery Date</th>

                            </tr>
                        </thead>
                        {data ? (
                            <tbody>
                               {displaysusers}

                            </tbody>
                        )

                            : "No Items"}


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

        </div>
    )
}

export default Totalparcel