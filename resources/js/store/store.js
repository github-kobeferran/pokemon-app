import { createStore } from "vuex";

import user from "./modules/user";
import pokemon from "./modules/pokemon";

const store = createStore({
    modules: {
        user,
        pokemon,
    },
});

export default store;
