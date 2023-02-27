import actions from "./action";
import getters from "./getters.js";
import mutations from "./mutations.js";

const state = {
    pokemons: [],
    currentpokemon: null,
};

export default {
    state,
    getters,
    mutations,
    actions,
};
