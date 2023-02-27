const actions = {
    async fetchPokemons({ commit }) {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?");
        commit("setPokemons", response.data.results);
    },
    async fetchPokemonBackground({ commit }, id) {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        console.log(response, "asdfasdf");
        // const response = await axios.get(
        //     `https://pokeapi.co/api/v2/pokemon/${payload}`
        // );
        // commit("setPokemons", response.data.results);
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
