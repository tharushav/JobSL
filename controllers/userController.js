const User =require('../models/User');
const CryptoJS = require('crypto-js');

module.exports = {
    updateUser : async(req,res)=>{
         if(req.body.password){
            req.body.password =CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
         }

         try{
            const updatedUser =await User.findByIdAndUpdate(
                req.user.id,{
                    $set:req.body
                },{new:true}
            );
            const {password,__v,createdAt, ...others} = updatedUser._doc;
            res.status(200).json({...others});
         }catch(error){
            res.status(500).json(error)
         }
    },

    deleteUser:async(req,res)=>{
        try{
            await User.findByIdAndDelete(req.user.id)
            res.status(200).json('Account deleted ')
        }catch(error){
            res.status(500).json(error)

        }
    },

    getUser:async(req,res)=>{
        try{
            const user = await User.findById(req.user.id);
            const {password,__v,createdAt,updatedAt, ...userData}= user._doc;
            res.status(200).json(userData)
        }catch(error){
            res.status(500).json(error)

        }
    },

    getAllUser:async(req,res)=>{
        try{
            const allUsers = await User.find();
            res.status(200).json(allUsers)
        }catch(error){
            res.status(500).json(error)

        }
    }
}