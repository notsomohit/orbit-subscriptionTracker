import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../../config/env.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";

export const authorize = asyncHandler(async (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return res.status(401).json(new ApiResponse(401,"unauthorised"));
    }

    const decoded = jwt.verify(token,JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if(!user){
        return res.status(401).json(new ApiResponse(401,"unauthorised no user"));
    }

    req.user = user;
    next();
});