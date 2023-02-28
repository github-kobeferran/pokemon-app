import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home/Index.vue";
import App from "../components/App.vue";
import PokemonIndex from "../components/Pokemon/Index.vue";

const routes = [
    {
        path: "/",
        name: "PokemonIndex",
        component: PokemonIndex,
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/pokemons",
        name: "Pokemons",
        component: PokemonIndex,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
