import React from 'react'


const Footer = () => {
    return (
        <div>
            <div className="container-fluid my-5 cfooter" style={{"width":"100%"}}>
                <footer className="text-center text-white" style={{"backgroundColor": "rgba(0, 0, 0, 0.2)"}}>
                    {/* <!-- Grid container --> */}
                    <div className="container-fluid pt-4 mt-5" style={{"backgroundColor":"rgba(0, 0, 0, 0.2)"}}>
                        {/* <!-- Section: Social media --> */}
                        <div className="mb-4">
                            {/* <!-- Facebook --> */}
                            <a
                                className="btn btn-link btn-floating btn-lg text-dark m-1"
                                href="http://www.facebook.com"
                                role="button"
                                data-mdb-ripple-color="dark">
                            <i className="fab fa-facebook-f"></i>
                            </a>

                            {/* <!-- Twitter --> */}
                            <a
                                className="btn btn-link btn-floating btn-lg text-dark m-1"
                                href="http://www.twitter.com"
                                role="button"
                                data-mdb-ripple-color="dark">
                            <i className="fab fa-twitter"></i>
                            </a>

                            {/* <!-- Google --> */}
                            <a
                                className="btn btn-link btn-floating btn-lg text-dark m-1"
                                href="http://www.google.com"
                                role="button"
                                data-mdb-ripple-color="dark">
                            <i className="fab fa-google"></i>
                            </a>
                            <a
                                className="btn btn-link btn-floating btn-lg text-dark m-1"
                                href="http://www.instagram.com"
                                role="button"
                                data-mdb-ripple-color="dark">
                            <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                className="btn btn-link btn-floating btn-lg text-dark m-1"
                                href="http://www.linkedin.com"
                                role="button"
                                data-mdb-ripple-color="dark">
                            <i className="fab fa-linkedin"></i>
                            </a>
                            <a
                                className="btn btn-link btn-floating btn-lg text-dark m-1"
                                href="http://www.github.com"
                                role="button"
                                data-mdb-ripple-color="dark">
                            <i className="fab fa-github"></i>
                            </a>
                        </div>
                    <div className="text-center text-dark p-3" >
                        © 2022 Copyright: KNZ Courier Service
                        {/* <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a> */}
                    </div>
                    </div>
                </footer>

            </div>
        </div>
    )
}

export default Footer