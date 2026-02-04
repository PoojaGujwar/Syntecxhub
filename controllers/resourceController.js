const express = require("express")
const User = require("../models/user.model")
const middleWare = require("../middleware/middleware")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET="User_Password"

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
        res.status(200).json({message:"Added User successfully",saveUser})

    }catch(error){
        res.status(500).json({error:error.message})
    }
})

routes.get("/login",async(req,res)=>{
    try{
        const {username, password} = req.body
        const userExist = await User.findOne({username})
        console.log(userExist)
        if(!userExist){
           return res.status(404).json({message:"User does not exist"})
        }
        const isPasswordMatch = userExist.password === password ? true: false
        if(isPasswordMatch){
            const token = jwt.sign({role:"user"},JWT_SECRET,{expiresIn:"24h"})
            return res.json({token})
            // return res.status(200).json({message:"Login successfully",user:userExist})
        }else{
            return res.status(401).json({message:"Password Invalid"})
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

routes.delete("/user/:id",async(req, res)=>{
    try{
        const id = req.params.id
        const userFound = await User.findByIdAndDelete(id)
        if(! userFound){
            return res.status(404).json({message:"User not founded"})
        }
        res.status(200).json({message: "User deleted successfully"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})
routes.put("/user/:id/updateData",middleWare,async(req,res)=>{
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

