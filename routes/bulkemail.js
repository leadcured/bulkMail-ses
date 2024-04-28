import express from "express";
import {
  newTask
} from "../controllers/bulkemail.js";
//import { multerS3Config,handleFileUpload,validDataFile } from "../controllers/bulkemail.js"
import multer from 'multer';

const router = express.Router();



router.get("/my", newTask);
//router.post("/upload", upload.array("image"),uploadTask);


export default router;