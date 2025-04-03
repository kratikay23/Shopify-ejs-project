import express from "express";
import multer from "multer";
import path from "path";

let app = express();

let storage = multer.diskStorage({
    destination: function(req, file, cb){
         cb(null, "./uplode")
    },
    filename : function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const uplode =multer({storage});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}));

app.get("/",(req,res,next)=>{
    return res.render("form.ejs");
})

app.post("/uplode", uplode.single("profileImage"),(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
});

app.listen(3000,()=>{
    console.log("Server started......");
});