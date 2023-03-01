const actions = {
    async fetchPokemons({ commit }, payload) {
        const response = await axios.get(
            route("api.pokemons.index", {
                page: payload ? payload.page : 1,
            })
        );

        const { data, links, ...rest } = response.data;

        commit("setPagination", rest);
        commit("setPokemons", data);
    },
    // async unfavorite({ commit }, id) {
    //     const response = await axios.get(
    //         route("api.pokemons.index", {
    //             page: payload ? payload.page : 1,
    //         })
    //     );

    //     const { data, links, ...rest } = response.data;

    //     commit("setPagination", rest);
    //     commit("setPokemons", data);
    // },

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
