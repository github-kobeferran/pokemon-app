const mutations = {
    setPokemons(state, pokemons) {
        state.pokemons = pokemons;
    },
    setCurrentpokemon(state, pokemon) {
        state.currentPokemon = pokemon;
    },
    setPagination(state, pagination) {
        state.pagination = pagination;
    },
};

export default mutations;
