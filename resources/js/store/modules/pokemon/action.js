const actions = {
    async fetchpokemons({ commit }) {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?");
        console.log(response);
        // commit("setpokemons", response.data);
    },
    async fetchCurrentpokemon({ commit }) {
        const response = await axios.get("/api/pokemon");
        commit("setCurrentpokemon", response.data);
    },
    async updatepokemon({ commit }, pokemonData) {
        const response = await axios.put(
            `/api/pokemons/${pokemonData.id}`,
            pokemonData
        );
        commit("setCurrentpokemon", response.data);
    },
    async deletepokemon({ dispatch }, pokemonId) {
        await axios.delete(`/api/pokemons/${pokemonId}`);
        dispatch("fetchpokemons");
    },
};

export default actions;
