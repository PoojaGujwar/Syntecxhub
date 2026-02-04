const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET=process.env.JWT_SECRET
require("dotenv").config()

const middleWare =async(req,res,next)=>{
   const token = req.headers["authorization"]
   if(!token){
    return res.status(401).json({message:"No token provided"})
   }
   try{
    const decodedToken = jwt.verify(token,JWT_SECRET)
    req.user = decodedToken
    next()
   }catch(error){
    return res.status(401).json({ message: "Token expired or invalid" })
   }
    console.log("Middleware hit",token)
  
}
module.exports= middleWare