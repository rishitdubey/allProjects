import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { generateAccesAndRefreshTokens } from "../utils/bothTokenGenerator.js"
import { uploadToCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const registerUser = asyncHandler(async (req, res, next) => {

    //get data inputs
    //check their format of credentials
    //check if user already exists
    //save to db

    const { username, fullname, email, password } = req.body;

    const emptyFields = [username, fullname, email, password].filter(field => field === "");

    if (emptyFields.length() > 0) {
        res.status(400).json({
            message: "All fields are required",
        });
    }

    const userExists = await User.findOne({ username })

    if (userExists) {
        res.status(400).json({
            message: "Username already exists",
        })
    }

    User.create({
        fullname,
        username,
        email,
        password,
    })
        .then(() => {
            res.status(200).json({
                message: " New user registered successfully"
            })
        })
        .catch((error) => {
            console.error("ERROR:", error);
            res.status(500).json({
                message: "User registration failed"
            })
        })

})

const loginUser = asyncHandler(async (req, res, next) => {

    // get username/email and password
    // check if user exists in db
    // if user exists, verify password
    // for valid credentials, provide a jwt and a refresh token

    const { username, email, password } = req.body;

    let validUser;
    if (username || email) {
        validUser = User.findOne({
            $or: [{ username }, { email }]
        })
    }
    // second approach (simpler):-
    // if (username) {
    //     validUser = await User.findOne({ username });
    // }
    // else if (email) {
    //     validUser = await User.findOne({ email });
    // }
    else {
        res.status(400).json({
            message: " username or email is required"
        })
    }

    if (!validUser) {
        res.status(404).json({
            message: "User does not exist"
        })
    }

    let correctPass;
    if (password) {
        correctPass = await validUser.isPasswordCorrect(password)
    }
    else {
        res.status(401).json({
            message: "Password not entered"
        })
    }

    if (correctPass) {
        //generate acces token and refresh token
        const { accessToken, refreshToken } = await generateAccesAndRefreshTokens(validUser._id)

        const loggedInUser = await User.findById(validUser._id)
            .select("-password -refreshToken")

        const options = {
            httpOnly: true, // makes cookies editable from sever only
            secure: true,
        }

        res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User logged in successfully",
                user: loggedInUser,
                accessToken,
                refreshToken
            });
    }
    else {
        res.status(404).json({
            message: "Incorrect password"
        });
    }

})

const logoutUser = asyncHandler(async (req, res, next) => {

    await User.findByIdAndUpdate(req.user._id, {
        refreshToken: undefined
    })

    const options = {
        httpOnly: true, // makes cookies editable from sever only
        secure: true,
    }

    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            message: "User logged out successfully"
        })
})

const uploadPictures = asyncHandler(async (req, res, next) => {

    const avatarImg = req.files["avatar"];
    const coverImg = req.files["coverImage"];

    const avatar = await uploadToCloudinary(avatarImg.path);
    const cover = await uploadToCloudinary(coverImg.path);

    await User.findByIdAndUpdate(req.user._id, {
        avatar: avatar.url,
        coverImage: cover.url,
    })

    fs.unlinkSync(avatarImg.path)
    fs.unlinkSync(coverImg.path)

    res.status(200);
})

export { registerUser, loginUser, logoutUser, uploadPictures }