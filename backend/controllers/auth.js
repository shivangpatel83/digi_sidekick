const user = require(`../models/auth`)
const bcrypt = require(`bcrypt`);
const {phone} = require(`phone`)
const jwt = require(`jsonwebtoken`)

const secretKey = process.env.SECRET_KEY

const validateEmail=(mail)=>{
        const validRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if(!validRegex.test(mail)){
        return true
        }
}

const validatePwd=(pwd)=>{
    const minLength = 8
    const maxLength = 16
    const regExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,16}$/
    if(pwd.length<minLength || pwd.length>maxLength){
        return true
    }
    else if(!regExp.test(pwd)){
        return true
    }
}

const validatePhone=(phoneNo)=>{
    return phone(phoneNo)
}

const verifyUser = async (token)=>{
    // console.log(`verifyApitoken`,token);
  
        const verify = await jwt.verify(token, secretKey)
        // console.log(`verifyApi`,verify)
        if(verify._id){

            return verify._id
        }
        else{
            return false
        }
}

module.exports.signupAuth = async (req,res)=>{
    try{
        const {firstName , lastName , email, mobileNumber, password, country} = req.body
        const phoneNumber = '+'+country+mobileNumber
        if(!firstName || !lastName || !email || !mobileNumber || !password || !country){
            return res.status(401).json({success: false, error : 'Fill All the Fields!'})
        }
        else if(validateEmail(email)){
            return res.status(401).json({success: false, error : 'Invalid Email!'})
        }
        else if(!validatePhone(phoneNumber).isValid){
            return res.status(401).json({success: false, error : 'Invalid Mobile number!!'})
        }
        else if(validatePwd(password)){
            return res.status(401).json({success: false, error : 'Invalid Password parameters!'})
        }
        try{
      const foundUser =  await user.findOne({email: email})
      if(foundUser){
        return res.status(401).json({success: false, error : 'User already exists!'})
      }
      else{
        try{
        const hashPwd = await bcrypt.hash(password,12)
        const storeUser = new user({
            firstName,
            lastName,
            email,
            mobileNumber,
            country,
            password : hashPwd
        })
        try{
        const saveUser = await storeUser.save()
        return res.status(201).json({success: true, message : 'User successfully stored in the database'})
        }
        catch(e){
        res.status(500).json({error: e.message})
        }
      }
      catch(e){
        res.status(500).json({error: e.message})
      }
    }
    }
    catch(e){
        res.status(500).json({error: e.message})

    }
    }
    catch(e){
        res.status(500).json({error: e.message})
    }
}


module.exports.loginAuth = async (req,res)=>{

    try{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(401).json({success: false, error : 'Fill All the Fields!'})
    }
    try{
        const getUser = await user.findOne({email : email})
        if(!getUser){
            return res.status(401).json({success: false, error : 'Invalid Email!'})
        }
        else{
            const loginPwd = getUser.password
            try{
                const verifyPwd = await bcrypt.compare(password,loginPwd)
                if(!verifyPwd){
                    return res.status(401).json({success: false, error : 'Invalid Password!'})
                }
                else{
                    const token =  await jwt.sign({_id : getUser._id}, secretKey)
                    // console.log(`login`,token)
                    return res.status(201).json({success: true, message : 'Login Successful', token : token})
                }
            }
            catch(e){
                console.log(e.message)
                res.status(500).json({error: e.message})

            }
        }
    }
    catch(e){
        console.log(e.message)
        res.status(500).json({error: e.message})
    }
    }
    catch(e){
        console.log(e.message)
        res.status(500).json({error: e.message})
    }

    
}


module.exports.userEdit = async(req,res)=>{
    // console.log(req.params)
    try{
            if(verifyUser(req.token)){
        const id = req.params.id
        const obj = req.body

        const updatedUser = await user.updateOne({_id : id},{$set:obj})
        // console.log(updatedUser)
        return res.status(201).json({success: true, message : 'User successfully updated'})
            }
            else{
                res.status(500).json({error: e.message})
            }
    }
    catch(e){
        console.log(e.message)
        res.status(500).json({error: e.message})

    }
}

module.exports.findOneUser= async(req,res)=>{
    // console.log(req.params.id)
try{
    if(verifyUser(req.token)){
    const id = req.params.id
    let data = await user.findOne({_id:id})
    delete data['password']
    return res.status(201).json({success: true, data : data})
}
else{
    res.status(500).json({error: e.message})
}
}

catch(e){
    console.log(e.message)
    res.status(500).json({error: e.message})
}
}


module.exports.getUser= async(req,res)=>{
        // console.log( "getToken",req.token)
    try{
        if(verifyUser(req.token)){
        const allUsers = await user.find({})
        // console.log(allUsers)
        return res.status(201).json({success: true, allUsers : allUsers})  
}
else{
    res.status(500).json({message: e.message})
}
    }

    catch(e){
        console.log(e.message)
        res.status(500).json({error: e.message})
    }
}


module.exports.deleteUser = async(req,res)=>{
    try{
        // console.log("deleteUserToken", req.token);
        // console.log(`id`,req.params.id)
        const admin_id = await verifyUser(req.token);
        // console.log("verifyToken",admin_id);
        const id = req.params.id
        // console.log(`delete_token`,await verifyUser(req.token))
        if(admin_id!==id){
        const deletedUser = await user.deleteOne({_id : id})
        return res.status(201).json({success: true, message : 'User successfully deleted'})
    }
    else{
        res.status(500).json({error: `Unauthorize to delete User!`})
    }
}
    catch(e){
        console.log(e.message)
        res.status(500).json({error: e.message})

    }
}