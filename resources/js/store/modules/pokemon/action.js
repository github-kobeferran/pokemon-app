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
    bindPokemon({ commit }, fields) {
        return new Promise((resolve, reject) => {
            axios
                .post(route("api.pokemon.bind"), fields)
                .then((response) => {
                    commit("auth/setUser", response.data.user, { root: true });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    },
    unbindPokemon({ commit }, fields) {
        return new Promise((resolve, reject) => {
            axios
                .post(route("api.pokemon.unbind"), fields)
                .then((response) => {
                    commit("auth/setUser", response.data.user, { root: true });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    },
};

export default actions;
