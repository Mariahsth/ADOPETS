// api.js

const API_URL = "https://adopets-ndrs.onrender.com/pets"; 


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
    const response = await fetch(API_URL, {
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



export async function atualizaPet(pet, e) {
  e.preventDefault()
  try {
      const formData = new FormData();

      formData.append("nome", document.getElementById("pet-nome").value);
      formData.append("especie", document.getElementById("pet-especie").value);
      formData.append("raca", document.getElementById("pet-raca").value);
      formData.append("sexo", document.getElementById("pet-sexo").value);
      formData.append("porte", document.getElementById("pet-porte").value);
      formData.append("idade", document.getElementById("pet-idade").value);
      formData.append("vacinado", document.getElementById("pet-vacina").value);
      formData.append("castrado", document.getElementById("pet-castracao").value);
      formData.append("vermifugado", document.getElementById("pet-vermifugo").value);
      formData.append("comentarios", document.getElementById("pet-comentarios").value);

      const imagemInput = document.getElementById("imagem");
      if (imagemInput.files.length > 0) {
        formData.append("imagem", imagemInput.files[0]);
      }

      const response = await fetch(`${API_URL}/${pet._id}`, {
          method: 'PUT', 
          body: formData
      });
      const updatedPet = await response.json();
      
      if (!response.ok) {
          throw new Error('Erro ao salvar o pet');
      }
      console.log(updatedPet)

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
