<template>
    <div
        ref="pokeBallContainer"
        class="poke-ball--container"
        draggable="true"
        :style="{ top: topPos, left: leftPos }"
    >
        <el-tooltip
            class="box-item"
            effect="light"
            content="You can drag me!"
            placement="top-start"
        >
            <svg
                ref="pokeBall"
                @mousedown="dragMouseDown"
                height="50"
                width="50"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 511.985 511.985"
                xml:space="preserve"
                fill="#000000"
                class="poke-ball"
                @click="showDialogFunction"
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        style="fill: #ed5564"
                        d="M491.859,156.348c-12.891-30.483-31.342-57.865-54.842-81.372 c-23.516-23.5-50.904-41.96-81.373-54.85c-31.56-13.351-65.091-20.125-99.652-20.125c-34.554,0-68.083,6.773-99.645,20.125 c-30.483,12.89-57.865,31.351-81.373,54.85c-23.499,23.507-41.959,50.889-54.85,81.372C6.774,187.91,0,221.44,0,255.993 c0,34.56,6.773,68.091,20.125,99.652c12.89,30.469,31.351,57.857,54.85,81.357c23.507,23.516,50.889,41.967,81.373,54.857 c31.562,13.344,65.091,20.125,99.645,20.125c34.561,0,68.092-6.781,99.652-20.125c30.469-12.891,57.857-31.342,81.373-54.857 c23.5-23.5,41.951-50.889,54.842-81.357c13.344-31.561,20.125-65.092,20.125-99.652C511.984,221.44,505.203,187.91,491.859,156.348z "
                    ></path>
                    <path
                        style="fill: #e6e9ed"
                        d="M0.102,263.18c0.875,32.014,7.593,63.092,20.023,92.465c12.89,30.469,31.351,57.857,54.85,81.357 c23.507,23.516,50.889,41.967,81.373,54.857c31.562,13.344,65.091,20.125,99.645,20.125c34.561,0,68.092-6.781,99.652-20.125 c30.469-12.891,57.857-31.342,81.373-54.857c23.5-23.5,41.951-50.889,54.842-81.357c12.438-29.373,19.156-60.451,20.031-92.465 H0.102z"
                    ></path>
                    <path
                        style="fill: #434a54"
                        d="M510.765,281.211c0.812-8.344,1.219-16.75,1.219-25.218c0-9.516-0.516-18.953-1.531-28.289 c-12.719,1.961-30.984,4.516-53.998,7.054c-43.688,4.82-113.904,10.57-200.463,10.57c-86.552,0-156.776-5.75-200.455-10.57 c-23.022-2.539-41.28-5.093-53.998-7.054C0.516,237.04,0,246.478,0,255.993c0,8.468,0.406,16.875,1.219,25.218 c41.53,6.25,133.027,17.436,254.773,17.436S469.234,287.461,510.765,281.211z"
                    ></path>
                    <path
                        style="fill: #e6e9ed"
                        d="M309.334,266.656c0,29.459-23.891,53.334-53.342,53.334c-29.452,0-53.334-23.875-53.334-53.334 c0-29.453,23.882-53.327,53.334-53.327C285.443,213.33,309.334,237.204,309.334,266.656z"
                    ></path>
                    <path
                        style="fill: #434a54"
                        d="M255.992,170.66c-52.936,0-95.997,43.069-95.997,95.997s43.062,95.988,95.997,95.988 s95.996-43.061,95.996-95.988C351.988,213.729,308.928,170.66,255.992,170.66z M255.992,309.335 c-23.522,0-42.663-19.156-42.663-42.678c0-23.523,19.14-42.663,42.663-42.663c23.531,0,42.654,19.14,42.654,42.663 C298.646,290.178,279.523,309.335,255.992,309.335z"
                    ></path>
                    <path
                        style="
                            opacity: 0.2;
                            fill: #ffffff;
                            enable-background: new;
                        "
                        d="M491.859,156.348c-12.891-30.483-31.342-57.865-54.842-81.372 c-23.516-23.5-50.904-41.96-81.373-54.85c-31.56-13.351-65.091-20.125-99.652-20.125c-3.57,0-7.125,0.078-10.664,0.219 c30.789,1.25,60.662,7.93,88.974,19.906c30.498,12.89,57.873,31.351,81.371,54.85c23.5,23.507,41.969,50.889,54.857,81.372 c13.359,31.562,20.109,65.092,20.109,99.646c0,34.56-6.75,68.091-20.109,99.652c-12.889,30.469-31.357,57.857-54.857,81.357 c-23.498,23.516-50.873,41.967-81.371,54.857c-28.312,11.969-58.186,18.656-88.974,19.906c3.539,0.141,7.093,0.219,10.664,0.219 c34.561,0,68.092-6.781,99.652-20.125c30.469-12.891,57.857-31.342,81.373-54.857c23.5-23.5,41.951-50.889,54.842-81.357 c13.344-31.561,20.125-65.092,20.125-99.652C511.984,221.44,505.203,187.91,491.859,156.348z"
                    ></path>
                    <path
                        style="opacity: 0.1; enable-background: new"
                        d="M20.125,355.645c12.89,30.469,31.351,57.857,54.85,81.357 c23.507,23.516,50.889,41.967,81.373,54.857c31.562,13.344,65.091,20.125,99.645,20.125c3.57,0,7.125-0.078,10.664-0.219 c-30.789-1.25-60.67-7.938-88.982-19.906c-30.483-12.891-57.857-31.342-81.364-54.857c-23.507-23.5-41.96-50.889-54.858-81.357 c-13.352-31.56-20.117-65.091-20.117-99.652c0-34.554,6.765-68.084,20.116-99.646C54.35,125.864,72.803,98.481,96.31,74.983 c23.507-23.507,50.881-41.968,81.364-54.858c28.312-11.976,58.193-18.656,88.982-19.906c-3.539-0.14-7.094-0.218-10.664-0.218 c-34.554,0-68.083,6.773-99.645,20.125c-30.483,12.89-57.865,31.351-81.373,54.858c-23.499,23.499-41.959,50.881-54.85,81.364 C6.774,187.91,0,221.44,0,255.993C0,290.553,6.774,324.085,20.125,355.645z"
                    ></path>
                </g>
            </svg>
        </el-tooltip>

        <el-dialog v-if="user" v-model="showDialog" title="Your Pokedex">
            <div class="" v-if="user.pokemons && user.pokemons.length > 0">
                <div
                    class="row mb-2"
                    v-if="
                        user.favorite_pokemon &&
                        user.favorite_pokemon.length > 0
                    "
                >
                    <h6 class="text-center">Your favorite Pokemon</h6>
                    <div class="row">
                        <div class="col-12 col-md-8 col-lg-4 card mx-auto my-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                width="20"
                                height="20"
                                class="unbind-button"
                                @click="unbind(user.favorite_pokemon[0])"
                            >
                                <path
                                    fill="#ff0000"
                                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                                />
                            </svg>
                            <img
                                :src="user.favorite_pokemon[0].cover_image"
                                :alt="`photo of ${user.favorite_pokemon[0].name_formatted}`"
                            />
                            <div class="card-body">
                                <p class="card-text text-center">
                                    {{
                                        user.favorite_pokemon[0].name_formatted
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-2" v-if="user.liked_pokemons.length > 0">
                    <h6 class="text-center">Pokemons that you liked</h6>
                    <div class="row">
                        <div
                            class="col-12 col-md-8 col-lg-4 card mx-auto my-2"
                            v-for="pokemon in user.liked_pokemons"
                            :key="pokemon.id"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                width="20"
                                height="20"
                                class="unbind-button"
                                @click="unbind(pokemon)"
                            >
                                <path
                                    fill="#ff0000"
                                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                                />
                            </svg>
                            <img
                                :src="pokemon.cover_image"
                                :alt="`photo of ${pokemon.name_formatted}`"
                            />
                            <div class="card-body">
                                <p class="card-text text-center">
                                    {{ pokemon.name_formatted }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mb-2" v-if="user.hated_pokemons.length > 0">
                    <h6 class="text-center">Pokemons you hate</h6>
                    <div class="row">
                        <div
                            class="col-12 col-md-8 col-lg-4 card mx-auto my-2"
                            v-for="pokemon in user.hated_pokemons"
                            :key="pokemon.id"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                                width="20"
                                height="20"
                                class="unbind-button"
                                @click="unbind(pokemon)"
                            >
                                <path
                                    fill="#ff0000"
                                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                                />
                            </svg>
                            <img
                                :src="pokemon.cover_image"
                                :alt="`photo of ${pokemon.name_formatted}`"
                            />
                            <div class="card-body">
                                <p class="card-text text-center">
                                    {{ pokemon.name_formatted }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-empty v-else description="No Pokemon in here, go get some!" />
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            showDialog: false,
            pos1: 0,
            pos2: 0,
            pos3: 0,
            pos4: 0,
            topPos: 25,
            leftPos: 100,
        };
    },
    computed: {
        ...mapGetters("auth", {
            isAuth: "getIsAuthenticated",
            user: "getUser",
        }),
    },
    methods: {
        ...mapActions("pokemon", ["unbindPokemon"]),
        dragMouseDown(e) {
            e.preventDefault();
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            document.onmouseup = this.closeDragElement;
            document.onmousemove = this.elementDrag;
        },
        elementDrag(e) {
            e.preventDefault();
            this.pos1 = this.pos3 - e.clientX;
            this.pos2 = this.pos4 - e.clientY;
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            this.topPos = this.$el.offsetTop - this.pos2 + "px";
            this.leftPos = this.$el.offsetLeft - this.pos1 + "px";

            this.$refs["pokeBall"].style.pointerEvents = "none";
        },
        closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            this.$refs["pokeBall"].style.pointerEvents = "auto";
        },
        showDialogFunction() {
            this.showDialog = !this.showDialog;
        },
        unbind(pokemon) {
            this.loadingText = `Letting go of ${pokemon.name_formatted}..`;
            this.showDialog = false
            this.unbindPokemon({ pokemon_id: pokemon.id })
                .then((res) => {})
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                this.showDialog = true

                });
        },
    },
};
</script>

