import express from "express";
import { addToCart, cartProduct, checkOut, getAllProducts ,removeProduct,updateCartQuantity} from "../Usercontroller/userProduct.controller.js";
import { verify } from "../../auth/middleware/auth.js";

const router = express.Router();

router.get("/products",verify, getAllProducts);
router.post("/add-to-cart/:id", verify, addToCart);
router.get("/cart", verify,cartProduct);
router.post('/cart/update/:id', updateCartQuantity);
router.post("/remove-from-cart/:id",verify, removeProduct);
router.post("/checkout", verify, checkOut);
router.get("/checkout",verify, (req, res) => {
    res.render("Usercheckout.ejs", { cartProducts: req.session.cart });
});


export default router;
