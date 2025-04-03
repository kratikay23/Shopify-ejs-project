import e from "express";
import bodyParser from "body-parser";
import { IndexRouter } from "./routes/index.js";
import { SignInRouter } from "./routes/signin.route.js";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server Started...");
})
