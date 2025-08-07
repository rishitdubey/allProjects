import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
    try {
        if (!filePath) return null;
        const res = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });

        //after successful upload
        console.log("File successfuly uploaded", res.url);
        return res;
    }
    catch (error) {
        //remove the locally saved file from our server as it failed to upload
        fs.unlinkSync(filePath);
        console.log(`ERROR: ${error}`);
        return null;
    }

}