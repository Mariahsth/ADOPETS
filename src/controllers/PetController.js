import pet from "../models/Pets.js";
import { cloudinary } from "../config/cloudinaryConfig.js";


class PetController {
    static async listarPets(req, res) {
        try {
            const listaPets = await pet.find({});
            res.status(200).json(listaPets);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async listarPetPorId(req, res) {
        try {
            const id = req.params.id;
            const petEncontrado = await pet.findById(id);
            res.status(200).json(petEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição do pet` });
        }
    }

    static async cadastrarPet(req, res) {
        try {
            const imageUrl = req.file?.path; // URL do Cloudinary

            const {
                nome, especie, raca, sexo, porte, idade,vacinado, castrado, vermifugado,
                comentarios
            } = req.body;


            const novoPet = new pet({
                nome,
                especie,
                raca,
                sexo,
                porte,
                idade,
                vacinado,
                castrado,
                vermifugado,
                comentarios,
                imagem: imageUrl || '',
                imagemPublicId: req.file.filename,
                favorito: false
            });

            const petSalvo = await novoPet.save();
            res.status(201).json(petSalvo);
        } catch (error) {
            res.status(500).json({ message: "Erro ao cadastrar pet", error: error.message });
        }
    }

    static async atualizarPet(req, res) {
        try {

            const id = req.params.id;
            const petExistente = await pet.findById(id);

            // Se tiver imagem antiga, destrua no Cloudinary
            if (petExistente.imagemPublicId) {
                try {
                    await cloudinary.uploader.destroy(petExistente.imagemPublicId,  { resource_type: "image", invalidate: true });
                } catch (destroyError) {
                    console.error("❌ Erro ao chamar cloudinary.uploader.destroy():", destroyError);
                } 
            }
            const updateData = {...req.body};

            if (req.file && req.file.path) {
                updateData.imagem = req.file.path;
                updateData.imagemPublicId = req.file.filename;
              }


            await pet.findByIdAndUpdate(id, updateData, { new: true });
            res.status(200).json({ message: "Pet atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do pet` });
        }
    }
    static async atualizarFavorito(req, res) {
        try {

            const id =req.params.id;
            const petEncontrado=await pet.findById(id)


            if (!petEncontrado){
                return res.status(404).json({message:"Pet não encontrado"});
            }
            petEncontrado.favorito=!petEncontrado.favorito
            await petEncontrado.save();
            res.status(200).json(petEncontrado)


        } catch (error) {
            res.status(500).json({message:"Erro ao atualizar o favorito", error: error.message})
        }
    }

    static async excluirPet(req, res) {
        try {
            const id = req.params.id;
            const petExistente = await pet.findById(id);

            // Se tiver imagem antiga, destrua no Cloudinary
            if (petExistente.imagemPublicId) {
                try {
                    await cloudinary.uploader.destroy(petExistente.imagemPublicId,  { resource_type: "image", invalidate: true });
                } catch (destroyError) {
                    console.error("❌ Erro ao chamar cloudinary.uploader.destroy():", destroyError);
                } 
            }

            await pet.findByIdAndDelete(id);
            res.status(200).json({ message: "Pet deletado com sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar pet` });
        }
    }
}

export default PetController;
