const express = require(`express`);
const cors = require('cors')
const jwt = require('jsonwebtoken');
const dotenv = require(`dotenv`);
const db =require('./db')
const jwtAuth = require(`./middlewear/jwtAuth`)
const app = express()

//routes
const authRouter = require(`./routes/auth`)

 dotenv.config()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use(`/`, authRouter)

app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
})