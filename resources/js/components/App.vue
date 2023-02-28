<template>
    <div class="container-fluid">
        <el-container>
            <el-header height="100px">
                <div class=" h-100">
                    <div
                        class="my-5 d-flex justify-content-center align-items-end"
                    >
                        <el-radio-group
                            v-if="isAuth"
                            v-model="activePage"
                            class="my-3 mx-auto"
                        >
                            <el-radio-button label="Pokemons" />
                            <el-radio-button label="Users" />
                            <el-radio-button label="Profile" />
                        </el-radio-group>
                    </div>
                    <div
                        class="position-absolute top-0 end-0 d-flex justify-content-end align-items-start"
                    >
                        <div class="mx-2 py-3">
                            <router-link
                                v-if="!isAuth"
                                to="/login"
                                active-class="d-none"
                                >Login</router-link
                            >
                        </div>
                        <div class="mx-2 py-3">
                            <router-link
                                v-if="!isAuth"
                                to="/register"
                                active-class="d-none"
                                >Register</router-link
                            >
                        </div>

                        <div class="mx-2 py-3">
                            <el-button
                                v-if="isAuth"
                                @click="showLogoutDialog = true"
                                :icon="SwitchButton"
                            >
                                Logout
                            </el-button>
                        </div>

                        <el-dialog
                            v-model="showLogoutDialog"
                            title="Logout"
                            width="30%"
                        >
                            <span>Are you sure you want to log out?</span>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="showLogoutDialog = false"
                                        >Cancel</el-button
                                    >
                                    <el-button
                                        type="primary"
                                        @click="handleLogout"
                                    >
                                        Ok
                                    </el-button>
                                </span>
                            </template>
                        </el-dialog>
                    </div>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import PokemonIndex from "./Pokemon/Index.vue";

export default {
    components: {
        PokemonIndex,
    },
    created() {
        const token = localStorage.getItem("token");
        if (token) {
            this.loginWithToken(token);

            window.axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
        }
    },
    mounted() {
        // this.$route.re;
    },
    data() {
        return {
            showLogoutDialog: false,
            activePage: "Pokemons",
        };
    },
    computed: {
        ...mapGetters('auth',
            {
                isAuth: "getIsAuthenticated",
                user: "getUser",
            },
        ),
    },
    watch: {
        activePage(val){
            switch(val){
                case 'Pokemons':
                    this.$router.push('/')
                break;
                case 'Users':
                    this.$router.push('/users')
                break;
                case 'Profile':
                    this.$router.push('/profile')
                break;
            }
        }
    },
    methods: {
        ...mapActions("auth", ["logout", "loginWithToken"]),
        handleLogout() {
            this.logout().then((res) => {
                this.$router.push("/");

                this.showLogoutDialog = false;
            });
        },
    },
};
</script>
