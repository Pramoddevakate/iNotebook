const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fetchuser=require('../middleware/fetchuser');
const jwt_secret="hellopammya"


// Route 1: create user using post"api/auth/".Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "enter valid email").isEmail(),
    body("password", "passowrd must be minimum of 3 character").isLength({
      min: 5,
    }),
  ],
 async (req, res) => {
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user =await User.findOne({email:req.body.email});
    if (user){
        return res.status(400).json({ email:"sorry a user with the email already exists" });
    }
const salt =await bcrypt.genSalt(10);
const secPASS=await bcrypt.hash(req.body.password,salt);

   user= await User.create({
    
      name: req.body.name,
      email: req.body.email,
      password: secPASS,
    }) ;
    const data={
      user:{
        id:user.id
      }
    }

    const authtoken=jwt.sign(data,jwt_secret);
    success=true ;
    res.json({success:success,authtoken:authtoken});

}
catch(err)
      {
        console.log(err);
        res.status(500).send("internal server error");
      }
    }
);

//Route 2:authenticate a user using post : api/auth/login ,login required

router.post("/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "passowrd cannot be blank").exists(),

    
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const {email,password}=req.body;

    try{

      let user=await User.findOne({email});

      if(!user){
        success=false;
        return res.status(400).json({error:"please try to login with correct credentials"})
      }

      const passowrdCompare= await bcrypt.compare(password,user.password);
      if(!passowrdCompare){
        success=false;
        return res.status(400).json({error:"please try to login with correct credentials"})
      }

      const data={
        user:{
          id:user.id
        }
      }
      const authtoken= jwt.sign(data,jwt_secret);
      success=true ;
      res.json({success,authtoken})

    }catch(err)
    {
      console.log(err);
      res.status(500).send("internal server error");
    }
  }
);

//Route 3:authenticate a user using post : api/auth/getuser and validation user,login required


router.post("/getuser",
  fetchuser
  ,async(req,res)=>{

    try{

      let user=await User.findById(req.user.id).select('-password');
      res.send(user);

    }catch(err)
    {
      console.log(err);
      res.status(500).send("internal server error");
    }
  }
);



module.exports = router;
