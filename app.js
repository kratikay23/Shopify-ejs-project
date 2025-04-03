import express from "express";
import path from "path";
import session from "express-session";
import bodyParser from "body-parser";
import AdminRouter from "./auth/authroutes/admin.route.js";
import ProductRouter from "./routes/product.route.js";
import HomeRouter from "./auth/authroutes/home.route.js";
import UserRouter from "./user/Userroutes/Userproducts.route.js";  

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", [
    path.join(path.resolve(), "auth", "authviews"),  // Auth views
    path.join(path.resolve(),  "views"),    // Admin views (Product views)
    path.join(path.resolve(), "user", "Userviews")  // User views 
]);

app.use(session({ secret: "dflafjreireovcxvxcbvroeiwruower" }));

app.use("/", AdminRouter);
app.use("/home", HomeRouter);
app.use("/product", ProductRouter);

app.use("/", UserRouter);
console.log("app page");

app.use("/uplode", express.static(path.join(path.resolve(),  "uplode")));

app.listen(3000, () => {
    console.log("Server Started....");
});
