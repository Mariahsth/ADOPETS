import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";		
import routes from "./routes/index.js";
import cors from "cors";
import path from "path";

const app=express();        

const allowedOrigins = [
  "http://127.0.0.1:5500",
  "https://adopets-eight.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS não permitido para origem: " + origin));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));






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