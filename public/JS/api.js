// api.js

const API_URL = "http://localhost:3000/pets"; // URL da API no servidor local

function simNaoToBoolean(valor) {
  return valor == 'Sim'; // Se for 'Sim', retorna true, senão false
}

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
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
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

  try {
    await fetch('http://localhost:3000/pets', {
      method: 'POST',
      body: formData
    });

    alert('Pet adicionado com sucesso!');
    form.reset();
    location.reload();

  } catch (error) {
    console.error('Erro ao cadastrar pet:', error);
    alert(error.message);
  }
};


export async function listarPetPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);  // Faz a requisição GET para listar o pet pelo ID
  if (!response.ok) throw new Error("Erro ao listar pet por ID");
  return await response.json();
}


export async function atualizaPet(pet) {
  try {
      const response = await fetch(`${API_URL}/${pet._id}`, {
          method: 'PUT', // Método PUT para edição
          headers: {
              'Content-Type': 'application/json' // Tipo de conteúdo
          },
          body: JSON.stringify({
              nome: document.getElementById('pet-nome').value,
              especie: document.getElementById('pet-especie').value,
              raca: document.getElementById('pet-raca').value,
              sexo: document.getElementById('pet-sexo').value,
              porte: document.getElementById('pet-porte').value,
              idade: document.getElementById('pet-idade').value,
              vacinado: simNaoToBoolean(document.getElementById('pet-vacina').value),  // Caso seja 'Sim' ou 'Não', converte para booleano
              castrado: simNaoToBoolean(document.getElementById('pet-castracao').value) ,  // Mesma coisa para castração
              vermifugado: simNaoToBoolean(document.getElementById('pet-vermifugo').value) ,  // Mesma coisa para vermífugo
              comentarios: document.getElementById('pet-comentarios').value
          })
      });
      // Verifica se a resposta foi bem-sucedida
      
      if (!response.ok) {
          throw new Error('Erro ao salvar o pet');
      }

      // Resposta bem-sucedida
      const updatedPet = await response.json();
      console.log(updatedPet); // Pode imprimir para verificar os dados retornados
      alert('Pet atualizado com sucesso!');
      const botaoAdicionar=document.getElementById("botao-salvar");
      botaoAdicionar.innerText='Adicionar';
      location.reload();
      return updatedPet; // Retorna o pet atualizado

  } catch (error) {
      alert('Erro ao editar pet');
      console.error(error); // Adiciona o log de erro para debug
      throw error; // Relança o erro para que ele seja tratado posteriormente
  }
}
