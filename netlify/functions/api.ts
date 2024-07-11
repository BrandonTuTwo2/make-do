import express, { Router } from "express";
import serverless from "serverless-http";

require("dotenv").config();

const api = express();
const router = Router();

router.get("/hello", (req, res) => {
    console.log(process.env["TEST"]);
    console.log("HI ME")
    res.send({
    hi: "Mom"
})});


router.get("/cocktailSearch", (req,res) =>{
    console.log("HERE IS REQ");
    console.log(JSON.parse(req.body));
    console.log(process.env["API_KEY"]);
    console.log("HI ME")
    res.send({
    hi: "Mom"
})});


api.use("/api/", router);
export const handler = serverless(api);