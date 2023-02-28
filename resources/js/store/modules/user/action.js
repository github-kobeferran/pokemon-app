const actions = {
    async fetchUsers({ commit }, payload) {
        const response = await axios.get(
            route("api.users.index", {
                page: payload ? payload.page : 1,
            })
        );

        const { data, links, ...rest } = response.data;

        console.log();

        commit("setPagination", rest);
        commit("setUsers", data);
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
    async fetchCurrentUser({ commit }) {
        const response = await axios.get("/api/user");
        commit("setCurrentUser", response.data);
    },
    async updateUser({ commit }, userData) {
        const response = await axios.put(`/api/users/${userData.id}`, userData);
        commit("setCurrentUser", response.data);
    },
    async deleteUser({ dispatch }, userId) {
        await axios.delete(`/api/users/${userId}`);
        dispatch("fetchUsers");
    },
};

export default actions;
