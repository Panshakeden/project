const express= require('express')
const asyncHandler= require('express-async-handler')
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const User= require('../models/userModel')




 //This Register new user
 // route POST

const registerUser=asyncHandler(async(req,res)=>{
   const {name,email,password}=req.body

   if(!name || !email || !password){
    res.status(404)
    throw new Error('please add all fields')
   }

   //check if user exist

   const userExists= await User.findOne({email})
   if(userExists){
    res.status(400)
    throw new Error('user already exists')

   }

   //hash password

   const salt= await bcrypt.genSalt(10)
   const hashedPassword= await bcrypt.hash(password,salt)
  
    //create user

    const user= await User.create({
        name,
        email,
        password:hashedPassword
    })


     if (user) {
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email, 
            token:generateToken(user._id),
        })
        
     } else {
        res.status(400)
        throw new Error('Invalid data field') 
     }

    // res.json({message:'register user'})
})


 //dis login
 // route POST/authenticate users
 //access public

 const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}= req.body

            //check for user email
    const user= await User.findOne({email})

    if (user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('invalid credientials')
    }


    res.json({message:'user data dislayed'})
})



 // get user data
 // route get
 //access private

 const getMe=asyncHandler(async(req,res)=>{
    const{_id, name,email}=await User.findById(req.user.id)
    res.status(200).json({

        id:_id,
        name,
        email,
    })


})

//Generate jwt

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })

}


module.exports={
    registerUser,
    loginUser,
    getMe,
}