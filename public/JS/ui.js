import { cadastrarPet } from "./api.js";


// ui.js
const booleanToSimNao = (value) => value ? "Sim" : "Não";
const simNaoToBoolean = (value) => value.toLowerCase() == "sim" ? true : false;


// Função para renderizar a lista de pets
export const renderPetsList = (pets) => {
  const petsListElement = document.getElementById('lista-pets');
  petsListElement.innerHTML = ''; // Limpa a lista antes de adicionar
  
  pets.forEach(pet => {
    const petElement = document.createElement('li');
    petElement.setAttribute("data-id", pet.id);
    petElement.classList.add('lista-item-pet');

    petElement.innerHTML = `
      <h3>${pet.nome}</h3>
      <div class="linha">
      <p class="parametro-item-lista">Espécie: </p><p> ${pet.especie}</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Raça: </p><p> ${pet.raca}</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Sexo: </p><p>${pet.sexo}</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Porte:</p><p> ${pet.porte}</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Idade: </p><p>${pet.idade}</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Vacinado(a):</p><p> ${booleanToSimNao(pet.vacinado)}</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Castrado(a):</p><p> ${booleanToSimNao(pet.castrado)}</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Vermifugado(a): </p><p>${booleanToSimNao(pet.vermifugado)}</p>
      </div>
      <div class="comentarios-container">
        <p class="parametro-item-lista">Comentários:</p><p> ${pet.comentarios}</p>
      </div>
      <div class="div-botoes">
        <button class="botao-editar-excluir"><img src="./assets/icone-excluir.png" class="botao-editar-excluir"></button>Excluir</button>
        <button class="botao-editar-excluir"><img src="./assets/icone-editar.png" class="botao-editar-excluir"></button>Editar</button>
        <button class="botao-favoritar"><img src="./assets/favorite_outline.png" class="botao-favoritar"></button>Favoritar</button>
      </div>
    `;
    petsListElement.appendChild(petElement);
  });
};

// Função para lidar com o envio do formulário
export const submeterFormulario = async (event) => {
  event.preventDefault();
  const nome = document.getElementById('pet-nome').value;
  const especie = document.getElementById('pet-especie').value;
  const raca = document.getElementById('pet-raca').value;
  const sexo = document.getElementById('pet-sexo').value;
  const porte = document.getElementById('pet-porte').value;
  const idade = document.getElementById('pet-idade').value;
  const vacinado = simNaoToBoolean(document.getElementById('pet-vacina').value);
  const castrado = simNaoToBoolean(document.getElementById('pet-castracao').value);
  const vermifugado = simNaoToBoolean(document.getElementById('pet-vermifugo').value);
  const comentarios = document.getElementById('pet-comentarios').value;

  const petData = { nome, especie, raca, sexo, porte, idade, vacinado, castrado, vermifugado, comentarios };
  console.log(petData);
  // Adicionar o pet à lista
  await cadastrarPet(petData)
  .then(newPet => {
    alert('Pet adicionado com sucesso!');
    limparFormulario();
    // Recarregar a página
    location.reload();
  })
  .catch(error => {
    alert(error.message);
  });
  
};

export function limparFormulario() {
  document.getElementById('pet-form').reset();
}

