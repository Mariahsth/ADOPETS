// main.js

import { listarPets } from './api.js';
import { limparFormulario, renderPetsList, submeterFormulario } from './ui.js';

let filtrarFavoritos = false;

const filtroFavoritosBtn = document.getElementById("filtro-favoritos");

filtroFavoritosBtn.addEventListener("click", () => {
  filtrarFavoritos = !filtrarFavoritos;
  filtroFavoritosBtn.classList.toggle("ativo");
  renderizarPets(); 
});

async function renderizarPets() {

  try {
    const pets = await listarPets();

    const petsFiltrados = filtrarFavoritos
      ? pets.filter((pet) => pet.favorito === true)
      : pets;

    renderPetsList(petsFiltrados);
  } catch (error) {
    console.error("Erro ao renderizar pets:", error);
  }
  
}




function init() {
  renderizarPets();

  const botaoDisplayForm = document.getElementById("toggleFormBtn");
  const sectionForm = document.getElementById("form-container");

  botaoDisplayForm.addEventListener("click", () => {
  alteraVisibilidadeForm()
  });


  const botaoSalvar=document.getElementById("botao-salvar");
  botaoSalvar.addEventListener("click", (e) => {
    if (botaoSalvar.innerText === 'Adicionar') {
      submeterFormulario(e);
    } 
  });
  const botaoCancelar=document.getElementById("botao-cancelar");
  botaoCancelar.addEventListener("click", () =>{
    limparFormulario
    location.reload();
  });




}

export function alteraVisibilidadeForm(){
  const botaoDisplayForm = document.getElementById("toggleFormBtn");
  const sectionForm = document.getElementById("form-container");
  const visivel = sectionForm.style.display === "flex";
  sectionForm.style.display = visivel ? "none" : "flex";
  botaoDisplayForm.textContent = visivel ? "˅ Cadastrar novo animal" : "^ Ocultar formulário";
}



init();
