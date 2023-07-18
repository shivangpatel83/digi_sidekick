

const jwtAuth=(req, res, next)=>{
    const {headers} = req
    const bearerHeader = headers.authorization
    // console.log(bearerHeader)
    if(bearerHeader){
        const bearerToken = bearerHeader.split(` `)[1]
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403)
    }
}

module.exports = jwtAuth

