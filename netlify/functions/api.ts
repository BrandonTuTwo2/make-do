import express, { Router } from "express";
import serverless from "serverless-http";

require("dotenv").config();

const api = express();
const router = Router();

router.post("/cocktailSearch", async (req,res) =>{
    const ingrdList = JSON.parse(req.body)
    //This is will search for all cocktails with the following ingredients
    //We could maybe instead do a search for just drinks that contain not only those ingredients
    const cocktailsRaw = await fetch(
        `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingrdList.ingredientList.toString()}`,{
            headers: {
                "X-Api-Key": `${process.env["API_KEY"]}`
            }
        }
    )

    const cocktails = await cocktailsRaw.json();
    console.log(cocktails);
    res.send({
        body: JSON.stringify(cocktails),
})});


api.use("/api/", router);
export const handler = serverless(api);