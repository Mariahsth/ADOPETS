import api from "./api.js";

const ui = {

    async preencherFormulario(petId) {
        const pet= await api.buscandoDadosPorId(petId);
        document.getElementById("pet-id").value=pet.id;
        document.getElementById("pet-especie").value=pet.especie;
        document.getElementById("pet-nome").value=pet.nome;
        document.getElementById("pet-raca").value=pet.raca;
    },


    async renderizandoDadosPets (){
        const listaPets=document.getElementById("lista-pets");

        try{
            const dadosPets=await api.buscandoDados();
            dadosPets.forEach(ui.adicionarPetNaLista);

        } catch (error){
            console.error("Erro ao obter pets:", error);
            alert("Erro ao renderizar os dados dos pets")
        }
    },

    adicionarPetNaLista(pet) {
        const listaPets=document.getElementById("lista-pets");

        const li = document.createElement("li");
        li.setAttribute("data-id", pet.id);
        li.classList.add("lista-item-pet");
    
        const nomePet = document.createElement("div");
        nomePet.textContent = `Nome: ${pet.nome}`;
    
        const especiePet = document.createElement("div");
        especiePet.textContent = `Especie: ${pet.especie}`;
    
        const racaPet = document.createElement("div");
        racaPet.textContent = `Raça: ${pet.raca}`;

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar-excluir");
        botaoEditar.onclick = () => ui.preencherFormulario(pet.id);

        const iconeEditar=document.createElement("img")
        iconeEditar.src="./assets/icone-editar.png";
        iconeEditar.classList.add("icone-editar-excluir")
        botaoEditar.appendChild(iconeEditar);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-editar-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluirDadoPet(pet);
                ui.renderizandoDadosPets()
            } catch (error) {
                alert("Erro ao excluir dados do pet")
            }
        };

        const iconeExcluir=document.createElement("img")
        iconeExcluir.src="./assets/icone-excluir.png";
        iconeExcluir.classList.add("icone-editar-excluir")
        botaoExcluir.appendChild(iconeExcluir);

        const divBotoes=document.createElement("div")
        divBotoes.classList.add("div-botoes");
        divBotoes.appendChild(botaoEditar);
        divBotoes.appendChild(botaoExcluir);
    
        li.appendChild(nomePet);
        li.appendChild(especiePet);
        li.appendChild(racaPet);
        li.appendChild(divBotoes);
        listaPets.appendChild(li);
    },

    limparFormulario(){
        document.getElementById("pet-form").reset();
    }
}

export default ui;