import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";		//importa a função
import routes from "./routes/index.js";
const conexao= await conectaNaDatabase();			//conexao=conexao com banco de dados mongodb

conexao.on("error", (erro)=>{                   //.on define um evento, nesse caso um erro
    console.error("erro de conexão", erro);
})

conexao.once("open", ()=>{                      //.once também aguarda um evento, nesse caso uma conexão
    console.log("Conexão com o banco feito com sucesso")
})

const app=express();        //salvando o express na variável app


routes(app);



export default app