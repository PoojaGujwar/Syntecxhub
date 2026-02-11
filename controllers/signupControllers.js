const express = require("express")
const User = require("../models/user.model")
const middleWare = require("../middleware/middleware")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require("bcrypt")


const loginRoutes = express.Router()

loginRoutes.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body
        const userExist = await User.findOne({ username })
        if (userExist) {
            return res.status(400).json({ message: "User already exists." })
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const newUser = await User({ username, password: hashedPass })
        await newUser.save()
        res.status(201).json({ message: "User signup successful",newUser})

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

loginRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: `Invalid user name and password.` })
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            console.log(isMatch, user.password, password)
            if (isMatch) {
                const token = jwt.sign({ userId: user._id, username: user.username, role: "user" }, JWT_SECRET, { expiresIn: "24h" })
                return res.json({ token })
            }
            else {
                return res.status(400).json({ message: "Password invalid" })
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
loginRoutes.get("/users",middleWare,async(req,res)=>{
try{
    const allUsers = await User.find()
    res.json(allUsers)
}catch(error){
   res.status(500).json({error: error.message})
}
})

module.exports = loginRoutes