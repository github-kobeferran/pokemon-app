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
                                class="btn btn-light btn-sm"
                                v-if="!isAuth"
                                to="/login"
                                active-class="d-none"
                                >Login</router-link
                            >
                        </div>
                        <div class="mx-2 py-3">
                            <router-link
                            class="btn btn-light btn-sm"
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
                <Ball v-if="isAuth"/>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import PokemonIndex from "./Pokemon/Index.vue";
import Ball from './Pokemon/Ball.vue'

export default {
    components: {
        PokemonIndex,
        Ball,

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
        ...mapActions("auth", [
            "logout",
            "loginWithToken",
            "resetAuthUser",
            "resetIsAuthenticated",
        ]),
        handleLogout() {
            this.logout().then((res) => {
                this.activePage = 'Pokemons'
                this.$router.push("/");
                this.showLogoutDialog = false;
                this.resetAuthUser()
                this.resetIsAuthenticated()
            });
        },
    },
};
</script>

<style >
body{
background-color: #3264af;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23ffcc01' fill-opacity='0.19' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
