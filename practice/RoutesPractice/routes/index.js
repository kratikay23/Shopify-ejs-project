import e from "express";

const router = e.Router();

router.get("/",(req,res,next)=>{
    return res.render("v1.ejs");
});

export default router;