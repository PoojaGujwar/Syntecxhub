const express = require("express")
const User = require("../models/user.model")

const routes = express.Router()

routes.get("/user_info",async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
routes.post("/user_info",async(req,res)=>{
    try{
        const users = new User(req.body)
        const saveUser  = await users.save()
        res.status(201).json({message:"Added User successfully",saveUser})

    }catch(error){
        res.status(500).json({error:error.message})
    }
})

routes.delete("/user/:id",async(req, res)=>{
    try{
        const id = req.params.id
       
        const userFound = await User.findByIdAndDelete(id)
        if(! userFound){
            return res.status(404).json({message:"User not founded"})
        }
        res.status(201).json({message: "User deleted successfully"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})
routes.put("/user/:id/updateData",async(req,res)=>{
    console.log(req.params.id)
    try {
        const data = req.body
        console.log(data)
        const availableUser = await User.findById(req.params.id)
        console.log(availableUser)
        if(!availableUser){
            return res.status(404).json({message:"User not found"})
        }
        const updatedUser = await User.findByIdAndUpdate({_id:req.params.id},data,{new:true})
        res.status(201).json({message:"Updated user data",updatedUser})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = routes

