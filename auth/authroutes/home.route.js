import express from "express";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.get("/",verify,(request,response,next)=>{
    return response.render("home.ejs");
});

export default router;