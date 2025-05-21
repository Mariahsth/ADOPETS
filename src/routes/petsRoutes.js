//petsRoutes.js
import express from "express";
import PetController from "../controllers/petController.js";
import { upload } from "../config/mutlerConfig.js";  // Corrigir o caminho, se necessário


const routes=express.Router();      //Router é um método do express. É usado para criar um roteador que gerencia as rotas da aplicação.

routes.get("/pets", PetController.listarPets);		//-->Busca a função que lista todos  os pets com GET
routes.get("/pets/:id", PetController.listarPetPorId);	//-->Busca a função que busca o pet por ID com GET
routes.post("/pets", upload.single('imagem'), PetController.cadastrarPet);//-->Busca a função que cadastra um novo pet com POST
routes.put("/pets/:id", PetController.atualizarPet);	//-->Busca a função que atualiza um pet com PUT
routes.delete("/pets/:id", PetController.excluirPet);	//-->Busca a função que deleta um pet com DELETE

export default routes;