// api.js

const API_URL = "http://localhost:3000/pets"; 


export async function listarPets() {
  const response = await fetch(API_URL);  
  const pets = await response.json();
  if (!response.ok) throw new Error("Erro ao listar pets");
  return pets.map(pet => {
    pet.id = pet._id.toString();  
    return pet;
  });
}


export async function cadastrarPet(formData) {

  try {
    const response = await fetch('http://localhost:3000/pets', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar pet");
    }
    return await response.json();
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

export async function excluirPet(pet){

  try{
    const response = await fetch(`${API_URL}/${pet._id}`, {
      method: 'DELETE', 
      headers: {
          'Content-Type': 'application/json' 
      },
      body: JSON.stringify(pet)
  });
  const resultado=await response.json();
  
  if (!response.ok) {
      throw new Error('Erro ao excluir o pet');
  }
  
  alert('Pet excluido com sucesso!');
  location.reload();
  return resultado; 
  } catch (error) {
  alert('Erro ao excluir pet', error);
  console.error(error); 
  throw error; 
  }
}



export async function atualizaPet(pet) {
  try {
      const response = await fetch(`${API_URL}/${pet._id}`, {
          method: 'PUT', 
          headers: {
              'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
              nome: document.getElementById('pet-nome').value,
              especie: document.getElementById('pet-especie').value,
              raca: document.getElementById('pet-raca').value,
              sexo: document.getElementById('pet-sexo').value,
              porte: document.getElementById('pet-porte').value,
              idade: document.getElementById('pet-idade').value,
              vacinado: document.getElementById('pet-vacina').value,  
              castrado: document.getElementById('pet-castracao').value ,  
              vermifugado: document.getElementById('pet-vermifugo').value ,  
              comentarios: document.getElementById('pet-comentarios').value
          })
      });
      const updatedPet = await response.json();
      
      if (!response.ok) {
          throw new Error('Erro ao salvar o pet');
      }

      console.log(updatedPet); 
      alert('Pet atualizado com sucesso!');
      const botaoAdicionar=document.getElementById("botao-salvar");
      botaoAdicionar.innerText='Adicionar';
      location.reload();
      return updatedPet; 

  } catch (error) {
      alert('Erro ao editar pet', error);
      console.error(error); 
      throw error; 
  }
}
