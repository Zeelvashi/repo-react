const express = require('express')
const router = express.Router();
const Admin = require("../model/adminschema");
const { generateToken } = require('../service/token')
const { validate } = require('../middleware/auth');
const Branch = require('../model/AddBranch');
const Staff = require('../model/Addstaff');
const Parcel = require('../model/AddParcel');
const Pickupbranch = require('../model/PickupBranch');
const BranchData=require('../model/BranchData')
const bcrypt = require('bcryptjs');


router.post('/login', async (req, res) => {
    const { username, password } = req.body

    const userValid = await Admin.findOne({ username: username })
   
    if (!userValid) {
        return res.status(401).send({
            status: true,
            message: 'User Not Exist.'
        })
    }
    if (userValid) {
            const payload = { username: username,type:"admin" }
            const admintoken = generateToken(payload)
            console.log("admintoken:",admintoken);
            return res.status(200).send({
                status: true,
                message: 'Log in Successfully.',
                admintoken
            })
        
    }

});

router.get('/loggedin', validate, async (req, res) => {
    const { username } = req.decoded

    const userValid = await Admin.findOne({ username })

    return res.status(200).send({
        status: true,
        message: 'Logged in Successfully.',
        userValid
    })
})
router.get('/aloggin', validate, async (req, res)=>{
    const data=req.decoded;
    
    return res.status(200).send({
        status: true,
        message: 'token',
        data
    })
    
  });
  router.get('/alldata' ,async (req, res)=>{
    const branchtotal = await Branch.find().count();
    const parceltotal=await Parcel.find().count();
    const stafftotal=await Staff.find().count();
    const collectedtotal=await Parcel.find({parcelstatus:"collected"}).count();
    const Shippedtotal=await Parcel.find({parcelstatus:"Shipped"}).count();
    const pickeduptotal=await Parcel.find({parcelstatus:"Pickedup"}).count();
    const  dispatchtotal=await Parcel.find({parcelstatus:"Dispatch"}).count();
    const  deliveredtotal=await Parcel.find({parcelstatus:"Delivered"}).count();
    return res.status(200).send({
        status: true,
        branchtotal,
        stafftotal,
        parceltotal,
        collectedtotal,
        Shippedtotal,
        pickeduptotal,
        dispatchtotal,
        deliveredtotal        
    })
    
  });
router.post("/addbranch", async (req, res) => {
    const { branchname, branchaddress, branchcontactnumber, branchemail, city, zipcode } = req.body;
    try {
        const branch = new Branch({
            branchname,
            branchaddress,
            branchcontactnumber,
            branchemail,
            city,
            zipcode
        })
        const register = await branch.save();
        if (register) {
            res.status(200).json({ message: "Data added successfully" });

        }
        else {
            res.status(400).json({ message: "fail to register" })
        }

    }
    catch (error) {
        console.log(error);
    }
})

router.get("/branchinfo", async (req, res) => {
    const branchData = await Branch.find();
    return res.status(200).send({
        status: true,
        message: 'Fetch Successfully.',
        branchData
    })
})
router.delete("/deleteBranchData/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delData = await Branch.findByIdAndDelete(id);
        if (delData) {
            res.status(200).json({ message: "delete successful" })
        }
        else {
            res.status(400).json({ message: 'fail to delete' })
        }
    } catch (error) {

    }
})

router.put("/updateBranchData/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = await Branch.findByIdAndUpdate(id, req.body, {
            new: true
        })
        
        
        if (updateData) {
            res.status(200).send({ message: "update  successful" })
          
        }
        else {
            res.status(200).send({ message: "failed to update" })
        }
    } catch (error) {
        console.log(error);
    }
})
router.get("/editdata/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const editData = await Branch.findById(id);
        //res.send(editData)
        return res.status(200).send({
            status: true,
            message: 'Fetch Successfully.',
            editData
        })
    } catch (error) {
        console.log(error);

    }
})

router.post("/addstaff", async (req, res) => {
    const { staffname, staffemail, branchname, staffaddress, city, contactnumber } = req.body;
    try {
        const staff = new Staff({
            staffname,
            staffemail,
            branchname,
            staffaddress,
            city,
            contactnumber
        })
        const register = await staff.save();
        if (register) {
            res.status(200).json({ message: "Data added successfully" });

        }
        else {
            res.status(400).json({ message: "fail to register" })
        }
    }
    catch (error) {
        console.log(error);
    }
})
router.get("/staffinfo", async (req, res) => {
    const staffData = await Staff.find();
    return res.status(200).send({
        status: true,
        message: 'Fetch Successfully.',
        staffData
    })
})

