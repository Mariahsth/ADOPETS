// main.js

import { listarPetPorId, listarPets } from './api.js';
import { editarPets, limparFormulario, renderPetsList, submeterFormulario } from './ui.js';


// Função que vai renderizar os pets na interface
async function renderizarPets() {
  try {
    const pets = await listarPets();  // Chama a função que lista os pets
    renderPetsList(pets);  // Renderiza a lista de pets
  } catch (error) {
    console.error("Erro ao renderizar pets:", error);
  }
}

// Função que inicializa o carregamento dos pets e configura o formulário
function init() {
  renderizarPets();
  
  const form = document.getElementById("pet-form");
  form.addEventListener("submit", submeterFormulario);  // Adiciona o ouvinte de evento para o formulário

  const botaoCancelar=document.getElementById("botao-cancelar");
  botaoCancelar.addEventListener("click", limparFormulario);

  document.getElementById('lista-pets').addEventListener('click', async (event) => {
    const imgButton = event.target.parentElement; // Aqui buscamos o botão no pai do <img>
    const petId = imgButton.getAttribute('data-id');
    try {
      const pet = await listarPetPorId(petId);  // Chama a função de listar pet por ID
      editarPets(pet)
    } catch (error) {
      console.error("Erro ao buscar pet:", error);
    }
  });
  

}

init();
