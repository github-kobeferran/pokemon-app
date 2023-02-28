<template>
    <div class="container-fluid">
        <router-view></router-view>
    </div>
</template>

<script>
import PokemonIndex from "./Pokemon/Index.vue";

export default {
    components: {
        PokemonIndex,
    },
    mounted(){
        this.$route.re
    }

};
</script>
