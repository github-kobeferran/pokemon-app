import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home/Index.vue";
import App from "../components/App.vue";
import PokemonIndex from "../components/Pokemon/Index.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";

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
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
