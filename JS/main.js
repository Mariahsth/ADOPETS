import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", ()=>{
    ui.renderizandoDadosPets();

    const formularioPet=document.getElementById("pet-form");
    formularioPet.addEventListener("submit", manipularSubmissaoFormulario);

    const botaoCancelar=document.getElementById("botao-cancelar");
    botaoCancelar.addEventListener("click", manipularCancelamento)
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id=document.getElementById("pet-id").value;
    const especie=document.getElementById("pet-especie").value;
    const nome=document.getElementById("pet-nome").value;
    const raca=document.getElementById("pet-raca").value;

    try{
        if (id){
            await api.editarDadoPet({id, especie, nome, raca})
        } else {
            await api.salvandoDadosPet({especie, nome, raca});
        }
        ui.renderizandoDadosPets();

    } catch (error) {
        console.error("Erro ao salvar pet:", error);
        alert("Erro ao salvar pet. Tente novamente mais tarde.");
    }
    
}

function manipularCancelamento() {
    ui.limparFormulario();
}