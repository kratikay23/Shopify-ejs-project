import express from "express";
import multer from "multer";
import { addProductPage, deleteProduct, addProduct, viewProductPage, editProductPage, editProduct } from "../controller/productController.js";
import { verify } from "../auth/middleware/auth.js";

const router = express.Router();
let storage = multer.diskStorage({
    destination: function(req, file, cb){
         cb(null, "./uplode")
    },
    filename : function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const uplode =multer({storage});
router.get("/addProduct", verify, addProductPage);

router.get("/viewProduct", verify, viewProductPage);
router.get("/edit/:id", verify, editProductPage);
router.post("/edit/:id", verify, uplode.single("Images"), editProduct);
router.get("/delete/:id", verify, deleteProduct);

router.post("/addProduct",uplode.single("Images"), addProduct)

export default router;