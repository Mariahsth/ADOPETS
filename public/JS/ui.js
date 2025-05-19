
import { atualizaPet, cadastrarPet } from "./api.js";


const booleanToSimNao = (value) => value ? "Sim" : "Não";
const simNaoToBoolean = (value) => value.toLowerCase() == "sim" ? true : false;
const backendURL = "http://localhost:3000";

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
        <img class="imagem_pet" src=${backendURL}${pet.imagem} alt="imagem do pet">
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

export const submeterFormulario = async () => {
  const formData = new FormData(document.getElementById("pet-form"));
  const novoPet = {
    nome: formData.get("nome"),
    especie: formData.get("especie"),
    raca: formData.get("raca"),
    sexo: formData.get("sexo"),
    porte: formData.get("porte"),
    idade: formData.get("idade"),
    vacinado: formData.get("vacinado"),
    castrado: formData.get("castrado"),
    vermifugado: formData.get("vermifugado"),
    comentarios: formData.get("comentarios"),
    imagem: formData.get("imagem"),
  };

  try {
    await cadastrarPet(novoPet);
    limparFormulario();
    const pets = await listarPets();
    renderPetsList(pets);
  } catch (error) {
    console.error("Erro ao cadastrar pet:", error);
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
  document.getElementById('pet-vacina').value = pet.vacinado  ? 'Sim' : 'Não';
  document.getElementById('pet-castracao').value = pet.castrado ? 'Sim' : 'Não';;
  document.getElementById('pet-vermifugo').value = pet.vermifugado ? 'Sim' : 'Não';;
  document.getElementById('pet-comentarios').value = pet.comentarios;
  document.getElementById("pet-form").scrollIntoView()

  const botaoAtualizar=document.getElementById("botao-salvar");
  botaoAtualizar.innerText='Atualizar';
  botaoAtualizar.onclick = () => atualizaPet(pet);
 
  

}


