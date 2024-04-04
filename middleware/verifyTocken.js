const User = require('../models/User');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
            if (err){
                return res.status(403).json({status: false, message: "Token is not valid!"});
            }
            req.user = user;
            console.log(user)
            next();
        });
    } else {
        return res.status(401).json({status: false, message: "You do not have permission to access this route"});
    }
};

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next();
        } else {
           return res.status(403).json({status: false, message: "You do not have permission to access this route"});
        }
    });
};

const verifyAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are restricted to perform this task")
        }
    })
}
module.exports = {verifyToken,verifyAndAuthorization,verifyAndAdmin};