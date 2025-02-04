
// ui.js

import { atualizaPet, cadastrarPet } from "./api.js";


const booleanToSimNao = (value) => value ? "Sim" : "Não";
const simNaoToBoolean = (value) => value.toLowerCase() == "sim" ? true : false;


// Função para renderizar a lista de pets
export const renderPetsList = (pets) => {
  const petsListElement = document.getElementById('lista-pets');
  petsListElement.innerHTML = ''; // Limpa a lista antes de adicionar
  
  pets.forEach(pet => {
    const petElement = document.createElement('li');
    const petId = pet._id ? pet._id.toString() : '';  // Garantir que id esteja disponível e seja string
    petElement.setAttribute("id", petId);
    petElement.classList.add('lista-item-pet');
    console.log(pet);
    console.log(petId)

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
      <p class="parametro-item-lista">Idade: </p><p>${pet.idade} anos</p>
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
      <div >
        <img class="imagem_pet" src="${pet.imagem}" alt="imagem do pet">
      </div>
      <div class="comentarios-container">
        <p class="parametro-item-lista">Comentários:</p><p> ${pet.comentarios}</p>
      </div>
      <div class="div-botoes">
        <button class="botao_excluir">
          <img src="./assets/icone-excluir.png" class="botao-editar-excluir">
        </button>
          Excluir
        </button>
        <button class="botao_editar" data-id="${petId}">
          <img src="./assets/icone-editar.png">
        </button>
          Editar
        </button>
        <button class="botao-favoritar" id="botao_favoritar">
          <img src="./assets/favorite_outline.png" class="botao-favoritar">
        </button>
          Favoritar
        </button>
      </div>
    `;
    petsListElement.appendChild(petElement);
  });
};

export const submeterFormulario = async (event) => {
  event.preventDefault();
  
  const form = document.getElementById('pet-form');
  const formData = new FormData(form);  // Usando FormData diretamente do formulário

  // Captura a imagem do formulário
  const imagemFile = document.getElementById('imagem').files[0];

  // Crie um objeto pet com os outros dados do formulário
  const pet = {
    nome: formData.get('nome'),
    especie: formData.get('especie'),
    raca: formData.get('raca'),
    sexo: formData.get('sexo'),
    porte: formData.get('porte'),
    idade: formData.get('idade'),
    vacinado: simNaoToBoolean(formData.get('vacinado')),
    castrado: simNaoToBoolean(formData.get('castrado')),
    vermifugado: simNaoToBoolean(formData.get('vermifugado')),
    comentarios: formData.get('comentarios')
  };

  // Envia os dados para o back-end
  try {
    await cadastrarPet(pet, imagemFile);  // Passa tanto o objeto pet quanto a imagem
    alert('Pet adicionado com sucesso!');
    limparFormulario();
    location.reload();
  } catch (error) {
    alert(error.message);
  }
};





export function limparFormulario() {
  document.getElementById('pet-form').reset();
}

export function editarPets(pet){
  document.getElementById('pet-nome').value = pet.nome;
  document.getElementById('pet-especie').value = pet.especie;
  document.getElementById('pet-raca').value = pet.raca;
  document.getElementById('pet-sexo').value = pet.sexo;
  document.getElementById('pet-porte').value = pet.porte;
  document.getElementById('pet-idade').value = pet.idade;
  document.getElementById('pet-vacina').value = pet.vacina  ? 'Sim' : 'Não';
  document.getElementById('pet-castracao').value = pet.castracao ? 'Sim' : 'Não';;
  document.getElementById('pet-vermifugo').value = pet.vermifugo ? 'Sim' : 'Não';;
  document.getElementById('pet-comentarios').value = pet.comentarios;
  document.getElementById("pet-form").scrollIntoView()

  const botaoAtualizar=document.getElementById("botao-salvar");
  botaoAtualizar.innerText='Atualizar';
  botaoAtualizar.onclick = () => atualizaPet(pet);
 
  

}


