const actions = {
    async fetchPokemons({ commit }, payload) {
        commit("setLoading", true);

        const response = await axios.get(
            route("api.pokemons.index", {
                page: payload && payload.page ? payload.page : 1,
                search: payload && payload.search ? payload.search : "",
            })
        );

        const { data, links, ...rest } = response.data;


        commit("setPagination", rest);
        commit("setPokemons", data);
        commit("setLoading", false);
    },
    bindPokemon({ commit }, fields) {
        return new Promise((resolve, reject) => {
            commit("setLoading", true);

            axios
                .post(route("api.pokemon.bind"), fields)
                .then((response) => {
                    commit("auth/setUser", response.data.user, { root: true });
                    resolve(response);
                    commit("setLoading", false);
                })
                .catch((error) => {
                    console.log(error);
                    commit("setLoading", false);
                });
        });
    },
    unbindPokemon({ commit }, fields) {
        return new Promise((resolve, reject) => {
            commit("setLoading", true);
            axios
                .post(route("api.pokemon.unbind"), fields)
                .then((response) => {
                    commit("auth/setUser", response.data.user, { root: true });
                    resolve(response);
                    commit("setLoading", false);
                })
                .catch((error) => {
                    console.log(error);
                    commit("setLoading", false);
                });
        });
    },
};

export default actions;
