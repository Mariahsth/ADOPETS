//PetController.js
import path from 'path';
import pet from "../models/Pets.js";

//controller vai ser uma classe e dentro terão vários métodos
class PetController {
    static async listarPets (req, res) {          //static pra não precisar instanciar a classe
        try {
            const listaPets=await pet.find({})      //.find é método do mongoose, vai buscar os dados usando o modelo pet
            // Para cada pet, ajusta o caminho da imagem
            const petsWithImageUrls = listaPets.map(pet => ({
                ...pet.toObject(),
                imagem: `/uploads/${pet.imagem}` // Caminho da imagem no servidor
            }));
            res.status(200).json(petsWithImageUrls);  // Manda a lista com os links das imagens
            // res.status(200).json(listaPets);          //Manda tipo json para que o navegador consiga interpretar o objeto
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

   

    static async cadastrarPet(req, res) {
        try {
            // Desestrutura os campos da requisição
            const { nome, especie, raca, sexo, porte, idade, vacinado, castrado, vermifugado, comentarios } = req.body;
            const imagem = req.file ? req.file.filename : null;  // A imagem deve ser acessada com req.file.filename
    
            // Converte os campos "Sim"/"Não" para booleanos (true/false)
            const vacinadoBoolean = vacinado === 'Sim';
            const castradoBoolean = castrado === 'Sim';
            const vermifugadoBoolean = vermifugado === 'Sim';
    
            // Cria um novo pet no banco de dados
            const novoPet = await pet.create({
                nome,
                especie,
                raca,
                sexo,
                porte,
                idade,
                vacinado: vacinadoBoolean,   // Agora será um booleano
                castrado: castradoBoolean,   // Agora será um booleano
                vermifugado: vermifugadoBoolean, // Agora será um booleano
                comentarios,
                imagem,  // Salva o nome do arquivo da imagem
            });
    
            // Retorna o novo pet como resposta
            res.status(201).json(novoPet);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao cadastrar pet' });
        }
    }
    
      
    static async atualizarPet(req, res) {
        try {
            const id = req.params.id;
            const { vacinado, castrado, vermifugado } = req.body;
    
            // Converte os valores "Sim"/"Não" para booleanos
            req.body.vacinado = vacinado === 'Sim';
            req.body.castrado = castrado === 'Sim';
            req.body.vermifugado = vermifugado === 'Sim';
    
            // Atualiza o pet no banco de dados
            await pet.findByIdAndUpdate(id, req.body);
    
            res.status(200).json({ message: "Pet atualizado" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na atualização do pet` });
        }
    }

    static async excluirPet (req, res) {
        try {
            const id=req.params.id;
            await pet.findByIdAndDelete(id)                 //.findByIdAndDelete é método do mongoose, vai buscar os dados por ID e deletar 
            res.status(200).json({message: "Pet deletado com sucesso"})
            
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao deletar pet`})
        }
    };

    static async exibirImagemPet(req, res) {
        console.log("Função exibirImagemPet chamada");
        try {
            const pet = await pet.findById(req.params.id);  // Busca o pet pelo ID
            if (!pet || !pet.imagem) {
                return res.status(404).json({ message: 'Imagem não encontrada para este pet' });
            }
    
            // Caminho da imagem no servidor
            const imagemPath = path.join(__dirname, '..', 'uploads', pet.imagem);
            console.log("Caminho da imagem:", imagemPath);
            res.sendFile(imagemPath);  // Envia a imagem diretamente
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao exibir imagem` });
        }
    }
};

export default PetController;