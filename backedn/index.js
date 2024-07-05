import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

const MONGO_URL=process.env.MONGO_URL;
const connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Connected to db");
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

app.post("/api/register",async(req,res)=>{
    connectDB();
    const {name,email,password}=req.body;
    console.log(name,email,password)
    try{
        const passwordHash=await bcrypt.hash(password,10);
        const user=new User({
            name,
            email,
            password:passwordHash,
        })
        await user.save();
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        console.log(token);
        res.status(201).json(token);
    }catch(e){
        res.status(500).json({message:e.message});
    }
})

app.get("/api/userDetails/:token",async(req,res)=>{
    connectDB();
    const {token}=req.params;
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id);
        // console.log(user)
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

app.post("/api/signin",async(req, res)=>{
    connectDB();
    const {email,password} = req.body;
    try{
        const check=await User.findOne({email:email});
        if(check){
            const pass= await bcrypt.compare(password,check.password);
            if(pass){
                const token=jwt.sign({id:check._id},process.env.JWT_SECRET,{expiresIn:"7d"});
                console.log(token);
                res.status(201).json(token);
            }
        }
    }catch(err){
        res.status(500).json(err.message);
    }
})

app.post("/api/saveAddress",async(req,res)=>{
    connectDB();
    const {id,address}=req.body;
    console.log("Id",id)
    try{
        const updateRes=await User.findByIdAndUpdate(id, {
            $push: { savedAddress: { address } }
        });
        res.status(201).json("Address Saved!");
        console.log(updateRes);
    }catch(e){
        res.status(500).json(e.message);
    }
})



app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})