<template>
    <div class="container">
        <Home />
    </div>
</template>

<script>
import Home from "./Home/Index.vue";

export default {
    components: {
        Home,
    },
    mounted() {
        console.log("Component mounted.");
    },
};
</script>
