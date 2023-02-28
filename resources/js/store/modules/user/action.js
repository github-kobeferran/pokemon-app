const actions = {
    async fetchUsers({ commit }, payload) {
        const response = await axios.get(
            route("api.users.index", {
                page: payload ? payload.page : 1,
            })
        );

        const { data, links, ...rest } = response.data;

        commit("setPagination", rest);
        commit("setUsers", data);
    },
    updateUser({ commit }, { id, fields }) {
        return new Promise((resolve, reject) => {
            axios
                .patch(route("api.users.update", id), fields)
                .then((response) => {
                    commit("auth/setUser", response.data, { root: true });
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    },

    // async fetchPokemons({ commit }, payload) {
    //     const response = await axios.get(
    //         route("api.pokemons.index", {
    //             page: payload ? payload.page : 1,
    //         })
    //     );

    //     const { data, links, ...rest } = response.data;

    //     commit("setPagination", rest);
    //     commit("setPokemons", data);
    // },
    // async fetchCurrentUser({ commit }) {
    //     const response = await axios.get("/api/user");
    //     commit("setCurrentUser", response.data);
    // },

    // async deleteUser({ dispatch }, userId) {
    //     await axios.delete(`/api/users/${userId}`);
    //     dispatch("fetchUsers");
    // },
};

export default actions;
