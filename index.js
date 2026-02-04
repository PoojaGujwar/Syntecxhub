const {initializeDatabase} = require("./config/db.connection")
const express = require("express")
const routes  = require("./controllers/resourceController.js")
const loginRoutes = require("./controllers/signupControllers.js")
const app = express()
const PORT = 4000

initializeDatabase()
app.use(express.json())

app.use("/",routes)
app.use("/auth",loginRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})