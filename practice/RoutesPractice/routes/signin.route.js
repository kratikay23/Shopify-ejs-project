import { show } from "../controller/c1.js";
import e from "express";
export let router = e.Router();

router.post("/sing-in",show);