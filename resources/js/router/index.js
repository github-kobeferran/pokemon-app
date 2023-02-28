import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home/Index.vue";
import App from "../components/App.vue";
import PokemonIndex from "../components/Pokemon/Index.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import UserIndex from "../components/User/Index.vue";
import Profile from "../components/User/Profile.vue";

const routes = [
    {
        path: "/",
        name: "pokemonindex",
        component: PokemonIndex,
    },
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    {
        path: "/pokemons",
        name: "pokemons",
        component: PokemonIndex,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/users",
        name: "users",
        component: UserIndex,
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
