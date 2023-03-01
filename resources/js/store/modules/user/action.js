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
    async fetchCurrentUser({ commit }, id) {
        const response = await axios.get(route("api.users.show", id));

        commit("setCurrentUser", response.data.data);
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
    resetCurrentUser({ commit }) {
        commit("resetCurrentUser");
    },
};

export default actions;
