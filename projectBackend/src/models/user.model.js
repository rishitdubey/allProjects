import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//define schema for user data
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //cloudinary url
        },
        coverImage: {
            type: String, //cloudinary url
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        watchHistory: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Video"
                }
            ]
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

//create a kind of middleware which executes before every "save" operation performed on user
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 8);
    next();
});

//defining a new method for userSchema only
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); //compares entered password with the hashed password. Returns boolean
}

// generates new access tokens with payload, secret(signature) and expiry
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// generates new refresh tokens with payload, secret(signature) and expiry
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.Model("User", userSchema)