import actions from "./action";
import getters from "./getters.js";
import mutations from "./mutations.js";

const state = {
    users: [],
    currentUser: null,
};

export default {
    state,
    actions,
    getters,
    mutations,
};

// const actions = {
//     async fetchUsers({ commit }) {
//         const response = await axios.get("/api/users");
//         commit("setUsers", response.data);
//     },
//     async fetchCurrentUser({ commit }) {
//         const response = await axios.get("/api/user");
//         commit("setCurrentUser", response.data);
//     },
//     async updateUser({ commit }, userData) {
//         const response = await axios.put(`/api/users/${userData.id}`, userData);
//         commit("setCurrentUser", response.data);
//     },
//     async deleteUser({ dispatch }, userId) {
//         await axios.delete(`/api/users/${userId}`);
//         dispatch("fetchUsers");
//     },
// };

// export default {
//     state,
//     getters,
//     mutations,
//     actions,
// };
