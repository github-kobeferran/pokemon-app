import { createStore } from "vuex";

import user from "./modules/user";
import pokemon from "./modules/pokemon";
import auth from "./modules/auth";

const store = createStore({
    modules: {
        user,
        pokemon,
        auth,
    },
});

export default store;
