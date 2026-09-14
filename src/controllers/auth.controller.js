import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET, JWT_SECRET_EXPIRY, NODE_ENV } from "../../config/env.js"; 
import { asyncHandler } from "../utils/async-handler.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-errors.js";

const cookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
};

export const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields (name, email, password) are required");
    }

    if (typeof password !== "string" || password.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters");
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });

    if (userExists) {
        throw new ApiError(409, "User with this email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword
    });

    const user = await User.findById(newUser._id).select("-password");

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_SECRET_EXPIRY || "1d" });

    res.cookie("token", token, cookieOptions);

    res.status(201).json(
        new ApiResponse(
            201,
            "User registered successfully",
            { token, user }
        )
    );
});

export const logIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user with password field explicitly selected
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
        // Return 401 for both non-existent user and wrong password to prevent user enumeration
        throw new ApiError(401, "Invalid credentials");
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_SECRET_EXPIRY || "1d" });

    // Exclude password from the returned user object
    const userResponse = user.toObject();
    delete userResponse.password;

    res.cookie("token", token, cookieOptions);

    res.status(200).json(new ApiResponse(
        200,
        "User logged in successfully",
        {
            token,
            user: userResponse
        }
    ));
});

export const logOut = asyncHandler(async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "strict" : "lax",
    });
    res.status(200).json(
        new ApiResponse(
            200,
            "User logged out successfully"
        )
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(
            200,
            "User session is valid",
            { user: req.user }
        )
    );
});