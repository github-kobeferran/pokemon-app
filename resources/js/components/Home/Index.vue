<template>
    <div class="container">
        <div class="row">
            <div class="col text-center">
                <h1>Pokemon List </h1>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-4 col-lg-6 col-xl-3 text-center">
                    <div
                        class="card"
                        style="width: 18rem"
                        v-for="pokemon in pokemons"
                        :key="pokemon.id"
                    >
                        <img :src="pokemon.cover" alt="..." />
                        <div class="card-body">
                            <p class="card-text">
                                {{pokemon.name}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {};
    },
    mounted() {
        this.fetchPokemons();
    },
    computed: {
        ...mapGetters(
            {
                pokemons: "getPokemons",
            },
            "pokemon"
        ),
    },
    methods: {
        ...mapActions(["fetchPokemons"], "pokemon"),
    },
};
</script>

<style scoped>
/* body {
    font-family: "Nunito", sans-serif;
    padding: 50px;
}
.card {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
    transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
        0.3s box-shadow,
        0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
    padding: 14px 80px 18px 36px;
    cursor: pointer;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

.card h3 {
    font-weight: 600;
}

.card img {
    position: absolute;
    top: 20px;
    right: 15px;
    max-height: 120px;
}

.card-1 {
    background-image: url(https://ionicframework.com/img/getting-started/ionic-native-card.png);
    background-repeat: no-repeat;
    background-position: right;
    background-size: 80px;
}

.card-2 {
    background-image: url(https://ionicframework.com/img/getting-started/components-card.png);
    background-repeat: no-repeat;
    background-position: right;
    background-size: 80px;
}

.card-3 {
    background-image: url(https://ionicframework.com/img/getting-started/theming-card.png);
    background-repeat: no-repeat;
    background-position: right;
    background-size: 80px;
}

@media (max-width: 990px) {
    .card {
        margin: 20px;
    }
} */
</style>
