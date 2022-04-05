const express = require("express");
const  branchRouter =express.Router();
const Branch=require("../model/AddBranch");
const {generateToken} = require('../service/token');
const {validate} = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const router = require("./Admin");
const Parcel = require("../model/AddParcel");
const Staff = require("../model/Addstaff");
const Pickupbranch = require('../model/PickupBranch');

branchRouter.put('/branchloginupdate/:id',async (req,res) => {
    const id =req.params.id;
    const update =req.body;
    req.body.password =await bcrypt.hash(req.body.password, 10);
    const updatedata =await Branch.findByIdAndUpdate(id , update,{
        new :true
    });
    if(updatedata){
        res.send(updatedata);
    }
})

branchRouter.post('/branchlogin', async (req,res)=>{
    const {username,password}=req.body

    const userValid =await Branch.findOne({username:username});
    const ismatch =await bcrypt.compare(password,userValid.password);

        if(!userValid){
            return res.status(401).send({
                status:false,
                message:"invalid User"
            })
        }
        if(userValid){
            if(!ismatch){
                return res.status(400).send({
                   status:false,
                   message:"invalid password" 
                })
            }
            else{
                const payload={username :username ,type:"branch"}
                const branchtoken =generateToken(payload)
                return res.status(200).send({
                    status:true,
                    message:'Log in Successfully..',
                    branchtoken
                })
            }
        }
})
branchRouter.get("/branchloggedin", validate ,async(req,res) =>{
    const {username} =req.decoded

    const userValid =await Branch.findOne({username})
        return res.status(200).send({
            status:"Loggred in Successfully.",
            userValid
        })
})

// branchRouter.get('/branchparceldata/:branchname',async (req,res)=>{
//     const branchname=req.params.branchname;
//     const branchdata =await Parcel.find({  $or: [{branchprocessed:branchname},{pickupbranch:branchname}]});
    
//     const staffdata=await Staff.find({branchname:branchname});
//     const pcount=await Parcel.find({pickupbranch:branchname}).count() ;
//     const scount=await Staff.find({branchname:branchname}).count();
//     const dispatchcount=await Parcel.find({pickupbranch:branchname,parcelstatus:"Dispatch"}).count();
//     const Deliveredcount=await Parcel.find({pickupbranch:branchname,parcelstatus:"Delivered"}).count();
//     const pickedupcount=await Parcel.find({pickupbranch:branchname,parcelstatus:"Pickedup"}).count();
//     if(branchdata){
//         return res.status(200).send({
//             status:true,
//             message:"fetch successfully..",
//             branchdata,
//             staffdata,
//             pcount,
//             scount,
//             dispatchcount,
//             Deliveredcount,
//             pickedupcount

//         })
//     }
//     else{
//         res.status(400).send("No Data")
//     }
// })
branchRouter.get('/branchparceldata/:branchname',async (req,res)=>{
    const branchname=req.params.branchname;
    const branchdata =await Parcel.find({pickupbranch:branchname,$or:[{branchparcelstatus:"Received"},{branchparcelstatus:"Delivered"}]});
    // const branchdata =await Pickupbranch.find({pickupbranch:branchname,branchparcelstatus:"Received"});
    const branchinfo=await Parcel.find({branchprocessed:branchname,$or:[{parcelstatus:"Collected"},{parcelstatus:"Delivered"}]})
    const staffdata=await Staff.find({branchname:branchname})
    const totalstaff=await Staff.find({branchname:branchname}).count();
    const totalreceived =await Pickupbranch.find({pickupbranch:branchname,branchparcelstatus:"Received"}).count();
    const totalbparcel=await Parcel.find({branchprocessed:branchname,$or:[{parcelstatus:"Collected"},{parcelstatus:"Delivered"}]}).count();
    const totalparcel=totalreceived+totalbparcel;
    if(branchdata){
        return res.status(200).send({
            status:true,
            message:"fetch successfully..",
            branchdata,
            branchinfo,
            staffdata,
             totalstaff,
             totalreceived,
             totalbparcel,
             totalparcel
           
        })
    }
    else{
        res.status(400).send("No Data")
    }
})
module.exports=branchRouter;