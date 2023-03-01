import { createStore } from "vuex";

import user from "./modules/user";
import pokemon from "./modules/pokemon";
import auth from "./modules/auth";

import createPersistedState from "vuex-persistedstate";

const store = createStore({
    modules: {
        user,
        pokemon,
        auth,
    },
    plugins: [
        createPersistedState({
            key: "vuex",
            reducer(val) {
                if (val.auth.isAuthenticated === false) {
                    // val.user.token (your user token for example)
                    return {};
                }
                return val;
            },
        }),
    ],
});

export default store;
