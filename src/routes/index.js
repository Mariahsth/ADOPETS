
import express from "express";
import pets from "./routes.js"

//Criar função para agrupar todas rotas que podemos receber
const routes= (app) =>{
    app.route("/").get((req, res)=> res.status(200).send("ADOPETS")); 

    app.use(express.json(), pets);                

};

export default routes;