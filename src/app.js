
import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";		//importa a função
import routes from "./routes/index.js";
import cors from "cors";
import path from "path";

const app=express();        //salvando o express na variável app

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(cors({
    origin: 'http://127.0.0.1:5500', 
    credentials: true, 
  }));

app.use(express.json());



(async () => {
    try {
      const conexao = await conectaNaDatabase();
  
      conexao.on("error", (erro) => {
        console.error("Erro de conexão:", erro);
      });
  
      conexao.once("open", () => {
        console.log("Conexão com o banco feita com sucesso");
      });
    } catch (erro) {
      console.error("Erro ao conectar no banco:", erro);
    }
  })();
  


routes(app);



export default app