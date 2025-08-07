import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        //get access token from cookies or from the header (if expected)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            res.status(401).json({
                message: "Unauthorized access"
            })
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        }
        catch (error) {
            console.error(error);
            res.status(401).json({
                message: "Token verification failed"
            })
        }

        const userData = await User.findById(decodedToken._id)
            .select("-password -refreshToken")

        if (!userData) {
            console.error()
            res.status(401).json({
                message: "Invalid access token"
            })
        }

        req.user = userData;
        next();
    }

    catch (error) {
        console.error(error);
        res.status(500).json("Token verification failed");
    }
})