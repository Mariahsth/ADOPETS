import mongoose from "mongoose";        //Importando o mongoose

async function conectaNaDatabase(){			//função assíncrona
    mongoose.connect(process.env.STRING_CONEXAO_DB)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch(err => console.error("Erro na conexão com MongoDB:", err));
    return mongoose.connection      //método interno do mongoose, vai retornar objeto com todas as infos que precisa pra conectar com o banco e fazer as operações
}


export default conectaNaDatabase;		//exporta a função 