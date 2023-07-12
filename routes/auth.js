const express = require("express")
const router = express.Router();
router.get("/",(req, res) => {
	let data={
        key:"was"
    }
	res.json(data)
})
module.exports = router