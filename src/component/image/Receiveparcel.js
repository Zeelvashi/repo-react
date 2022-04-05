import React, { useEffect, useState } from 'react';
import { Branchdash } from "./Branchdash";
import { useNavigate } from 'react-router-dom';
import { Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getBranchToken } from '../services/getToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import "../assets/css/table.css";
import '../Admin/addfrm.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment';
toast.configure();

const Receiveparcel = () => {
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
 
  const [closeid, setcloseid] = useState([]);
  const [isclose, setisclose] = useState("");
  
  useEffect(() => {
    if (getBranchToken) {
      Axios.get("http://localhost:8000/branchloggedin", { headers: { 'authorization': getBranchToken } })
        .then((res) => {

          setusername(res.data.userValid.username);
          setbranchname(res.data.userValid.branchname);
          const branchname = res.data.userValid.branchname;
          Axios.get(`http://localhost:8000/branchparceldata/${branchname}`)
            .then((res) => {
              setData(res.data.branchinfo);
              setbranchparcel(res.data.branchdata)
               setstaffdata(res.data.staffdata);
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
  const assignparcel = (e, id) => {
    if (!isActive && assignto) {
      console.log("It Clicked");

      const assignd = { assignto };
      Axios.put(`http://localhost:8000/updateparcelstatus/${id}`, assignd)
        .then((res) => {
          Axios.get(`http://localhost:8000/branchparceldata/${branchname}`)
            .then((res) => {
              setData(res.data.branchinfo);
              setbranchparcel(res.data.branchdata)
              console.log("branchdata:", res.data.branchdata)
              console.log("branchinfo:", res.data.branchinfo)
              setstaffdata(res.data.staffdata);
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
  const editstus = (e, id,pastatus) => {
       let branchparcelstatus=" ";
    if(pastatus === "Received"){
      branchparcelstatus="Delivered"
      
    }
    else{
      branchparcelstatus="Received"
    
    }
       console.log("pstatus",{branchparcelstatus})
    Axios.put(`http://localhost:8000/updatebranchparcelstatus/${id}`, {branchparcelstatus})
      .then((res) => {
        Axios.get(`http://localhost:8000/branchparceldata/${branchname}`)
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
                Axios.get(`http://localhost:8000/branchparceldata/${branchname}`)
                  .then((res) => {
                    setData(res.data.branchinfo);
                    setbranchparcel(res.data.branchdata)
                    console.log("branchdata:", res.data.branchdata)
                    console.log("branchinfo:", res.data.branchinfo)
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
                <h6 className="font-weight-bolder mb-0 mainad">View Parcel</h6>
              </nav>
              <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">
                <ul className="navbar-nav  justify-content-end ml-auto">
                  <li className="nav-item d-flex align-items-center resnav resicon">
                    <span className="d-sm-inline  mainad d-flex right1">
                      <i className="fa fa-user me-sm-1 icon1">
                        <NavDropdown className='navdd' title={username}>
                          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown></i>
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
        <div className="container-fluid mt-5">
          <div className="row reshead ">
            <div className="col-md-5 col-sm-12 ">
              <h3 className='mr-auto'> Received Parcel Detail</h3>
            </div>
            <div className='col-md-3 offset col-sm-0'></div>
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

                  
                  <th scope="col">RefNo</th>
                  <th scope="col">ReceiverName</th>
                  <th scope="col">SenderBranchname</th>
                  <th scope="col">Received Date</th>
                  <th scope="col">ParcelStatus</th>
                  <th scope="col">AssignTo</th>
                 

                </tr>
              </thead>
              <tbody>
                 {(branchparcel ? branchparcel : " ").map((i) => (
                  <tr key={i._id}>
                    <td>{i.referancenumber}</td>
                    <td>{i.receivername}</td>
                     <td>{i.branchprocessed}</td>
                     <td>{moment(i.ReceivedDate).format('LL')}</td>     
                     <td>
                      <button className='updatebtn' onClick={(e) => editstus(e, i._id,i.branchparcelstatus)} >{i.branchparcelstatus =="Received" ?"Delivered":"UnDelivered"}</button></td>               
                    <td>
                      {!i.assignto ?
                        (
                          <button
                            className="assignto"
                            onClick={(e) => assignparcel(e, i._id)}>
                            {isActive ? "Assign To" : "Assign "}
                          </button>
                        ) : (i.assignto)}
                    </td>
                    <td>
                      {!isActive && assignid === i._id ? (
                        <select name='assigndata' value={assignto} onChange={(e) => setassignto(e.target.value)}>
                          <option value="Select Staff">Select Staff</option>
                          {staffdata.map((item) => (
                            <option value={item.staffname}>
                              {item.staffname}
                            </option>))}
                        </select>
                      ) : (
                        " "
                      )}
                    </td>
                    {/* <td>
                    {i.assignto ? <i className="fas fa-window-close clicon" onClick={(e)=>cleardata(e,i._id)}></i> : ""}
                   </td> */}
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

export default Receiveparcel