const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Post request sending
router.post("/",[
  body('email',"Please enter a valid Email").isEmail(),
  body('password',"Please enter a 5 characters password").isLength({ min: 5 }),
  body('name',"Username must be more than 3 characters").isLength({ min: 3 }),
],(req, res) => {
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Users.create({
      name: req.body.name,
      password: req.body.password,
      email:req.body.email
    }).then(user => res.json(user))
    .catch(err=>{console.log(err)
    res.json({err:"Please enter new email",message:err.message})});
})
module.exports = router