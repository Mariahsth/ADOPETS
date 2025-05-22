
import { atualizaPet, atualizarFavorito, cadastrarPet, excluirPet, listarPets } from "./api.js";
import { alteraVisibilidadeForm } from "./main.js";


export const renderPetsList = (pets) => {
  const petsListElement = document.getElementById('lista-pets');
  petsListElement.innerHTML = ''; // Limpa a lista antes de adicionar
  
  pets.forEach(pet => {
    const petElement = document.createElement('li');
    const petId = pet._id ? pet._id.toString() : '';  // Garantir que id esteja disponível e seja string
    petElement.setAttribute("id", petId);
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
      <p class="parametro-item-lista">Idade: </p><p>${pet.idade} anos</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Vacinado(a):</p><p> ${pet.vacinado}</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Castrado(a):</p><p> ${pet.castrado}</p>
      </div>
      <div class="linha">
      <p class="parametro-item-lista">Vermifugado(a): </p><p>${pet.vermifugado}</p>
      </div>
      <div >
        <img class="imagem_pet" src=${pet.imagem} alt=${pet.nome}>
      </div>
      <div class="comentarios-container">
        <p class="parametro-item-lista">Comentários:</p><p> ${pet.comentarios}</p>
      </div>
      <div class="div-botoes">
        <button class="botao_excluir">
          <img src="./assets/icone-excluir.png" class="botao_icone">
        </button>
          <p class="nome_botao"> Excluir </p>
        </button>
        <button class="botao_editar" data-id="${petId}" >
          <img src="./assets/icone-editar.png" class=botao_icone>
        </button>
          <p class="nome_botao"> Editar </p>
        </button>
        <button class="botao-favoritar">
          <img src=${pet.favorito? "./assets/favorite.png":"./assets/favorite_outline.png"} class="botao_icone">
        </button>
          <p class="nome_botao"> Favoritar </p>
        </button>
      </div>
    `;

    
    
    petsListElement.appendChild(petElement);

    const editarBtn = petElement.querySelector('.botao_editar');
    editarBtn.addEventListener('click', () => editarPets(pet));
    
    const excluirBtn = petElement.querySelector('.botao_excluir');
    excluirBtn.addEventListener('click', () => excluirPet(pet));
    
    const favoritarBtn = petElement.querySelector('.botao-favoritar');
    favoritarBtn.addEventListener('click', () => favoritarPet(pet));
    
  });
};

export const submeterFormulario = async (event) => {

  event.preventDefault();
  const form = document.getElementById('pet-form');
  const formData = new FormData(form); 

  try {
    await cadastrarPet(formData);
    alert('Pet adicionado com sucesso!');
    limparFormulario();
    const pets = await listarPets();
    renderPetsList(pets);
  } catch (error) {
    console.error("Erro ao cadastrar pet:", error);
  }
};


export function limparFormulario() {
  const botaoSalvar=document.getElementById("botao-salvar");
  botaoSalvar.innerText='Adicionar';
  document.getElementById('pet-form').reset();
  
}

export function editarPets(pet){
 
  const sectionForm = document.getElementById("form-container");
  const visivel = sectionForm.style.display === "flex";
  if (sectionForm.style.display = !visivel) {
    alteraVisibilidadeForm()
  }

  document.getElementById('pet-nome').value = pet.nome;
  document.getElementById('pet-especie').value = pet.especie;
  document.getElementById('pet-raca').value = pet.raca;
  document.getElementById('pet-sexo').value = pet.sexo;
  document.getElementById('pet-porte').value = pet.porte;
  document.getElementById('pet-idade').value = pet.idade;
  document.getElementById('pet-vacina').value = pet.vacinado;
  document.getElementById('pet-castracao').value = pet.castrado;
  document.getElementById('pet-vermifugo').value = pet.vermifugado;
  document.getElementById('pet-comentarios').value = pet.comentarios;
  document.getElementById("pet-form").scrollIntoView()

  const botaoAtualizar=document.getElementById("botao-salvar");
  botaoAtualizar.innerText='Atualizar';
  botaoAtualizar.onclick = (e) => atualizaPet(pet, e);
}


async function favoritarPet(pet){
  try {
    
      await atualizarFavorito(pet);
      const pets = await listarPets();
      renderPetsList(pets);
  } catch (error) {
      alert("Erro no botão favoritar")
  }

}