import express from 'express';
import bcrypt from 'bcrypt';
import {User} from '../models/User.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/signup',async (req,res)=>{
    console.log(req);
    const {username,email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.json({message:"User already exists"})
    }

    const hashpassword = await bcrypt.hash(password,10);
    const newUser = new User({
        username,
        email,
        password: hashpassword,
    })

    await newUser.save();
    return res.json({status:true,message:"record registered"});
})

router.post('/login',async(req,res)=>{
    console.log(req);
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        return res.json({message:"User does not exist please sign up"});
    }

    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword) {
        return res.json({message:"password is not correct"});
    }

    const token = jwt.sign({username:user.username},process.env.KEY,{expiresIn:'12h'});
    res.cookie('token',token,{httpOnly:true,maxAge:4320000});
    return res.json({status:true,message:"login successful"});
})

router.post('/forgot_password',async(req,res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.json({message:"User not found"});
        }
        console.log(process.env.KEY);
        const token = jwt.sign({id: user._id},process.env.KEY,{expiresIn:'5m'})
        console.log(token);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'kumarabhi2k21@gmail.com',
              pass: 'avptlrffvynxzvav'
            }
          });
          
          var mailOptions = {
            from: 'kumarabhi2k21@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:3000/reset_password/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.json({status: false,message:"error sending the email"});
            } else {
              return res.json({status:true,message:"Please check your email for reset password link"});
            }
          });

    } catch (err) {
        console.log(err);
    }
})

router.post('/reset_password/:token',async(req,res)=>{
    const {password} = req.body;
    const {token} = req.params;
    console.log(token);
    try {
        const decoded = await jwt.verify(token,process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password,10)
        await User.findByIdAndUpdate({_id:id},{password:hashPassword});
        return res.json({status:true,message:"updated password"})
    }
    catch (err) {
        console.log(err);
        return res.json("invalid token");
    }
})



const verifyUser = async (req,res,next) => {
    const token = req.cookies.token;
    try {
        if(!token) {
            return res.json({status: false,message:"no token"});
        }
        const decoded = await jwt.verify(token,process.env.KEY);
        console.log(decoded);
        next();

    } catch (err) {
        return res.json(err);
    }
    
}

router.get('/verify',async(req,res)=> {
    const token = req.cookies.token;
    try {
        if(!token) {
            return res.json({status: false,message:"no token"});
        }
        const decoded = await jwt.verify(token,process.env.KEY);
        console.log(decoded);
        return res.json({status:true,info:decoded});
        next();

    } catch (err) {
        return res.json(err);
    }
})

router.post('/like',async(req,res)=>{
    const {itemId,fixedusername} = req.body;
    try {
        const user = await User.findOne({username:fixedusername});
        user.liked.push(itemId);
        await user.save();
        return res.json({status:true,message:"added to like list"});
    }
    catch (err) {
        console.log(err);
        return res.json({status:false,message:"some error occured"});
    }
})

router.post('/get_liked',async(req,res)=>{
    const {fixedusername} = req.body;
    try {
        const user = await User.findOne({username:fixedusername});
        console.log("user is",user);
        const liked = user.liked;
        return res.json({status:true,list:liked});
    }
    catch(err) {
        return res.json({status:false,message:"failed to do"});
    }
})

export {router as UserRouter};


// avpt lrff vynx zvav