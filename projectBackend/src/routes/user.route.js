import { Router } from "express";
import { registerUser, loginUser, logoutUser, uploadPictures } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), registerUser);

router.route("/login").get(loginUser);

router.route("/logout").get(verifyJWT, logoutUser);

router.route("/edit-profile/upload-pictures").post(verifyJWT, upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1
    }
]), uploadPictures);

export default router;