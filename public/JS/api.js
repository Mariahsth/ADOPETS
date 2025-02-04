// api.js

const API_URL = "http://localhost:3000/pets"; // URL da API no servidor local

// Função para listar todos os pets
export async function listarPets() {
  const response = await fetch(API_URL);  // Faz a requisição GET para listar os pets
  const pets = await response.json();
  if (!response.ok) throw new Error("Erro ao listar pets");
  return pets.map(pet => {
    pet.id = pet._id.toString();  // Converte ObjectId para string, se necessário
    return pet;
  });
}

export async function cadastrarPet(pet, imagemFile) {
  const formData = new FormData();  // Cria um novo FormData para enviar dados de texto e arquivos
  // Adiciona os dados do pet (nome, etc.)
  formData.append("nome", pet.nome);
  formData.append("especie", pet.especie);
  formData.append("raca", pet.raca);
  formData.append("sexo", pet.sexo);
  formData.append("porte", pet.porte);
  formData.append("idade", pet.idade);
  formData.append("vacinado", pet.vacinado);
  formData.append("castrado", pet.castrado);
  formData.append("vermifugado", pet.vermifugado);
  formData.append("comentarios", pet.comentarios);
  // Adiciona a imagem ao FormData, se fornecida
  if (imagemFile) {
    formData.append("imagem", imagemFile);  // 'imagem' é o nome do campo que você espera no back-end
  }
  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,  // Envia o FormData no corpo da requisição
  });

  if (!response.ok) throw new Error("Erro ao cadastrar pet");
  return await response.json();  // Retorna a resposta do servidor
}

export async function listarPetPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);  // Faz a requisição GET para listar o pet pelo ID
  if (!response.ok) throw new Error("Erro ao listar pet por ID");
  return await response.json();
}

export async function atualizaPet(pet){
  
  try {
      const response = await fetch(`${API_URL}/${pet.id}`, {
          ...pet,
          nome:document.getElementById('pet-nome').value,
          especie:document.getElementById('pet-especie').value,
          raca:document.getElementById('pet-raca').value,
          sexo:document.getElementById('pet-sexo').value,
          porte:document.getElementById('pet-porte').value,
          idade:document.getElementById('pet-idade').value,
          vacina:document.getElementById('pet-vacina').value,
          castracao:document.getElementById('pet-castracao').value,
          vermifugo:document.getElementById('pet-vermifugo').value,
          comentarios:document.getElementById('pet-comentarios').value,
        });
        console.log(response);
        console.log(pet)
      return await response;
  }
  catch {
      alert('Erro ao salvar pensamentos')
      throw error
  }


}
