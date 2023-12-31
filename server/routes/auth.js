const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')


router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body
    if (!email || !password || !name){
        return res.status(422).json({error:"please add all the filelds"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User alredy exist"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            //saving hashed passowrd in database
            const user = new User({
                name,
                email,
                password:hashedpassword,
                pic
            })
            user.save()
            .then(user=>{
                res.json({message:"saved succfuly"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if (!email || !password){
        return res.status(422).json({error:"please add email and password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or Password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if (doMatch){
                //res.json({message:"sign in successful"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        })
        .catch(err=>{
            console.log("Error", err);
        })
    })
  })
module.exports = router