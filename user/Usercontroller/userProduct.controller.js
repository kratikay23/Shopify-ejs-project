import UserProduct from "../Usermodel/userProduct.model.js";
import Product from "../../model/prduct.model.js";

console.log("controller page")

export const getAllProducts = (req, res, next) => {
    console.log("controller page")

    UserProduct.findAllPro()
        .then(result => {
            console.log("Fetched Products:", result);
            res.render("products.ejs", { products: result });
        })
        .catch(err => {
            console.log("Database Error:", err);
            res.status(500).send("Error fetching products");
        });
};



export const updateCartQuantity = (req, res, next) => {
    let productId = req.params.id;
    let action = req.body.action; // "increase" or "decrease"

    if (!req.session.cart) {
        return res.redirect("/cart");
    }

    let existingProduct = req.session.cart.find(p => p.id == productId);

    if (existingProduct) {
        if (action === "increase") {
            existingProduct.quantity += 1;  // Increase quantity
        } else if (action === "decrease" && existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;  // Decrease but keep at least 1
        }
    }
    res.redirect("/cart");
};

export const addToCart = (req, res, next) => {
    let productId = req.params.id;
    if (!req.session.cart) {
        req.session.cart = [];  // Initialize cart if empty
    }
    UserProduct.findById(productId)
        .then(result => {
            if (result.length > 0) {
                let product = result[0]; // Extract product details
                // Check if product is already in cart
                let existingProduct = req.session.cart.find(p => p.id == productId);

                if (existingProduct) {
                    existingProduct.quantity += 1;  // Increase quantity if already exists
                } else {
                    product.quantity = 1; // First time adding, set quantity to 1
                    req.session.cart.push(product);
                }
            }
            console.log("Cart Updated:", req.session.cart);
            res.redirect("/cart");  // Redirect to cart after update
        })
        .catch(err => {
            console.log(err);
            res.redirect("/products");
        });
};
export const cartProduct = (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];  // Initialize cart if empty
    }
    UserProduct.findCartItems()
        .then(result => {
            console.log("cart Items : ", result);
            res.render("Usercart.ejs", { cartProducts: req.session.cart });
        }).catch(err=>{
            
        })
}

export const removeProduct = (req, res, next) => {
    const productId = parseInt(req.params.id); // Convert to number

    console.log("remove Cart :" , req.session.cart)

    if (!req.session.cart) {
        req.session.cart = [];
    }

    UserProduct.findById(productId)
        .then(result => {
            // Remove only the first matching instance of the product (not all)
            const index = req.session.cart.findIndex(product => product.id === productId);
            if (index !== -1) {
                req.session.cart.splice(index, 1); // Remove only the first occurrence
            }

            console.log("Updated Cart:", req.session.cart);
            res.redirect("/cart");
        })
        .catch(err => {
            console.log(err);
        });
}

export const checkOut = (req, res, next) => {
    console.log("Session Data Before Checkout:", req.session);

    const { address, payment_method, total_amount } = req.body;
    const user_id = req.session.user_id; // Get user_id from session

    if (!user_id) {
        console.error("Error: User ID is missing in session.");
        return res.status(400).send("User not logged in");
    }

    if (!req.session.cart || req.session.cart.length === 0) {
        return res.redirect("/cart");
    }

    // **Check if user_id exists in signin table**
    UserProduct.checkUserExists(user_id)
        .then(userExists => {
            if (!userExists) {
                console.error("Error: User ID does not exist in signin table");
                return res.status(400).send("Invalid user ID");
            }

            // Proceed with checkout if user exists
            return UserProduct.checkOut(user_id, address, payment_method, total_amount);
        })
        .then(result => {
            console.log("Payment Saved Successfully:", result);
            req.session.cart = []; // Clear cart after successful checkout
            return res.send("order-success");
        })
        .catch(err => {
            console.error("Database Error:", err);
            return res.status(500).send("Error processing payment");
        });
};




