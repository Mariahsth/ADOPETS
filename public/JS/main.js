import { listarPets } from './api.js';
import { limparFormulario, renderPetsList, submeterFormulario } from './ui.js';

let filtrarFavoritos = false;

const filtroFavoritosBtn = document.getElementById("filtro-favoritos");

if (filtroFavoritosBtn) {
  filtroFavoritosBtn.addEventListener("click", () => {
    filtrarFavoritos = !filtrarFavoritos;
    filtroFavoritosBtn.classList.toggle("ativo");
    renderizarPets(); 
  });
}

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

  const botaoSalvar = document.getElementById("botao-salvar");
  if (botaoSalvar) {
    botaoSalvar.addEventListener("click", (e) => {
      if (botaoSalvar.innerText === 'Adicionar') {
        submeterFormulario(e);
      } 
    });
  }
  
  const botaoCancelar = document.getElementById("botao-cancelar");
  if (botaoCancelar) {
    botaoCancelar.addEventListener("click", () => {
      limparFormulario(); 
      location.reload();
    });
  }




}




init();


const swiper = new Swiper('.swiper', {
  loop: true, // Faz o carrossel rodar em loop infinito
  autoplay: {
    delay: 5000, // 5 segundos
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});