<style scoped>
[draggable="true"] {
    cursor: move;
}

.poke-ball--container {
    position: absolute;
    top: 10%;
    right: 10%;

    z-index: 9999;
}

.poke-ball {
    animation: float 6s ease-in-out infinite;
    animation: float 6s ease-in-out infinite;
}
.poke-ball:hover {
    cursor: pointer;
    transform: scale(1.03);
}

.card {
    width: 10rem;
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
    /* transform: scale(1.1); */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    z-index: 9999;
}

.el-popper.is-customized {
    padding: 6px 12px;
    background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
    background: linear-gradient(45deg, #b2e68d, #bce689);
    right: 0;
}

@keyframes float {
    0% {
        filter: drop-shadow(1px 1px 10px rgba(218, 197, 8, 0.3));
        transform: translatey(0px);
    }
    50% {
        filter: drop-shadow(1px 5px 10px rgba(218, 197, 8, 0.877));
        transform: translatey(5px);
    }
    100% {
        filter: drop-shadow(1px 1px 10px rgba(218, 197, 8, 0.3));
        transform: translatey(0px);
    }
}
.unbind-button {
    position: absolute;
    top: -5%;
    right: -7%;
}

.unbind-button:hover {
    transform: scale(1.2);
    cursor: pointer;
}
</style>
