import pet from "../models/Pets.js";

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
            console.log(req.file)
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
                imagem: imageUrl || ''
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
            await pet.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Pet atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do pet` });
        }
    }

    static async excluirPet(req, res) {
        try {
            const id = req.params.id;
            await pet.findByIdAndDelete(id);
            res.status(200).json({ message: "Pet deletado com sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar pet` });
        }
    }
}

export default PetController;
