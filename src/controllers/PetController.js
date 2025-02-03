import pet from "../models/Pets.js";

//controller vai ser uma classe e dentro terão vários métodos
class PetController {
    static async listarPets (req, res) {          //static pra não precisar instanciar a classe
        try {
            const listaPets=await pet.find({})      //.find é método do mongoose, vai buscar os dados usando o modelo pet
            res.status(200).json(listaPets);          //Manda tipo json para que o navegador consiga interpretar o objeto
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha na requisição`})
        }
    };

    static async listarPetPorId (req, res) {          
        try {
            const id=req.params.id;
            const petEncontrado=await pet.findById(id)      //.findById é método do mongoose, vai buscar os dados por ID
            res.status(200).json(petEncontrado);          
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha na requisição do pet`})
        }
    };

    static async cadastrarPet (req, res) {
        try {
            const novoPet=await pet.create(req.body)                    //create() é método do mongoose
            res.status(201).json({message: "criado com sucesso", pet: novoPet})
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar pet`})
        }
    };

    static async atualizarPet (req, res) {          
        try {
            const id=req.params.id;
            await pet.findByIdAndUpdate(id, req.body)      //.findByIdAndUpdate é método do mongoose, vai buscar os dados por ID e atualizar
            res.status(200).json({message: "pet atualizado"});          
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha na atualização do pet`})
        }
    };

    static async excluirPet (req, res) {
        try {
            const id=req.params.id;
            await pet.findByIdAndDelete(id)                 //.findByIdAndDelete é método do mongoose, vai buscar os dados por ID e deletar 
            res.status(200).json({message: "Pet deletado com sucesso"})
            
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao deletar pet`})
        }
    };
};

export default PetController;