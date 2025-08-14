import "dotenv/config";         
import app from "./app.js"; 	
import path from "path";
import { fileURLToPath } from 'url';  //usada para converter um URL de arquivo (representado como uma string no formato file://) para um caminho de sistema de arquivos adequado (um caminho no formato de sistema de arquivos local C:\Users\Usuario\arquivo.txt no Windows).


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const PORT=3000;        			

app.listen(PORT, ()=>{               		
    console.log("Servidor escutando!")
})