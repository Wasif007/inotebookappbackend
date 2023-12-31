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

//ROUTE#2
//Route to get all notes of a specified login user /api/notes/fetchingAllNotes
router.get("/fetchingAllNotes",fetchdata,async (req, res) => {
	try {
		let notesFetchingdata=await notes.find({user:req.user.id});
	res.json(notesFetchingdata);
	} catch (error) {
		res.status(500).json({error:"Internal System Error"});

	}
	

	
})

//ROUTE#3
//Route to get note updated of a specified login user /api/notes/updatenote/:id
router.put("/updatenote/:id",fetchdata,async (req, res) => {
	try {
		//getting all the required data
	let {title,description,tag}=req.body;
	let newNote={};
	//if title tag and description is available putting it in newNote object
	if(title){
		newNote.title=title;
	}
	if(description){
		newNote.description=description;
	}
	if(tag){
		newNote.tag=tag;
	}
	let newNotes=await notes.findById(req.params.id);
	//If no note is found return with an error
	if(!newNotes){
		return res.status(404).json({error:"Not Found"});
	}
	//if other user is trying to update other user note restrict him/her
	if(req.user.id!==newNotes.user.toString()){
		return res.status(401).json({error:"Not Found"});
	}
	let updatedNotes=await notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
	res.send(updatedNotes);
	} catch (error) {
		res.status(500).json({error:"Internal System Error"});

	}
	
});

//ROUTE#4
//Route to delete a note of a specified login user /api/notes/deletenote/:id
router.delete("/deletenote/:id",fetchdata,async (req, res) => {
	try {
		//first find the one to be deleted
		let newNotes=await notes.findById(req.params.id);
		// if not found
	if(!newNotes){
		return res.status(404).json({error:"Not Found"});
	}
	//if other user is trying to delete note of other user
	if(req.user.id!==newNotes.user.toString()){
		return res.status(401).json({error:"Not Found"});
	}
	//delete it 
	let updatedNotes=await notes.findByIdAndDelete(req.params.id);
	res.send(updatedNotes);
	} catch (error) {
		res.status(500).json({error:"Internal System Error"});

	}
	
});

module.exports = router