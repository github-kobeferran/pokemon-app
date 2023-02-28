<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col text-center">
                <h1>{{ pageTitle }}</h1>
            </div>
        </div>

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
            </div>
        </div>
        <el-pagination
            :page-size="20"
            layout="prev, pager, next"
            :page-count="pagination.last_page"
            :current-page="pagination.current_page"
            @current-change="pageChanged"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
        };
    },
    created() {
        this.fetchPokemons();
    },
    mounted() {},
    computed: {
        ...mapGetters(
            "pokemon"
,
            {
                pokemons: "getPokemons",
                pagination: "getPagination",
            },
        ),
        pageTitle() {
            if (this.isAuth) {
                return `Hi ${this.user.first_name} ${this.user.last_name}!`;
            } else {
                return `Pokemon List`;
            }
        },
    },
    methods: {
        ...mapActions("pokemon", ["fetchPokemons"], ),
        pageChanged(number) {
            this.fetchPokemons({
                page: number,
            });
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
    cursor: pointer;
}

.card img {
    padding: 20px;
}

.card:hover {
    transform: scale(1.65);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    z-index: 9999;
}
</style>
