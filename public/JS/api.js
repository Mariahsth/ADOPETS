// api.js

const API_URL = "http://localhost:3000/pets"; // URL da API no servidor local

// Função para listar todos os pets
export async function listarPets() {
  const response = await fetch(API_URL);  // Faz a requisição GET para listar os pets
  if (!response.ok) throw new Error("Erro ao listar pets");
  return await response.json();  // Retorna os pets como um array de objetos
}

// Função para cadastrar um novo pet
export async function cadastrarPet(pet) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pet),  // Envia os dados do pet para o back-end
  });

  if (!response.ok) throw new Error("Erro ao cadastrar pet");
  return await response.json();
}
