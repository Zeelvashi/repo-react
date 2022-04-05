import React from 'react'
import bg1 from '../image/ubg.png'
import byroad from '../image/byroad.jpg'
import byair from '../image/byair.jpg'
import byship from '../image/byship.jpg'
import bytrain from '../image/bytrain.jpg'
import './ourservicescss.css'

const Ourservice = () => {
    return (
        <div className='servicesmain'>
            <div className="container-fluid mt-5 service1">
                <div className="row">
                    <div className="col-md-12 col-12 mx-auto">
                        <h2>how does our company <br />
                            provide services ?</h2>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-1 col-12 offset"></div>
                    <div className="col-md-5 col-12 mb-6">
                        <img src={bg1} alt="Not-Allow" style={{ height: "430px", width: "470px" }} className="mx-auto mt-4" />
                    </div>

                    <div className="col-md-5 col-12 mt-6">
                        <ul>
                            <li className="text-left">
                                Courier service refers to the fast or quick, door to door pickup and delivery service for goods or documents. It can be local or international.
                            </li>
                            <li className="text-left">
                                A company that provides such delivery services is called a courier company.
                            </li>
                            <li className="text-left">
                                A courier company hires people to provide their services. Such a person hired by the courier service company is called a courier.
                            </li>
                            <li className="text-left">
                                A courier is an individual who is responsible for the safe exchange or delivery of items between two or more parties.
                            </li>
                            <li className="text-left">
                                The courier company charges a flat rate or a rate directly proportional to the weight of the good or based upon the urgency of delivery of the good or both to the party using he services of the courier service company.
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-1 col-12 offset"></div>
                </div>
                <div className="row bgmethod">
                    <div className="row mt-5 mx-auto">
                        <div className="method mb-4">
                            <p>OUR DELIVERY METHOD</p>
                        </div>
                        <div className="col-md-6 col-12">
                            <img src={byroad} alt="byroad" className='img1' style={{ height: "300px", width: "600px" }} />
                            <div class="bottomright">By Road</div>
                        </div>
                        <div className="col-md-6 col-12">
                            <ul>
                                <li className='text-left'>
                                    Road transport means transportation of goods and personnel from one place to the other on roads.
                                </li>
                                <li className='text-left'>
                                    Road is a route between two destinations, which has been either paved or worked on to enable transportation by way of motorised and non-motorised carriages.
                                </li>
                                <li className='text-left'>
                                    There are many advantages of road transport in comparison to other means of transport.
                                </li>
                                <li className='text-left'>
                                    The investment required in road transport is very less compared to other modes of transport such as railways and air transport.
                                </li>
                                <li className='text-left'>
                                    The cost of construction, operating cost and maintaining roads is cheaper than that of the railways.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row  mt-5 mx-auto">
                        <div className="col-md-6 col-12 mt-6">
                            <ul>
                                <li className='text-left'>
                                    An air courier service could refer to one of two things - the matching of travelers with packages going to the same destination, or companies that actually take control of the shipping themselves.
                                </li>
                                <li className='text-left'>
                                    Both provide very fast ways to get packages and documents from one place to the other, but it can also be quite expensive.
                                </li>
                                <li className='text-left'>
                                    Taking the time to understand what an air courier service offers, and the difference between the two types is very important.
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-12">
                            <img src={byair} alt="byair" className='img1' style={{ height: "300px", width: "600px" }} />
                            <div class="bottomright">By Air</div>
                        </div>

                    </div>

                    <div className="row  mt-5 mx-auto">
                        <div className="col-md-6 col-12">
                            <img src={byship} alt="byship" className='img1' style={{ height: "300px", width: "600px" }} />
                            <div class="bottomright">By Ship</div>
                        </div>
                        <div className="col-md-6 col-12 mt-2">
                            <ul>
                                <li className='text-left'>
                                    A bulk carrier or bulker is a merchant ship specially designed to transport unpackaged bulk cargo, such as grains, coal, ore, steel coils, and cement, in its cargo holds
                                </li>
                                <li className='text-left'>
                                    Since the first specialized bulk carrier was built in 1852, economic forces have led to continued development of these ships, resulting in increased size and sophistication.
                                </li>
                                <li className='text-left'>
                                    Today's bulk carriers are specially designed to maximize capacity, safety, efficiency, and durability.
                                </li>
                                <li className='text-left'>
                                    Today, bulk carriers make up 21% of the world's merchant fleets[2] and range in size from single-hold mini-bulk carriers to mammoth ore ships able to carry 400,000 metric tons of deadweight (DWT).
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row  mt-5 mx-auto">
                        <div className="col-md-6 col-12">
                            <ul>
                                <li className='text-left'>
                                    Rail transport is also known as train transport. It is a means of transport, on vehicles which run on tracks (rails or railroads).
                                </li>
                                <li className='text-left'>
                                    It is one of the most important, commonly used and very cost effective modes of commuting and goods carriage over long, as well as, short distances.
                                </li>
                                <li className='text-left'>
                                    Since this system runs on metal (usually steel) rails and wheels, it has an inherent benefit of lesser frictional resistance which helps attach more load in terms of wagons or carriages.
                                </li>
                                <li className="text-left">
                                    This system is known as a train. Usually, trains are powered by an engine locomotive running on electricity or on diesel.
                                </li>
                                <li className="text-left">
                                    Complex signaling systems are utilised if there are multiple route networks.
                                </li>
                                <li className="text-left">
                                    Rail transport is also one of the fastest modes of land transport.
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                            <img src={bytrain} alt="bytrain" className='img1' style={{ height: "300px", width: "600px" }} />
                            <div class="bottomright">By Train</div>

                        </div>

                    </div>


                    {/* <div className="row mt-5 mx-auto mb-5">
                        <div className="col-md-6 col-12">
                            <img src={byship} alt="byship" className='img1' style={{ height: "300px", width: "600px" }} />
                            <div class="bottomright">By Ship</div>
                        </div>
                        <div className="col-md-6 col-12">
                            <img src={bytrain} alt="bytrain" className='img1' style={{ height: "300px", width: "600px" }} />
                            <div class="bottomright">By Train</div>

                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Ourservice