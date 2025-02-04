//Pets.js

import mongoose from "mongoose";

const petsSchema=new mongoose.Schema({			//Criar Schema (objeto de configuração que define a estrutura e as propriedades de um documento)
    id: {type: mongoose.Schema.Types.ObjectId},     //Definindo o tipo de dado de cada parametro
    nome:{type:String, require:true},             //required=obrigatório
    especie:{type:String, require:true},
    raca:{type: String},
    sexo:{type: String, require:true},
    porte:{type:String},
    idade:{type:Number},
    vacinado:{type:Boolean},
    castrado:{type:Boolean},
    vermifugado:{type:Boolean},
    imagem: { type: String, required: false },
    comentarios:{type:String},
}, {versionKey: false} )           		 //se refere ao versionamento do mongodb

//definindo o modelo "pet" (modelo é um objeto que representa uma coleção na base de dados, é uma interface)
const pet=mongoose.model("pets", petsSchema);           //"pets" se refere a coleção criado no atlas, e o 2o parametro se refere qual schema ele se refere

export default pet;