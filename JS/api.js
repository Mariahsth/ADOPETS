const URL_BASE="http://localhost:3000"

const api= {
    async buscandoDados() {

        try{
            const resolve=await axios.get(`${URL_BASE}/pets`);
            return await resolve.data;

        } catch {
            alert("Erro ao buscar os dados dos Pets")
            throw error

        }
    },
    async salvandoDadosPet(pet) {

        try{
            const resolve=await axios.post(`${URL_BASE}/pets`, pet);
            return await resolve.data;

        } catch {
            alert("Erro ao salvar os dados dos Pets")
            throw error

        }
    },

    async buscandoDadosPorId(id){
        try{
            const resolve=await axios.get(`${URL_BASE}/pets/${id}`);
            return await resolve.data;

        } catch {
            alert("Erro ao buscar os dados dos Pets")
            throw error

        }
    },


    async editarDadoPet(pet) {
        try{
            const resolve=await axios.put(`${URL_BASE}/pets/${pet.id}`, pet);
            return await resolve.data;

        } catch {
            alert("Erro ao salvar os dados dos Pets")
            throw error

        }
    },

    async excluirDadoPet(pet) {
        try{
            await axios.delete(`${URL_BASE}/pets/${pet.id}`);
        } catch (error){
            alert("Erro ao excluir os dados do Pet")
            throw error
        }
    }
}

export default api