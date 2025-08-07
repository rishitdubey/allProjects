import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const app = express();

app.use(cors({
    origin: '*', //everyone allowed to communicate with our backend
    credentials: true
}))

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded());

//middleware for accessing cookies
app.use(cookieParser());

import userRouter from "./routes/user.route.js"

app.use("/api/v1/users", userRouter);