//server.js

import express from 'express';
import "dotenv/config";         //variavel de ambiente
import app from "./src/app.js"; 	//app é onde está salvoo express()
import path from "path"; //ferramenta que permite manipular caminhos de arquivos e diretórios de maneira mais fácil e segura
import { fileURLToPath } from 'url';  //usada para converter um URL de arquivo (representado como uma string no formato file://) para um caminho de sistema de arquivos adequado (um caminho no formato de sistema de arquivos local C:\Users\Usuario\arquivo.txt no Windows).
import cors from "cors";


const allowedOrigins = [
  "http://127.0.0.1:5500",    // dev local
  "https://adopets-cc4vzgb42-mariahs-projects-e924f2e3.vercel.app/"  // front em produção
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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Configuração do servidor Express para servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/uploads', express.static(path.join(__dirname, 'src','uploads')));  
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Configura o Express para interpretar requisições com dados de formulários HTML, com suporte a objetos e arrays aninhados. Para lidar com dados de formulários (POST). 


const PORT=3000;        			//Definindo a porta

app.listen(PORT, ()=>{               		//listen=>Evento tipo uma conexão, neste caso na porta 3000
    console.log("Servidor escutando!")
})