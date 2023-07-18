const express = require("express")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchdata=require("../middleware/fetchuserdetails");
const notes = require("../models/Notes");

//ROUTE#1
//Route to post a note of a specified login user /api/notes/postingnote
router.post("/postingnote",fetchdata,[
	//Validating enteries if they are according to criteria or not
	body('title',"Please enter a title").isLength({min:3}),
	body('description',"Please enter a atleast 5 character Description").isLength({ min: 5 })
],async (req, res) => {
	//Checking if validation is done or not
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
	//If all validation are passed save that note
	try {
		let note=await notes.create({
		title:req.body.title,
		description:req.body.description,
		user:req.user.id
	})
	res.json(note);
	} catch (error) {
		res.status(500).json({error:"Internal System Error"});
	}
	
})
module.exports = router