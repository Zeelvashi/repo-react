import React, { useEffect, useState } from 'react'
import Axios from "axios";
import { Button, NavDropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Branchdash } from './Branchdash'
import '../Admin/addfrm.css'
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/getToken';
import { useNavigate } from 'react-router-dom';
toast.configure();

const AddBranchParcel = () => {

  const [data, setdata] = useState({
    referancenumber: " ",
    sendername: " ",
    receivername: " ",
    senderaddress: " ",
    receiveraddress: " ",
    sendercontactnumber: " ",
    receivercontactnumber: " ",
    senderemail: " ",
    receiveremail: " ",
    sendercity: " ",
    receivercity: " ",
    branchprocessed: " ",
    pickupbranch: " ",
    weight: " ",
    height: " ",
    width: " ",
    route: " ",

  })

  const [username, setusername] = useState();
  const [branchname, setbranchname] = useState()
  const navigate = useNavigate();
  const [bdata, setbdata] = useState([])

  useEffect(() => {
    if (getToken) {
      Axios.get("http://localhost:8000/bloggedin", { headers: { 'authorization': getToken } })
        .then((res) => {

          setusername(res.data.userValid.username);
          setbranchname(res.data.userValid.branchname);
          const branchname = res.data.userValid.branchname;
          Axios.get("http://localhost:8000/branchinfo")
            .then((res) => {
              const fdata = res.data.branchData;
              setbdata(fdata);
            })
        })
    } else {
      navigate('/')
    }
  }, [])
  const [select, setselect] = useState(true);
  const [price, setprice] = useState("");
  const [err, setErr] = useState({});
  const handlechange = (e) => {
    const { name, value } = e.target
    console.log(name, value);
    console.log(e);
    setdata({
      ...data,
      [name]: value,
    })
  }
  const handleprice = (e) => {
    e.preventDefault();
    setselect(!select);
    const varprice = data.weight;
    let price;
    if (varprice <= 500) {
      price = varprice * 5 / 100;
    }
    else if (varprice > 500) {
      price = varprice * 10 / 100;
    }
    else {
      price = varprice * 30;
    }
    const route = data.route;
    let rprice;
    if (route == "By Road") {
      rprice = 20;
    }
    else if (route == "By Air") {
      rprice = 50;
    }
    else if (route == "By Train") {
      rprice = 30;
    }
    else if (route == "By Ship") {
      rprice = 40;
    }
    else {
      rprice = 0;
    }
    const tprice = price + rprice;
    setprice(tprice)
  }

  const addData = (e) => {
    data.referancenumber = Math.floor(Math.random() * 100000) + 1;
    const { referancenumber, sendername, receivername, senderaddress, receiveraddress, sendercontactnumber,
      receivercontactnumber, senderemail, receiveremail, sendercity, receivercity, branchprocessed, pickupbranch, weight, height, width, route } = data;

    const parceldata = {
      referancenumber, sendername, receivername, senderaddress, receiveraddress, sendercontactnumber,
      receivercontactnumber, senderemail, receiveremail, sendercity, receivercity, branchprocessed, pickupbranch, weight, height, width, route, price
    }
    Axios.post("http://localhost:8000/addparcel", parceldata)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Data Added Successfully..", { autoClose: 1000 }
            , {
              position: "top-center",
            })
            navigate("/viewparcel")
        }
      })
      .catch((error) => {
        toast.error("Fail To Add Data", {
          position: "top-center",
        })
      })
      setdata({
        referancenumber: " ",
        sendername: " ",
        receivername: " ",
        senderaddress: " ",
        receiveraddress: " ",
        sendercontactnumber: " ",
        receivercontactnumber: " ",
        senderemail: " ",
        receiveremail: " ",
        sendercity: " ",
        receivercity: " ",
        branchprocessed: " ",
        pickupbranch: " ",
        weight: " ",
        height: " ",
        width: " ",
        route: " ",
        
      })
      setprice(" ");
      setselect(!select);


  }
  const cleardata = (e) => {
    setdata({
      ...data,
      width: " ",
      height: " ",
      weight: " ",
      route: " "
    })
    setselect(!select);
  }
  const logout = () => {
    window.localStorage.clear();
    navigate('/');
    window.location.reload();

}

 
  const validation = () => {
    const err = {};
    let isValid = true;
    if (!data.sendername || data.sendername == " ") {
      err.sendername = "Field Can-Not Be Empty";
      isValid = false;
    }
    else if (typeof data.sendername !== "undefined") {
      if (!data.sendername.match(/^[a-zA-Z-, ]+$/)) {
        err.sendername = "Please Enter Only Letter";
        isValid = false;
      }
    }
    else {
      console.log("no data")
    }
    //Receiver name
    if (!data.receivername || data.receivername === " ") {
      err.receivername = "Field Can-Not Be Empty";
      isValid = false;
    }
    else if (typeof data.receivername !== "undefined") {
      if (!data.receivername.match(/^[a-zA-Z-, ]+$/)) {
        err.receivername = "Please Enter Only Letter";
        isValid = false;
      }
    }
    else {
      console.log("no data")
    }
    //Sender Adress Validation
    if (!data.senderaddress || data.senderaddress === " ") {
      err.senderaddress = "Field Can-Not Be Empty";
      isValid = false;
    }
    //Receiver Adress Validation
    if (!data.receiveraddress || data.receiveraddress ===" ") {
      err.receiveraddress = "Field Can-Not Be Empty";
      isValid = false;
    }
    //Sender Contact
    if (!data.sendercontactnumber || data.sendercontactnumber === " ") {
      err.sendercontactnumber = "Field Can-Not Be Empty";
      isValid = false;
    }
    else if (typeof data.sendercontactnumber !== "undefined") {
      if (!data.sendercontactnumber.trim().match(/^\d{10}$/)) {
        err.sendercontactnumber = "Please Enter 10 Digit";
        isValid = false;
      }
    }
    else {
      console.log("no data")
    }
    //Receiver Contact
    if (!data.receivercontactnumber || data.receivercontactnumber === " ") {
      err.receivercontactnumber = "Field Can-Not Be Empty";
      isValid = false;
    }
    else if (typeof data.receivercontactnumber !== "undefined") {
      if (!data.receivercontactnumber.trim().match(/^\d{10}$/)) {
        err.receivercontactnumber = "Please Enter 10 Digit";
        isValid = false;
      }
    }
    else {
      console.log("no data")
    }
    //Sender Email Address
    if (!data.senderemail || data.senderemail === " ") {
      err.senderemail = "Field Can-Not Be Empty";
      isValid = false;
    }
    else if (typeof data.senderemail !== "undefined") {
      if (!data.senderemail.match('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')) {
        err.senderemail = "Enter Email in Proper Format";
        isValid = false;
      }
    }
     //Receiver Email Address
     if (!data.receiveremail || data.receiveremail === " ") {
      err.receiveremail = "Field Can-Not Be Empty";
      isValid = false;
    }
    else if (typeof data.receiveremail !== "undefined") {
      if (!data.receiveremail.match('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')) {
        err.receiveremail = "Enter Email in Proper Format";
        isValid = false;
      }
    }
    //Sender City
    if (!data.sendercity || data.sendercity === " ") {
      err.sendercity = "Field Can-Not Be Empty";
      isValid = false;
    }
    else if (typeof data.sendercity !== "undefined") {
      if (!data.sendercity.match(/^[a-zA-Z-, ]+$/)) {
        err.sendercity = "Please Enter Only Letter";
        isValid = false;
      }
    }
    else {
      console.log("no data")
    }
     //Receiver City
     if (!data.receivercity || data.receivercity === " ") {
      err.receivercity = "Field Can-Not Be Empty";
      isValid = false;
    }
    else if (typeof data.receivercity !== "undefined") {
      if (!data.receivercity.match(/^[a-zA-Z-, ]+$/)) {
        err.receivercity = "Please Enter Only Letter";
        isValid = false;
      }
    }
    else {
      console.log("no data")
    }
    if (!data.weight || data.weight === " ") {
      err.weight = "Field Can-Not Be Empty";
      isValid = false;
    }
    if (data.branchprocessed == " ") {
      err.branchprocessed = "Field Can-Not Be Empty";
      isValid = false;
    }
    if (data.pickupbranch == " ") {
      err.pickupbranch = "Field Can-Not Be Empty";
      isValid = false;
    }
    if (data.route == " ") {
      err.route = "Field Can-Not Be Empty";
      isValid = false;
    }
    // else if (typeof data.weight !== "undefined") {
    //   if (!data.weight.match(/^[0-9]/)) {
    //     err.weight = "Please Enter 4 Digit";
    //     isValid = false;
    //   }
    // }
    else {
      console.log("no data")
    }
    
    setErr(err);
    return isValid;
  }
  const onsubmit = (e) => {
    e.preventDefault();
    const isValid = validation();
    console.log("isvalid",isValid);
    if (isValid) {
      console.log("api call");
      addData(e);
    }
  }
  return (
    <div>
      <Branchdash />
      <main className="main-content position-relative  border-radius-lg ">
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl bg-gray cuspos " id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <h6 className="font-weight-bolder mb-0 mainad" style={{marginLeft:"15px"}}>Add Parcel</h6>
            </nav>
            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 " id="navbar">

              <ul className="navbar-nav  justify-content-end ml-auto">
                <li className="nav-item d-flex align-items-center">
                  <span className="d-sm-inline  right1 d-flex">
                    <i className="fa fa-user me-sm-1 icon1"></i>
                    <NavDropdown className='navdd' title={username}>
                      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </span>
                </li>
                <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                  <NavLink to="javascript:;" className="nav-link text-body p-0" id="iconNavbarSidenav">
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
        <div className="container-fluid  ">
          <div className="row body">
            <div className="container ">

              <h3 className="title">Add Parcel Detail</h3>
              <div className="content">
                <form action="#">
                  <div className="user-details">
                    <div className="input-box">
                      <span className="details" style={{position:"relative"}}>Sender Full Name <span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='sendername' value={data.sendername} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                      <span style={{ color: "red" }}>{err["sendername"]}</span>
                    </div>
                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Receiver Full Name<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='receivername' value={data.receivername} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                      <span style={{ color: "red" }}>{err["receivername"]}</span>
                    </div>
                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Sender Address<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='senderaddress' value={data.senderaddress} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                      <span style={{ color: "red" }}>{err["senderaddress"]}</span>
                    </div>
                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Receiver Address<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='receiveraddress' value={data.receiveraddress} onChange={(e) => handlechange(e)} required autoComplete='off' />
                      <span style={{ color: "red" }}>{err["receiveraddress"]}</span>
                    </div>
                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Sender Contact Number<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='sendercontactnumber' value={data.sendercontactnumber} onChange={(e) => handlechange(e)} required autoComplete='off'/>
                      <span style={{ color: "red" }}>{err["sendercontactnumber"]}</span>
                    </div>

                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Receiver  Contact Number<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='receivercontactnumber' value={data.receivercontactnumber} onChange={(e) => handlechange(e)} required  autoComplete='off' />
                      <span style={{ color: "red" }}>{err["receivercontactnumber"]}</span>
                    </div>
                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Sender Email<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='senderemail' value={data.senderemail} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                      <span style={{ color: "red" }}>{err["senderemail"]}</span>
                    </div>

                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Receiver  Email<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='receiveremail' value={data.receiveremail} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                      <span style={{ color: "red" }}>{err["receiveremail"]}</span>
                    </div>
                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Sender City<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='sendercity' value={data.sendercity} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                      <span style={{ color: "red" }}>{err["sendercity"]}</span>
                    </div>

                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Receiver City<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <input type="text" name='receivercity' value={data.receivercity} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                      <span style={{ color: "red" }}>{err["receivercity"]}</span>
                    </div>
                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Branch Processed<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <select className="form-select" aria-label="Default select example" name='branchprocessed' value={data.branchprocessed} onChange={(e) => handlechange(e)}>
                        <option value=" ">Select Branch Name</option>
                        {
                          bdata.map((item) =>
                            <option value={item.branchname}>{item.branchname}</option>
                          )
                        }

                      </select>
                      <span style={{ color: "red" }}>{err["branchprocessed"]}</span>

                    </div>
                    <div className="input-box">
                    <span className="details" style={{position:"relative"}}>Destination Branch<span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></span>
                      <select className="form-select" aria-label="Default select example" name='pickupbranch' value={data.pickupbranch} onChange={(e) => handlechange(e)}>
                      <option value=" ">Select Branch Name</option>
                        {
                          bdata.map((item) =>
                            <option value={item.branchname}>{item.branchname}</option>
                          )
                        }
                      </select>
                      <span style={{ color: "red" }}>{err["pickupbranch"]}</span>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-1 offset"></div>
                    <div className="col-md-2 col-sm-12 reslbl">Weight <span style={{color:"red", position:"absolute",fontSize:"16px",marginLeft:"5px"}}>  *</span></div>
                    <div className="col-md-2 col-sm-12 reslbl ">Height</div>
                    <div className="col-md-2 col-sm-12 reslbl">Width</div>
                    <div className="col-md-2 col-sm-12 reslbl">Route</div>
                    <div className="col-md-2 col-sm-12 reslbl">Price</div>
                    <div className="col-md-1 offset reslbl"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-1 offset"></div>
                    
                    <div className="col-md-2 col-sm-12"><input type="text" name="weight" id="weight" className='smtext sminput' placeholder='Weight' value={data.weight} onChange={(e) => handlechange(e)} />
                      <span style={{ color: "red" }}>{err["weight"]}</span>
                    </div>
                    <div className="col-md-2 col-sm-12"><input type="text" name="height" id="height" className='smtext sminput' placeholder='Height' value={data.height} onChange={(e) => handlechange(e)} /></div>
                    <div className="col-md-2 col-sm-12"><input type="text" name="width" id="width" className='smtext sminput' placeholder='Width' value={data.width} onChange={(e) => handlechange(e)} /></div>
                    <div className="col-md-2 col-sm-12 ">
                      <select className="form-select smdrop mt-2" aria-label="Default select example" name='route' value={data.route} onChange={(e) => handlechange(e)}>
                        <option defaultValue>Route</option>
                        <option value="By Road">By Road</option>
                        <option value="By Air">By Air</option>
                        <option value="By Train">By Train</option>
                        <option value="By Ship">By Ship</option>

                      </select>
                      <span style={{ color: "red" }}>{err["route"]}</span>
                    </div>
                    <div className="col-md-2 col-sm-12 ">{!select ? <div className='d-flex txt'>{price}<i className="fa fa-inr pt-1 pl-2" aria-hidden="true"></i></div> : <button className='pricebtn' onClick={handleprice} >Get Price</button>}
                    </div>
                    <div className="col-md-1 "><i className="fas fa-close clicon" onClick={cleardata}></i> </div>

                    {/* <div className="col-md-2 col-sm-12 "><button className='pricebtn' onClick={handleprice}>Get Price</button></div>
                  <div className="col-md-1 offset"></div> */}
                  </div>


                  <div className="button ">
                    <input type="submit" value="Add Parcel" className='resbtn' onClick={onsubmit} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AddBranchParcel