import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Login from './NewAdmin/login';
import Branch from './Branch/Branchlogin';
import StaffLogin from './Staff/StaffLogin'
import bg2 from './image/bg.svg';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getToken } from './services/getToken';
import logo from './image/mainlogo.png'
import './style.css'

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (getToken) {
            Axios.get(`${process.env.LIVE_NODE}/aloggin`, { headers: { 'authorization': getToken } })
                .then((res) => {
                    const data = res.data.data;
                    if (data.type === "admin") {
                        navigate('/dashboard')
                    }
                    else if (data.type === "branch") {
                        navigate('/branchinfo');
                    }
                    else {
                        navigate('/');
                    }

                })
        }


    }, [])
    return <div>
        <div className="container-fluid ">

            <div className="row ">
                <div className="col-md-8 cusback">
                    <img src={logo} alt="" className='homelogo'/>
                    <img src={bg2} alt="" className='bg' />
                </div>
                <div className="col-md-4 cuspos col-12  backmain">
                    <h5 className='mt-4 titleh5'>Welcome To <span style={{color:"#f58a60"}}>KNZ</span> Courier Service</h5>
                    <Carousel variant="dark" className='wcrl container'>
                        <Carousel.Item className='resitem' interval={50000}>
                            <Login />
                        </Carousel.Item>
                        <Carousel.Item className='resitem' interval={50000}>
                            <Branch />
                        </Carousel.Item>
                        <Carousel.Item className='resitem' interval={50000}>
                            <StaffLogin />
                        </Carousel.Item>
                    </Carousel>
                </div>

            </div>

        </div>
    </div>
};

export default Home;
