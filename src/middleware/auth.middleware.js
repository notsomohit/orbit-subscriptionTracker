import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/env.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-errors.js";

export const authorize = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        throw new ApiError(401, "Unauthorized: No authentication token provided");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new ApiError(401, "Unauthorized: Token expired");
        }
        throw new ApiError(401, "Unauthorized: Invalid token");
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        throw new ApiError(401, "Unauthorized: User account no longer exists");
    }

    req.user = user;
    next();
});