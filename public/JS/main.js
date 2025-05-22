// main.js

import { listarPets } from './api.js';
import { limparFormulario, renderPetsList, submeterFormulario } from './ui.js';


async function renderizarPets() {
  try {
    const pets = await listarPets();  
    renderPetsList(pets);  
  } catch (error) {
    console.error("Erro ao renderizar pets:", error);
  }
}

function init() {
  renderizarPets();

  const botaoDisplayForm = document.getElementById("toggleFormBtn");
  const sectionForm = document.getElementById("form-container");

  botaoDisplayForm.addEventListener("click", () => {
    const visivel = sectionForm.style.display === "flex";
    sectionForm.style.display = visivel ? "none" : "flex";
    botaoDisplayForm.textContent = visivel ? "˅ Cadastrar novo animal" : "^ Ocultar formulário";
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



init();
