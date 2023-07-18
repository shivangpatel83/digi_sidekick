const mongoose = require(`mongoose`);
const dotenv = require(`dotenv`)

dotenv.config()
const mongoURI = process.env.MONGOURI

mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology : true})
.then(()=>{
    console.log('Connected to Database')
})
.catch((e)=>{
    console.log(e)
})

const db = mongoose.connection

module.exports = {db}