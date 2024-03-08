// this is for setting the routes and what they are going to do
import express from 'express';
import bcrypt from 'bcrypt';
import {Post} from '../models/Post.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/add',async (req,res)=>{
    console.log(req.body);
    const {creater,message} = req.body;

    const newPost = new Post({
        creater,
        message
    })

    await newPost.save();
    return res.json({status:true,message:"post added"});
})

router.post('/modify',async (req,res)=>{
    console.log(req.body);
    const {itemId,modified_post,delete_post} = req.body;

    try {
        if(delete_post) {
            await Post.findByIdAndDelete({_id:itemId});
        }
        else {
            await Post.findByIdAndUpdate({_id:itemId},{message:modified_post});
        }
        return res.json({status:true,message:"post modified"});
    }
    catch (err) {
        console.log(err);
        return res.json({status:false,message:"Some error occured"});
    }
})

router.get('/get',async(req,res)=>{
    try {
        const posts = await Post.find();
        return res.json({status:true,posts:posts});
    }
    catch (err) {
        res.json({status:false,message:"failed to get the posts"});
    }
})

router.post('/comment',async(req,res)=>{
    const {itemId,comment} = req.body;
    // console.log(comment);
    try {
        const post = await Post.findById(itemId);
        // console.log(post);
        post.comments.push(comment);
        await post.save();
        return res.json({status:true,message:"comment added"});
    }
    catch (err) {
        console.log(err);
        return res.json({status:false,message:"some error occures"});
    }
})

export {router as PostRouter};