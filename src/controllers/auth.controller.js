import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {JWT_SECRET,JWT_SECRET_EXPIRY} from "../../config/env.js"; 
import { asyncHandler } from "../utils/async-handler.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-errors.js";

export const signUp = asyncHandler( async (req,res) =>{
    
    const {name,email,password} = req.body;
    
    if(!name || !email || !password){
        throw new ApiError(400,"all fields are required");
    }
    //check if user already exists
    const userExists = await User.findOne({email});

    if(userExists){
        throw new ApiError(409,"user already exists");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10);

    //create a new user
    const newUser = await User.create({name,email,password:hashedPassword});

    const user = await User.findById(newUser._id).select("-password");

    const token = jwt.sign({userId:newUser._id},JWT_SECRET,{expiresIn:JWT_SECRET_EXPIRY});

    res.status(201).json(
        new ApiResponse(
            201,
            "user registered successfully",
            {token,user:user}
        )
    );
}
);

export const logIn = asyncHandler(async(req,res) => {
    const{email,password} = req.body;

    if(!email || !password){
        throw new ApiError(400,"all fields are required");
    }

    //check if user exists
    const user = await User.findOne({email}).select("+password");;

    if(!user){
        throw new ApiError(404,"Invalid credentials");
    }

    //check if password is valid
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid credentials");
    }

    const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_SECRET_EXPIRY});

    res.status(200).json(new ApiResponse(
        200,
        `user logged in succesfully`,
        {
            token,
            user
        }
    ));

});

export const logOut = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json(
        new ApiResponse(
            200,
            "User logged out successfully"
        )
    );

});