<template>
    <div class="container-fluid">
        <el-table :data="filterTableData" style="width: 100%">
            <el-table-column label="Name" prop="name" />
            <el-table-column align="right">
                <template #header>
                    <el-input
                        v-model="search"
                        size="small"
                        placeholder="Type to search"
                    />
                </template>
                <template #default="scope">
                    <el-button
                        size="small"
                        @click="handleView(scope.$index, scope.row)"
                        >View Pokemons</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            v-if="selectedUser"
            v-model="showDialog"
            :title="`Pokemon Trainer ${selectedUser.first_name}`"
            @close="resetUser"
        >
            <div class="row mb-2" v-if="selectedUser.favorite_pokemon.length > 0">
                <div class="col d-flex justify-content-center align-items-center flex-column">
                    <h6 >Favorite Pokemon</h6>
                    <div
                        class="card"
                    >
                        <img
                            :src="selectedUser.favorite_pokemon[0].cover_image"
                            :alt="`photo of ${selectedUser.favorite_pokemon[0].name}`"
                        />
                        <div class="card-body">
                            <p class="card-text text-center">
                                {{ selectedUser.favorite_pokemon[0].name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-2" v-if="selectedUser.liked_pokemons.length > 0">
                <h6 class="text-center">Pokemons liked</h6>
                <div class="col d-flex justify-content-around">
                    <div
                        class="card mx-3"
                        v-for="pokemon in selectedUser.liked_pokemons"
                        :key="pokemon.id"
                    >
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
            </div>

            <div class="row mb-2" v-if="selectedUser.hated_pokemons.length > 0">
                <h6 class="text-center">Pokemons hated</h6>
                <div class="col d-flex justify-content-around">
                    <div
                        class="card mx-3"
                        v-for="pokemon in selectedUser.hated_pokemons"
                        :key="pokemon.id"
                    >
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
            </div>
        </el-dialog>
        <el-pagination
            class="justify-content-end"
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
            search: "",
            showDialog: false,
            user: null,
        };
    },
    mounted() {
        this.fetchUsers();
    },
    computed: {
        ...mapGetters("user", {
            tableData: "getUsers",
            pagination: "getUserPagination",
            selectedUser: "getCurrentUser",
        }),
        filterTableData() {
            return this.tableData.filter(
                (data) =>
                    !this.search ||
                    data.name.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    methods: {
        ...mapActions("user", [
            "fetchUsers",
            "fetchCurrentUser",
            "resetCurrentUser",
        ]),
        handleView(index, row) {
            this.showDialog = true;
            this.fetchCurrentUser(row.id);
        },
        pageChanged(number) {
            this.fetchUsers({
                page: number,
            });
        },
        resetUser(){
            this.resetCurrentUser()
        }
    },
};
</script>

<style scoped>
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
    /* transform: scale(1.1); */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
    z-index: 9999;
}
</style>
