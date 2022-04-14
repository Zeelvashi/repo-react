import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import ReactStars from 'react-stars';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './ratcss.css'
const Review = () => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        Axios.get(`${process.env.LIVE_NODE}/comment`)
            .then((res) => {
                setdata(res.data.commentData)
                console.log('data', res.data.commentData);
            })
    }, [])
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div>
            <div className="container-fluid ">
                <div className="row homefeedback">
                    <div>
                        {/* <h6 className="Testimonials">Our Customer Review</h6> */}
                        <h3 className="Testimonialss">Here is what our Customer are saying</h3>
                        <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={1000} infinite={true}>
                            {data.map((i) => (
                                <>
                                    <div className="row mt-5">
                                        {/* <div className="col-md-4"> */}
                                        <div className="npmcc">
                                            <div className="homedev">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle borderdev " width="100" />
                                            </div>
                                            <p className="homenamefeed mt-2" >- {i.firstname}</p>
                                            <p className="homefeed">{i.comment}</p>
                                        </div>
                                        <div className="bookrate">
                                            <ReactStars
                                                edit={false}
                                                count={5}
                                                half={true}
                                                value={i.rate}
                                                size={35}
                                                color2={'#FFD700'}
                                            />
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Review