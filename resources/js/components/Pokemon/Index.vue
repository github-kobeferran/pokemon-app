<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col text-center">
                <h1>{{ pageTitle }}</h1>
            </div>
        </div>

        <!-- <Ball/> -->

        <el-pagination
            class="justify-content-center"
            :page-size="20"
            layout="prev, pager, next"
            :page-count="pagination.last_page"
            :current-page="pagination.current_page"
            @current-change="pageChanged"
        />

        <div class="container-fluid d-flex flex-wrap justify-content-center">
            <div class="card m-3" v-for="pokemon in pokemons" :key="pokemon.id">
                <img
                    :src="pokemon.cover_image"
                    :alt="`photo of ${pokemon.name}`"
                />
                <div class="card-body">
                    <p class="card-text text-center">
                        {{ pokemon.name }}
                    </p>
                </div>

                <div class="d-flex justify-content-around pb-2">
                    <span v-if="isAuth" class="like-buttons">
                        <svg
                            v-if="hatedPokemons.includes(pokemon.id)"
                            class="active-actions"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="15"
                            height="15"
                            @click="unbind(pokemon.id)"
                        >
                            <path
                                fill="#333"
                                d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"
                            />
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="15"
                            height="15"
                            class="inactive-actions"
                            :class="{
                                'd-none' : hatedPokemons.length > 2
                            }"
                            @click="bind(pokemon.id, 'hated')"
                        >
                            <path
                                d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16H286.5c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8H384c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H32z"
                            />
                        </svg>
                    </span>
                    <span v-if="isAuth" class="like-buttons">
                        <svg
                            v-if="likedPokemons.includes(pokemon.id)"
                            class="active-actions"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="15"
                            height="15"
                            @click="unbind(pokemon.id)"
                        >
                            <path
                                fill="#3b5998"
                                d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"
                            />
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="15"
                            height="15"
                            class="inactive-actions"
                             :class="{
                                'd-none' : likedPokemons.length > 2
                            }"
                            @click="bind(pokemon.id, 'liked')"
                        >
                            <path
                                d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"
                            />
                        </svg>
                    </span>
                    <span v-if="isAuth" class="like-buttons">
                        <svg
                            v-if="pokemon.id == favoritePokemon"
                            class="active-actions"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="15"
                            height="15"
                            @click="unbind(pokemon.id)"
                        >
                            <path
                                fill="red"
                                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                            />
                        </svg>
                        <svg
                            v-else
                            @click="bind(pokemon.id, 'favorite')"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            width="15"
                            height="15"
                            class="inactive-actions"
                             :class="{
                                'd-none' : favoritePokemon != null
                            }"
                        >
                            <path
                                d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ElNotification } from "element-plus";
import Ball from './Ball.vue'

export default {
    components: {
        Ball,
    },
    data() {
        return {};
    },
    created() {
        this.fetchPokemons();
    },
    mounted() {},
    computed: {
        ...mapGetters("pokemon", {
            pokemons: "getPokemons",
            pagination: "getPagination",
        }),
        ...mapGetters("auth", {
            isAuth: "getIsAuthenticated",
            user: "getUser",
        }),
        favoritePokemon() {
            const fave = this.user.pokemons.filter((pokemon) => {
                return pokemon.pivot.type == "favorite";
            });

            if (fave && fave.length > 0) {
                return fave[0].id;
            }

            return null;
        },
        favoritePokemon() {
            return this.user.favorite_pokemon_id;
        },
        likedPokemons() {
            return this.user.liked_pokemon_ids;
        },
        hatedPokemons() {
            return this.user.hated_pokemon_ids;
        },
        pageTitle() {
            if (this.isAuth) {
                return `Hi ${this.user.first_name} ${this.user.last_name}!`;
            } else {
                return `Pokedex`;
            }
        },
    },
    methods: {
        ...mapActions("pokemon", [
            "fetchPokemons",
            "bindPokemon",
            "unbindPokemon",
        ]),
        pageChanged(number) {
            this.fetchPokemons({
                page: number,
            });
        },
        bind(id, type) {
            this.bindPokemon({
                pokemon_id: id,
                type,
            }).then(res => {
                ElNotification({
                    title: `Pokemon ${type}`,
                });
            }).catch(error => {
                 ElNotification({
                    message: error.response.data.message,
                    type: 'error'
                });
            })
        },
        unbind(id) {
            this.unbindPokemon({pokemon_id: id})
        },
    },
};
</script>

<style scoped>
body {
    font-family: "Nunito", sans-serif;
    padding: 50px;
}
.card {
    width: 8rem;
    box-shadow: 0 6px 10px rgba(211, 160, 160, 0.08),
        0 0 6px rgba(0, 0, 0, 0.05);
    transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
        0.3s box-shadow,
        0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
    cursor: default;
}

.card img {
    padding: 20px;
}

.card:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    z-index: 9999;
}

.like-buttons {
    cursor: pointer;
}
.like-buttons:hover {
    transform: scale(1.1);
}

.inactive-actions {
    opacity: 0.3;
}
.inactive-actions:hover {
    opacity: 0.6 !important;
}

.active-actions:hover {
}
</style>
