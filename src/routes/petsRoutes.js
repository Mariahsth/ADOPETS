//petsRoutes.js
import express from "express";
import PetController from "../controllers/PetController.js";
import { upload } from "../config/mutlerConfig.js";  


const routes=express.Router();      

routes.get("/pets", PetController.listarPets);		
routes.get("/pets/:id", PetController.listarPetPorId);	
routes.post("/pets", upload.single('imagem'), PetController.cadastrarPet);
routes.put("/pets/:id", upload.single('imagem'), PetController.atualizarPet);	
routes.delete("/pets/:id", PetController.excluirPet);	
routes.patch('/pets/:id/favorito', PetController.atualizarFavorito);

export default routes;