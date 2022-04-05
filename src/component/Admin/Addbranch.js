import React, { useEffect } from 'react';
import './addfrm.css';
import Axios from "axios";
import { NavLink } from 'react-router-dom';
import home from '../image/home.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
toast.configure();


const Addbranch = () => {
    const [isEdit, SetisEdit] = useState(false);
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

    const AddData = (e) => {
        e.preventDefault();
        const { branchname, branchaddress, branchcontactnumber, branchemail, city, zipcode } = user;
        const branchdata = { branchname, branchaddress, branchcontactnumber, branchemail, city, zipcode }
        Axios.post("http://localhost:8000/addbranch", branchdata)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Data Added Successfully..", { autoClose: 1000 }
                        , {
                            position: "top-center",
                        })

                    // localStorage.setItem("token", `Bearer ${res.data.token}`)
                }
            })
            .catch((error) => {
                toast.error("Fail To Add Data", {
                    position: "top-center",
                })
            })
        setUser({
            branchname: "",
            branchaddress: "",
            branchcontactnumber: "",
            branchemail: "",
            city: "",
            zipcode: "",

        });
    }

    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id);

    useEffect(() => {
        if (id) {
            Axios.get(`http://localhost:8000/editdata/${id}`)
                .then((res) => {
                    console.log("data:", res.data.editData)
                    setUser(res.data.editData)
                    SetisEdit(!isEdit);
                })
        }
    }, [])
    const editData = (e) => {
        e.preventDefault();
        const { branchname, branchaddress, branchcontactnumber, branchemail, city, zipcode } = user;
        const branchdata = { branchname, branchaddress, branchcontactnumber, branchemail, city, zipcode };
        Axios.put(`http://localhost:8000/updateBranchData/${id}`, branchdata)
            .then((res) => {
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

    return (<div>
        <NavLink to="/branchtable">
            <img src={home} alt="home" className='homeicon' />
        </NavLink>
        <div className="content container">
            <form action="#">

                <h3 className="title">{isEdit ? "Edit Branch Detail" : "Add Branch Detail"}</h3>
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">Branch Name</span>
                        <input type="text" name='branchname' value={user.branchname} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                    </div>
                    <div className="input-box">
                        <span className="details">Branch Address</span>
                        <input type="text" name='branchaddress' value={user.branchaddress} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                    </div>
                    <div className="input-box">
                        <span className="details">Branch Contact Number</span>
                        <input type="text" name='branchcontactnumber' value={user.branchcontactnumber} onChange={(e) => handlechange(e)} required  autoComplete='off'/>
                    </div>
                    <div className="input-box">
                        <span className="details">Branch Email</span>
                        <input type="text" name='branchemail' value={user.branchemail} onChange={(e) => handlechange(e)} required />
                    </div>
                    <div className="input-box">
                        <span className="details">City</span>
                        <input type="text" name='city' value={user.city} onChange={(e) => handlechange(e)} required />
                    </div>

                    <div className="input-box">
                        <span className="details">Zip Code</span>
                        <input type="text" name='zipcode' value={user.zipcode} onChange={(e) => handlechange(e)} required />
                    </div>
                </div>
                <div className="button ">
                    {isEdit ?
                        <input type="submit" value="Edit Branch" className='resbtn' onClick={editData} />
                        : <input type="submit" value="Add Branch " className='resbtn' onClick={AddData} />}
                </div>
            </form>

        </div>
    </div>
    )
};

export default Addbranch;
