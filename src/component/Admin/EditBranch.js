import React, { useEffect }  from 'react';
import './addfrm.css';
import Axios from "axios";
import { NavLink } from 'react-router-dom';
import home from '../image/home.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import {useParams} from "react-router-dom";
toast.configure();


const EditBranch = () => {

    const [user, setUser] = useState({
        branchname: "",
        branchaddress: "",
        branchcontactnumber: "",
        branchemail: "",
        city: "",
        zipcode: "",
      })
      const handlechange = (e) => {
        const { name, value } = e.target
        console.log(name, value);
        console.log(e);
        setUser({
          ...user,
          [name]: value,
        })
        
      }
      const url = window.location.href;
        const id= url.substring(url.lastIndexOf('/') + 1);
        console.log(id);
      
      useEffect(()=>{
        
        Axios.get(`http://localhost:8000/editdata/${id}`)
        .then((res)=>{
            console.log("data:",res.data.editData)
           setUser(res.data.editData)
         })
           },[])
           
   
  return <div>  
       <NavLink to="/branchtable">
                <img src={home} alt="home" className='homeicon' />
            </NavLink>
        <div className="content container">
            <form action="#">

                <h3 className="title">Edit Branch Details </h3>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">Branch Name</span>
                        <input type="text" name='branchname' value={user.branchname} onChange={(e)=>handlechange(e)} required />
                    </div>
                    <div className="input-box">
                        <span className="details">Branch Address</span>
                        <input type="text" name='branchaddress' value={user.branchaddress} onChange={(e)=>handlechange(e)} required />
                    </div>
                    <div className="input-box">
                        <span className="details">Branch Contact Number</span>
                        <input type="text" name='branchcontactnumber' value={user.branchcontactnumber} onChange={(e)=>handlechange(e)} required />
                    </div>
                    <div className="input-box">
                        <span className="details">Branch Email</span>
                        <input type="text" name='branchemail' value={user.branchemail} onChange={(e)=>handlechange(e)} required />
                    </div>
                    <div className="input-box">
                        <span className="details">City</span>
                        <input type="text" name='city' value={user.city} onChange={(e)=>handlechange(e)} required />
                    </div>
                    
                    <div className="input-box">
                        <span className="details">Zip Code</span>
                        <input type="text" name='zipcode' value={user.zipcode} onChange={(e)=>handlechange(e)} required />
                    </div>
                </div>
                    <div className="button ">
                        <input type="submit" value="Edit Branch" className='resbtn'  />
                    </div>
            </form>
        </div>
  </div>;
};

export default EditBranch;
