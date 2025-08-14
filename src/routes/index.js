
import express from "express";
import pets from "./routes.js"

const routes= (app) =>{
    app.route("/").get((req, res)=> res.status(200).send("ADOPETS")); 

    app.use(express.json(), pets);                

};

export default routes;