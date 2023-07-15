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
    res.send(req.body);
})
module.exports = router