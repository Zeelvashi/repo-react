import{BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import Home from "./Home";
import { Branchdash} from './Branch/Branchdash'
import React from 'react';
import  Branchinfo  from './Branch/Branchinfo';
import Branchtable from './NewAdmin/Branchinfo';
import Branchstaff from './Admin/Branchstaff';
import Parceldata from './Admin/Parceldata';
import Addparcel from './Admin/Addparcel';
import Addstaff from './Admin/Addstaff';
import TrackParcel from './Admin/TrackParcel';
import ViewParcel from './Branch/ViewParcel';
import BranchStaff from './Branch/BranchStaff';
import Newparcel from './Staff/Newparcel';
import Totalparcel from './Staff/Totalparcel';
import Report from './Admin/Report';
import Usertrackparcel from './User/Usertrackparcel';
import SuratDetails from './NewAdmin/BranchDetails';
import BranchTrackparcel from './Branch/branchTrackparcel';
import AddBranchParcel from './Branch/AddBranchParcel';
import ReportDetail from './NewAdmin/ReportDetail';
import ReceiveParcel from './Branch/ReceiveParcel';
import Addbranch from './NewAdmin/Addbranch';
import AddBranchStaff from './Branch/Addbranchstaff'
import BranchReport from './Branch/BranchReport';
import PendingParcel from './Branch/PendingParcel';
// import Track from './User/track'
import ChangePass from './Branch/ChangePass';
import ForgotPassword from './Staff/ForgotPassword';
import ChangePassword from './Staff/ChangePassword';
import StaffHome from './Staff/StaffHome';
import Demo from './NewAdmin/Dashbord';
import Aboutus from './User/Aboutus';
import Landingpage from './User/Landingpage';
import Gpsdemo from './Gpsdemo'

function Header() {
  return <div>
      <Router>
        <Routes>

        {/* admin side routes */}

          <Route path="/" element={<Home/>} />
          <Route path="/branchdash" element={<Branchdash/>} />
          <Route path="/branchtable" element={<Branchtable />} />
          <Route path="/branchstaff" element={<Branchstaff />} />
          <Route path="/parceldata" element={<Parceldata />} />
          <Route path="/addparcel" element={<Addparcel />} />
          {/* <Route path="/addbranch" element={<Addbranch />} /> */}
          <Route path="/addstaff" element={<Addstaff />} />
          <Route path="/editbranch/:id" element={<Addbranch />} />
          <Route path="/editstaff/:id" element={<Addstaff />} />
          <Route path="/trackparcel" element={<TrackParcel/>} />
          <Route path="/report" element={<Report/>} />
          


          {/* new adminside routes */}
          <Route path="/demo" element={<Demo/>} />
          <Route path='/suratdetails/:branchname' element={<SuratDetails/>} />
          <Route path='/reportdetail' element={<ReportDetail/>} />
          <Route path='/addbranch' element={<Addbranch/>} />

          {/* Branch side routes*/}

          <Route path="/branchinfo" element={<Branchinfo/>} />
          <Route path="/viewparcel" element={<ViewParcel/>} />
          <Route path="/bstaff" element={<BranchStaff/>} />
          <Route path="/addbranchstaff" element={<AddBranchStaff/>} />
          <Route path="/editbranchstaff/:id" element={<AddBranchStaff />} />
          <Route path="/branchTrackparcel" element={<BranchTrackparcel />} />
          <Route path="/addbranchparcel" element={<AddBranchParcel />} />
          <Route path="/receiveparcel" element={<ReceiveParcel />} />
          <Route path="/branchreport" element={<BranchReport />} />
          <Route path="/pendingparcel" element={<PendingParcel />} />
          <Route path="/changepass" element={<ChangePass />} />

          {/* Staff side routes */}
          <Route path="/newparcel" element={<Newparcel/>} />
          <Route path="/totalparcel" element={<Totalparcel/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/changepassword" element={<ChangePassword/>} />
          <Route path="/staffhome" element={<StaffHome/>} />

           {/* User side routes */}

           <Route path="/user" element={<Landingpage/>} />
            <Route path="/usertrackparcel" element={<Usertrackparcel/>} />
            <Route path="/about" element={<Aboutus />} />


            <Route path="/gps" element={<Gpsdemo />} />

        </Routes>
      </Router>
  </div>;
}

export default Header;
