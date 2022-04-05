import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/nucleo-icons.css';
import '../assets/css/nucleo-svg.css';
import '../assets/css/material-dashboard.css?v=3.0.0';
import logo from '../assets/img/logo-ct.png';
import '../assets/css/dashcss.css';

const Dashboard = () => {
  return (
    <aside className="sidenav navbar navbar-vertical navbar-expand-xs   fixed-start   bg-gradient-dark" id="sidenav-main">
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <NavLink className="navbar-brand m-0" to="/dashboard">
          <img src={logo} className="navbar-brand-img h-90" alt="main_logo" />
          <span className="ms-1 font-weight-bold text-white mainad1">Admin</span>
        </NavLink>
      </div>
      <hr className="horizontal light mt-0 mb-2" />
      <div className="collapse navbar-collapse  w-auto" id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link text-white " to="/dashboard">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">dashboard</i>
              </div>
              <span className="nav-link-text ms-1 mainad">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white bgactive " to="/branchtable">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center bgactive">
                <i className="material-icons opacity-10">home</i>
              </div>
              <span className="nav-link-text ms-1 mainad">Branch</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white " to="/branchstaff">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10" >group</i>
              </div>
              <span className="nav-link-text ms-1 mainad">Branch staff</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white " to="/parceldata">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">view_in_ar</i>
              </div>
              <span className="nav-link-text ms-1 mainad">Parcels</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white " to="/trackparcel">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">search</i>
              </div>
              {/* format_textdirection_r_to_l */}
              <span className="nav-link-text ms-1 mainad">Track Parcel</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white " to="/addparcel">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">add box</i>
              </div>
              <span className="nav-link-text ms-1 mainadd1">Add Parcel</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white " to="/report">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">receipt_long</i>
              </div>
              <span className="nav-link-text ms-1 mainad">Reports</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  )
};

export default Dashboard;
