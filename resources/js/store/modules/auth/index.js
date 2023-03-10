import { ElNotification } from "element-plus";

const state = {
    isAuthenticated: false,
    user: null,
};

const getters = {
    getIsAuthenticated: (state) => state.isAuthenticated,
    getUser: (state) => state.user,
};

const mutations = {
    setIsAuthenticated(state, value) {
        state.isAuthenticated = value;
    },
    setUser(state, value) {
        state.user = value;
    },
    resetAuthUser(state) {
        state.user = null;
    },
    resetIsAuthenticated(state) {
        state.isAuthenticated = false;
    },
};

const actions = {
    register({ commit }, fields) {
        return new Promise((resolve, reject) => {
            axios
                .post(route("api.register"), fields)
                .then((response) => {
                    commit("setIsAuthenticated", true);
                    commit("setUser", response.data.user);
                    localStorage.setItem("token", response.data.token);

                    const token = localStorage.getItem("token");
                    window.axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${token}`;

                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    login({ commit }, credentials) {
        return new Promise((resolve, reject) => {
            axios
                .post(route("api.login"), credentials)
                .then((response) => {
                    commit("setIsAuthenticated", true);
                    commit("setUser", response.data.user);

                    localStorage.setItem("token", response.data.token);

                    window.axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${response.data.token}`;

                    ElNotification({
                        title: "Logged in!",
                        type: "success",
                    });

                    resolve(response);
                })
                .catch((error) => {
                    ElNotification({
                        title: "Login Failed",
                        message: error.response.data.message,
                        type: "error",
                    });
                    reject(error);
                });
        });
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .post(route("api.logout"))
                .then((response) => {
                    ElNotification({
                        message: "Logged out",
                        position: "top-left",
                    });
                    commit("setIsAuthenticated", false);
                    commit("setUser", null);
                    commit("user/resetState", {}, { root: true });
                    localStorage.removeItem("token");
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    // ElNotification({
                    //     title: "Error logging out",
                    //     message: error.response.data.message,
                    //     type: "error",
                    // });

                    reject(error);
                });
        });
    },
    loginWithToken({ commit }, token) {
        return new Promise((resolve, reject) => {
            axios
                .post(route("api.login-with-token"), { token })
                .then((response) => {
                    if (response.data.user) {
                        commit("setIsAuthenticated", true);
                        commit("setUser", response.data.user);

                        resolve(response);
                    }
                })
                .catch((error) => {
                    console.log(error, "haserror on loginwithtoken");
                    // localStorage.removeItem("token");
                });
        });
    },
    resetAuthUser({ commit }) {
        commit("resetAuthUser");
    },
    resetIsAuthenticated({ commit }) {
        commit("resetIsAuthenticated");
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
