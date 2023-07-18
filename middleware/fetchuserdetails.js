const jwt = require('jsonwebtoken');
const JWT_Secret="WasifAteeqInoteBookdb";

const fetchdata=(req,res,next)=>{
    //Getting token from header
    const tokenFHeader=req.header('auth-token');
    //Checking if token is provided or not in header
    if(!tokenFHeader){
        console.error(error.message);
        res.status(401).json({error:"Please provide valid token"});
        
    }
    try {
         //getting the required thing from token
    const userDetails=jwt.verify(tokenFHeader,JWT_Secret);
    req.user=userDetails.user;
    next();
    } catch (error) {
        console.error(error.message);
                res.status(401).json({error:"Please provide valid token"});
    }
   
}

module.exports=fetchdata;