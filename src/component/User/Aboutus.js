import React, { useEffect, useState } from 'react'
import './about.css';
import Axios from "axios";
import bg from '../image/aboutus1.webp'
import location from '../image/location.svg'
import check from '../image/security.png';
import ser from '../image/ser.png';
import rocket from '../image/pprpln.png'

const Aboutus = () => {

    const [Data, SetData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/branchinfo")
            .then((res) => {
                SetData(res.data.branchData);
            })
    }, [])

    return (
        <div className='aboutmain'>
            <h3 className='mt-5' >Contact Us</h3>
            <div>


                <div className="container-fluid abmain1">
                    <div className="row">

                        <div className="col-xl-6 abttxt">
                            <ul className='feature'>
                                <li className='secondli'>
                                    <img src={check} alt="" style={{ marginTop: "-10px" }} />
                                    <div className="feature-content">
                                        <p className="titleh22">SECURED SERVICE</p>
                                        <p className='st12'>We provide efficient and prompt mail management services to the each and every segment of the society.</p>
                                    </div>
                                </li>
                            </ul>
                            <ul className='feature'>
                                <li style={{ marginLeft: "50px", marginTop: "25px" }}>
                                    <i class="fa fa-paper-plane" style={{ fontSize: "30px" }}></i>                                   
                                     <div className="feature-content">
                                        <p className="titleh221">Fast Delivery</p>
                                        <p className='st121'>Delivery with security and service for sensitive documents for enterprise as well as common man is our prime goal.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="col-xl-6 clipimg">
                            {/* <div className="card imgcard"> */}
                            <img src={bg} alt="" className='abimg' />
                            {/* </div> */}
                        </div>
                    </div>
                </div>




                <div className="container abcon">
                    <div className="row">
                        <div className="col-xl-3">
                            <div className="ab1">
                                <i class="fa fa-home fonticon"></i>
                                <h4>Name</h4>
                                {
                                    Data.map((i) =>
                                        <ul className='text-center mt-4'>
                                            <br />
                                            <li className='text-left'>{i.branchname}</li>
                                            <hr />
                                        </ul>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <i class="fa fa-envelope fonticon"></i>
                            <h4>E-Mail</h4>
                            {
                                Data.map((i) =>
                                    <ul className='text-center mt-4'>
                                        <br />
                                        <li className='text-left'>{i.branchemail}</li>
                                        <hr />
                                    </ul>
                                )
                            }
                        </div>
                        <div className="col-xl-3">
                            <i class="fa fa-phone fonticon"></i>
                            <h4>Contact No.</h4>
                            {
                                Data.map((i) =>
                                    <ul className='text-center mt-4'>
                                        <br />
                                        <li className='text-left'>{i.branchcontactnumber}</li>
                                        <hr />
                                    </ul>
                                )
                            }
                        </div>
                        <div className="col-xl-3">
                            <img src={location} alt="" className='fonticon iconcolor' />
                            <h4>Address</h4>
                            {
                                Data.map((i) =>
                                    <ul className='text-center mt-4'>
                                        <li className='text-left'>{i.branchaddress}</li>
                                        <hr />
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Aboutus