router.delete("/deleteStaffData/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delData = await Staff.findByIdAndDelete(id);
        if (delData) {
            res.status(200).json({ message: "delete successful" })
        }
        else {
            res.status(400).json({ message: 'fail to delete' })
        }
    } catch (error) {

    }
})

router.get("/staffdata/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const staffData = await Staff.findById(id);
        //res.send(editData)
        return res.status(200).send({
            status: true,
            message: 'Fetch Successfully.',
            staffData
        })
    } catch (error) {
        console.log(error);

    }
})

router.put("/updateStaffData/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = await Staff.findByIdAndUpdate(id, req.body, {
            new: true
        })
        if (updateData) {
            res.status(200).send({ message: "update successful" })
        }
        else {
            res.status(200).send({ message: "failed to update" })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post("/addparcel", async (req, res) => {
    const { referancenumber, sendername, receivername, senderaddress, receiveraddress, sendercontactnumber,
        receivercontactnumber,
        senderemail,
        receiveremail,
        sendercity,
        receivercity,
        branchprocessed,
        pickupbranch,
        weight,
        height,
        width,
        route,
        price } = req.body;
    try {
        const parcel = new Parcel({
            referancenumber, sendername, receivername, senderaddress, receiveraddress, sendercontactnumber,
            receivercontactnumber,
            senderemail,
            receiveremail,
            sendercity,
            receivercity,
            branchprocessed,
            pickupbranch,
            weight,
            height,
            width,
            route,
            price
        })
        const register = await parcel.save();
        if (register) {
            res.status(200).json({ message: "Data added successfully" });

        }
        else {
            res.status(400).json({ message: "fail to add" })
        }

    }
    catch (error) {
        console.log(error);
    }
})

router.get("/parcelinfo", async (req, res) => {
    const ParcelData = await Parcel.find();
    return res.status(200).send({
        status: true,
        message: 'Fetch Successfully.',
        ParcelData
    })
})
router.delete("/deleteparcelData/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delData = await Parcel.findByIdAndDelete(id);
        if (delData) {
            res.status(200).json({ message: "delete successful" })
        }
        else {
            res.status(400).json({ message: 'fail to delete' })
        }
    } catch (error) {

    }
})
router.put("/updateparcelstatus/:id", async (req, res) => {
    try {
        const id = req.params.id;
      
        const updateData = await Parcel.findByIdAndUpdate(id, req.body, {
            new: true
        })
        
        if(updateData.branchparcelstatus === "Received"){
            const updateDatas = await Parcel.findByIdAndUpdate(id, {branchparcelstatus : "Collected"}, {
                new: true
            })
        }
        if(updateData.parcelstatus === "Delivered"){
            const updateData = await Parcel.findByIdAndUpdate(id, {branchparcelstatus : "Received"}, {
                new: true
            })
            await Parcel.findByIdAndUpdate(id, {ReceivedDate:updateData.updatedAt}, {
                new: true
            })
        }
        if (updateData) {
            res.status(200).send({ message: "update parcelstatus successful" })
           
        }
        else {
            res.status(200).send({ message: "failed to update" })
        }
    } catch (error) {
        console.log(error);
    }
})
router.put("/updatebranchparcelstatus/:id", async (req, res) => {
    try {
        const id = req.params.id;
      
        const updateData = await Parcel.findByIdAndUpdate(id, req.body, {
            new: true
        })       
            
        if (updateData) {
            res.status(200).send({ message: "update parcelstatus successful" })
           
        }
        else {
            res.status(200).send({ message: "failed to update" })
        }
    } catch (error) {
        console.log(error);
    }
})
router.get("/parcedata/:referancenumber", async (req, res) => {
    const referancenumber=req.params.referancenumber;
    const ParcelData = await Parcel.find({referancenumber:referancenumber});
    if(ParcelData){
        return res.status(200).send({
            status: true,
            message: 'Fetch Successfully.',
            ParcelData
        })
    }
    else{
         res.status(400).send("No Data");
    }
    
})

router.post("/adminlogin", async(req,res)=>{
    const admin = new Admin({
        username:req.body.username,
        password:req.body.password
    })
    req.body.password =await bcrypt.hash(req.body.password, 10);
    const register = await admin.save();
    if(register){
        res.send(register);
    }
})



module.exports = router;