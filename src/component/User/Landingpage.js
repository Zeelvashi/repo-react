import React from 'react';
import { NavLink } from 'react-router-dom'
import mainlogo from '../image/mainlogo.png'
import Ourservice from './Ourservice';
import Contactus from './Contactus';
import Aboutus from './Aboutus'
import Footer from './Footer';
import './landingcss.css'
import { HashLink, NavHashLink } from 'react-router-hash-link';
import OurTeam from './OurTeam';

const Landingpage = () => {
  return (
    <div  className='!sticky ? "navbartoggle" : "landing2"'>
      <section>
      <div className="landing2 sticky">
            <div className="userlogo1">
              <img src={mainlogo} alt="" className='loguser' />
            </div>
            <div className="usernav">
            <HashLink smooth to="#" className="has1" scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}>
                Home
              </HashLink>

              <HashLink smooth to="#services" className="has1" scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}>
                Services
              </HashLink>

              <HashLink smooth to="#about" className="has1" scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}>
                Contact Us
              </HashLink>
              <HashLink smooth to="#team" className="has1" scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}>
                About Us
              </HashLink>

              <HashLink smooth to="#contact" className="has1" scroll={(el) => el.scrollIntoView({ behavior: 'auto', block: 'start' })}>
                FeedBack
              </HashLink>

            </div>
          </div>
        <div className='mainlanding'>
         
          <div className="landing3">
            <div className="firsttxt">
              <p className='ftxtp'>
                FAST , SIMPLE <b>&</b> QUICK COURIER <br /> SERVICES
              </p>
              <p className='ftxtp1'>
                Always deliver more than expected
              </p>
              <NavLink to='/usertrackparcel' className='trackpbtn'>
                Track Your Parcel
              </NavLink>
            </div>
          </div>
        </div>
        

      </section>

      <section id='services'>
        <Ourservice />
      </section>

      <section id='about'>
        <Aboutus />
      </section>

      <section id='team'>
        <OurTeam/>
      </section>

      <section id='contact'>
        <Contactus />
      </section>
      <Footer />
    </div>

  )
}

export default Landingpage