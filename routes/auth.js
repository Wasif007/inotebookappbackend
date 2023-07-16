const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret="WasifAteeqInoteBookdb";
//Post request sending for auth /api/auth/createUser
router.post("/createUser",[
  //validator for email name and password
  body('email',"Please enter a valid Email").isEmail(),
  body('password',"Please enter a 5 characters password").isLength({ min: 5 }),
  body('name',"Username must be more than 3 characters").isLength({ min: 3 }),
],async (req, res) => {
  try {
  //Checking for any error of data sent
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    //If email already exists
    //awaitng for finding duplicate emails
    let userCreate=await Users.findOne({email:req.body.email});
    if(userCreate){
      return res.status(400).json({ errors: "Email already exists" });
    }
      //Adding salt and hash to make password strong
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(req.body.password, salt);
    //creating  a new user for db
    userCreate=await Users.create({
      name: req.body.name,
      password: hash,
      email:req.body.email
    });
    const data={
      user:{
        id:userCreate.id
      }
    }
    const authToken = jwt.sign(data, JWT_Secret);
    console.log(authToken);

    //sending created user
    res.json({authToken});
  }
  //catching any more error other than email one
  catch (error) {
    res.status(500).json({error:"System error"});
    console.error("Bad request");
    }
})
module.exports = router