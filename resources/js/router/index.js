import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home/Index.vue";
import App from "../components/App.vue";
import PokemonIndex from "../components/Pokemon/Index.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import UserIndex from "../components/User/Index.vue";
import Profile from "../components/User/Profile.vue";

import store from "../store/store";

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
        meta: {
            hideForAuth: true,
        },
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            hideForAuth: true,
        },
    },
    {
        path: "/users",
        name: "users",
        component: UserIndex,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
    const requiresGuest = to.matched.some((x) => x.meta.hideForAuth);
    const isLoggedin = store.getters["auth/getIsAuthenticated"];

    if (requiresAuth && !isLoggedin) {
        next({ name: "login" });
    } else if (requiresGuest && isLoggedin) {
        next("/");
    } else {
        next();
    }
});

export default router;
