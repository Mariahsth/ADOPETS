import express from "express";
import conectaNaDatabase from "./config/dbConnect.js";		
import routes from "./routes/index.js";
import cors from "cors";
import path from "path";

const allowedOrigins = [
  "http://127.0.0.1:5500",    // dev local
  "https://adopets-7b387y4jy-mariahs-projects-e924f2e3.vercel.app"  // front em produção
];

app.use(cors({
  origin: function(origin, callback) {
    // permitir requests sem origin (Postman, por exemplo) ou os que estiverem na lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS não permitido para origem " + origin));
    }
  },
  credentials: true
}));

const app=express();        
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));



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