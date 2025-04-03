import express from "express";
import { signInAction,SingUpAction, signOutAction } from "../authController/admin.controller.js";
import { verify } from "../middleware/auth.js";
const router = express.Router();
router.get("/",(request,response,next)=>{
    return response.render("signin.ejs");
});
router.get("/sign-up",(req,res,next)=>{
    return res.render("SignUp.ejs");
});
router.get("/sign-in",(request,response,next)=>{
    return response.render("signin.ejs");
});
router.post("/sign-in",signInAction);
router.post("/sign-up",SingUpAction);
router.post("/sign-out",verify,signOutAction);
export default router;