import React, { useState } from 'react'
import './contact.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
import { RatingStar } from "rating-star";
toast.configure();

const Contactus = () => {

	const [user, setuser] = useState({
		firstname: "",
		lastname: "",
		contactno: "",
		email: "",
		problem: "",
		comment: "",
		rating: ""
	})
	const handlechange = (e) => {
		const { name, value } = e.target
		console.log(name, value);
		console.log(e);
		setuser({
			...user,
			[name]: value,
		})

	}
	const [rating, setRating] = useState();
	const onRatingChange = val => {
		setRating(val);
		console.log("rate", val)
	};

	const AddData = (e) => {
		e.preventDefault();
		const { firstname, lastname, contactno, email, problem, comment } = user;
		const userdata = { firstname, lastname, contactno, email, problem, comment, rating }
		console.log('data', userdata);
		Axios.post("http://localhost:8000/addcomment", userdata)
			.then((res) => {
				if (res.status === 200) {
					toast.success("Data Added Successfully..", { autoClose: 1000 }
						, {
							position: "top-center",
						})

					// localStorage.setItem("token", `Bearer ${res.data.token}`)
				}
			})
			.catch((error) => {
				toast.error("Fail To Add Data", {
					position: "top-center",
				})
			})
		setuser({
			firstname: "",
			lastname: "",
			contactno: "",
			email: "",
			problem: "",
			comment: "",
			rating: ""
		});
	}




	return (
		<div id='home'>
			<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
			<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
			<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
			<div className="titlecontact mt-5">
				<p>Give Your Review</p>
			</div>
			<div className="container contact  contact1">
				<div className="row">
					<div className="col-md-3 sidebar">
						<div className="contact-info">
							<img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image" />
							<h2>Give Review</h2>
							<h4>We would love to hear from you !</h4>
						</div>
					</div>
					<div className="col-md-9">
						<div className="contact-form contactfrm">
							<div className="form-group">
								<label className="control-label col-sm-2 lblfnm " >First Name:</label>
								<div className="col-sm-10">
									<input type="text" className="form-control fnm" id="firstname" placeholder="Enter First Name" name="firstname" value={user.firstname} onChange={(e) => handlechange(e)} />
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-sm-2 lblfnm">Last Name:</label>
								<div className="col-sm-10">
									<input type="text" className="form-control lnm" id="lastname" placeholder="Enter Last Name" name="lastname" value={user.lastname} onChange={(e) => handlechange(e)} />
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-sm-2 ml-auto lblcon" >Contact No:</label>
								<div className="col-sm-10">
									<input type="text" className="form-control lnm" placeholder="Enter contact number" name="contactno" value={user.contactno} onChange={(e) => handlechange(e)} />
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-sm-2 ml-auto lblemail" >Email I'd:</label>
								<div className="col-sm-10">
									<input type="email" className="form-control email" id="email" placeholder="Enter email" name="email" value={user.email} onChange={(e) => handlechange(e)} />
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-sm-4 ml-5" >Facts a problem:</label>
								<div className="col-sm-10">
									<textarea className="form-control comment" rows="5" id="comment" name='problem' value={user.problem} onChange={(e) => handlechange(e)}></textarea>
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-sm-2" >Comment:</label>
								<div className="col-sm-10">
									<textarea className="form-control comment" rows="5" id="comment" name='comment' value={user.comment} onChange={(e) => handlechange(e)}></textarea>
								</div>
							</div>


							<div className='form-group'>
								<label className="control-label col-sm-4 ml-5 lblrate" >Rate:</label>
								<div className="col-sm-1o rate">
									<RatingStar
										id="clickable"
										clickable
										className="ratingstar"
										rating={rating}
										onRatingChange={onRatingChange}
									/>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-offset-2 col-sm-10 mt-6">
									<button type="submit" className="btn btn-default" onClick={AddData}>Submit</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Contactus