// import React from 'react';
// import './addfrm.css'
// import { NavLink } from 'react-router-dom';
// import home from '../image/home.png';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useState ,useEffect } from 'react';
// import Axios from "axios";

// toast.configure();


// const Addstaff = () => {

//     const [data,SetData]=useState([]);
//     const [err,setErr]=useState({});
//     const [isEdit,SetisEdit]=useState(false);
//     const [staff, setstaff] = useState({
//         staffname :" ",
//         staffemail:" ",
//         branchname:" ",
//         staffaddress:" ",
//         city:" ",
//         contactnumber:" "
//     })
//     const handlechange = (e) => {
//         const { name, value } = e.target
//         console.log(name, value);
//         console.log(e);
//         setstaff({
//             ...staff,
//             [name]: value,
//         })
//     }
//     useEffect(() => {
//          Axios.get("http://localhost:8000/branchinfo")
//             .then((res) => {
//                 const fdata=res.data.branchData;        
//                SetData(fdata);
//             })
//     }, [])
//     const AddData = (e) => {
//         e.preventDefault();
//         const { staffname,staffemail,branchname,staffaddress,city,contactnumber } = staff;
//         const staffdata = { staffname,staffemail,branchname,staffaddress,city,contactnumber }
//         Axios.post("http://localhost:8000/addstaff", staffdata)
//             .then((res) => {
//                 if (res.status === 200) {
//                     toast.success("Data Added Successfully..", { autoClose: 1000 }
//                         , {
//                             position: "top-center",
//                         })
//                 }
//             })
//             .catch((error) => {
//                 toast.error("Fail To Add Data", {
//                     position: "top-center",
//                 })
//             })
//             setstaff({
//                 staffname :" ",
//                 staffemail:" ",
//                 branchname:" ",
//                 staffaddress:" ",
//                 city:" ",
//                 contactnumber:" "

//         });
//     }

//     const url = window.location.href;
//     const id = url.substring(url.lastIndexOf('/') + 1);

//     useEffect(() => {
//         if (id) {
//             Axios.get(`http://localhost:8000/staffdata/${id}`)
//                 .then((res) => {
//                     console.log("data:", res.data.staffData)
//                     setstaff(res.data.staffData)
//                     SetisEdit(!isEdit);
//                 })
//         }
//     }, [])

//     const editData = (e) => {
//         e.preventDefault();
//         const { staffname,staffemail,branchname,staffaddress,city,contactnumber } = staff;
//         const staffdata = { staffname,staffemail,branchname,staffaddress,city,contactnumber };
//         Axios.put(`http://localhost:8000/updateStaffData/${id}`, staffdata)
//             .then((res) => {
//                 if (res.status === 200) {
//                     toast.success("Updated Successfully..", { autoClose: 1000 }
//                         , {
//                             position: "top-center",
//                         })
//                 }
//             })
//             .catch((error) => {
//                 toast.error("Fail To Update Data", {
//                     position: "top-center",
//                 })
//             })
//     }

//     const onsubmit = (e) => {
//         e.preventDefault();
//         const isValid = validation();
//         if (isValid) {
//             AddData();
//         }
//     }
//     const validation = () => {
//         const err = {};
//         let isValid = true;
//         if (!staff.staffname) {
//             err.staffname = "Field Cant Not Be Empty";
//             isValid = false;
//         }
//         else if (typeof staff.staffname !== "undefined") {
//             if (!staff.staffname.match(/^[a-zA-Z]+$/)) {
//                 err.staffname = "Please Enter Only Letter";
//                 isValid = false;
//             }
//         }
//         else {
//             console.log("no data")
//         }
//         //Adress Validation
//         if (!staff.staffaddress) {
//             err.staffaddress = "Field Can-Not Be Empty";
//             isValid = false;
//         }
//         //Contact
//         if (!staff.contactnumber) {
//             err.contactnumber = "Field Cant Not Be Empty";
//             isValid = false;
//         }
//         else if (typeof staff.contactnumber !== "undefined") {
//             if (!staff.contactnumber.match(/^\d{10}$/)) {
//                 err.contactnumber = "Please Enter 10 Digit";
//                 isValid = false;
//             }
//         }
//         else {
//             console.log("no data")
//         }
//         //Email Address
//         if (!staff.staffemail) {
//             err.staffemail = "Field Cant Not Be Empty";
//             isValid = false;
//           }
//           else if (typeof staff.staffemail !== "undefined") {
//             if (!staff.staffemail.match('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')) {
//               err.staffemail = "Enter Email in Proper Format";
//               isValid = false;
//             }
//           }
//         //City
//         if (!staff.city) {
//             err.city = "Field Cant Not Be Empty";
//             isValid = false;
//         }
//         else if (typeof staff.city !== "undefined") {
//             if (!staff.city.match(/^[a-zA-Z]+$/)) {
//                 err.city = "Please Enter Only Letter";
//                 isValid = false;
//             }
//         }
//         else {
//             console.log("no data")
//         }
        
//         setErr(err);
//         return isValid;
//     }

//     return (<div>
//         <NavLink to="/branchstaff">
//             <img src={home} alt="home" className='homeicon' />
//         </NavLink>
//         <div className="content container">
//         <form action="#">
//                 <h3 className="title">{isEdit ? "Edit Staff Detail" : "Add Staff Detail"}</h3>
//                 <div className="user-details">
//                     <div className="input-box">
//                         <span className="details">Staff Name</span>
//                         <input type="text" name='staffname' value={staff.staffname} onChange={(e) => handlechange(e)} required />
//                         <span style={{ color: "red" }}>{err["staffname"]}</span>
//                     </div>
//                     <div className="input-box">
//                         <span className="details">Staff E-Mail</span>
//                         <input type="text" name='staffemail' value={staff.staffemail} onChange={(e) => handlechange(e)} required />
//                         <span style={{ color: "red" }}>{err["staffemail"]}</span>
//                     </div>
//                     <div className="input-box">
//                         <span className="details">Branch Name</span>
//                         <select className="form-select" aria-label="Default select example" value={staff.branchname} onChange={(e) => handlechange(e)} name='branchname'>
//                             <option defaultValue>Select Branch Name</option>
//                                {data.map((item)=>
//                                  <option value={item.branchname}>{item.branchname}</option>
//                                     )}
//                        </select>
//                        <span style={{ color: "red" }}>{err["branchname"]}</span>
//                     </div>
//                      <div className="input-box">
//                         <span className="details">Staff Address</span>
//                         <input type="text" name='staffaddress' value={staff.staffaddress} onChange={(e) => handlechange(e)} />
//                         <span style={{ color: "red" }}>{err["staffaddress"]}</span>
//                     </div>

//                     <div className="input-box">
//                         <span className="details">City</span>
//                         <input type="text" name='city' value={staff.city} onChange={(e) => handlechange(e)} required />
//                         <span style={{ color: "red" }}>{err["city"]}</span>
//                     </div>

//                     <div className="input-box">
//                         <span className="details">Staff ContactNumber</span>
//                         <input type="text" name='contactnumber' value={staff.contactnumber} onChange={(e) => handlechange(e)} required />
//                         <span style={{ color: "red" }}>{err["contactnumber"]}</span>
//                     </div>
//                 </div>
//                 <div className="button ">
//                     {
//                         isEdit ? <input type="submit" value="Edit Staff" className='resbtn' onClick={editData}/>
//                         :
//                         <input type="submit" value="Add Staff" className='resbtn' onClick={onsubmit}/>
//                     }
//                 </div>
//             </form>
//         </div>
//     </div>
//     )
// };

// export default Addstaff;
