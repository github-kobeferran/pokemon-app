const actions = {
    async fetchPokemons({ commit }) {
        const response = await axios.get(route("api.pokemons.index"));

        commit("setPokemons", response.data.results);
    },

    // async fetchCurrentPokemon({ commit }) {
    //     const response = await axios.get("/api/pokemon");
    //     commit("setCurrentpokemon", response.data);
    // },
    // async updatePokemon({ commit }, pokemonData) {
    //     const response = await axios.put(
    //         `/api/pokemons/${pokemonData.id}`,
    //         pokemonData
    //     );
    //     commit("setCurrentpokemon", response.data);
    // },
    // async deletePokemon({ dispatch }, pokemonId) {
    //     await axios.delete(`/api/pokemons/${pokemonId}`);
    //     dispatch("fetchPokemons");
    // },
};

export default actions;
