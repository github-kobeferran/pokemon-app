<template>
    <div
        class="container-fluid"
        v-loading.fullscreen.lock="loading"
        :element-loading-text="loadingText"
        style="z-index: 99999 !important"
    >
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
            style="width: 75%"
        >

           <div class="d-flex justify-content-center mb-4">
                <el-image
                v-if="selectedUser.image_url && selectedUser.image_url != ''"
                style="width: 150px; height: 150px"
                :src="selectedUser.image_url"
                fit="cover"

            />
            </div>

            <el-descriptions class="margin-top" :column="3" :size="size" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">First Name</div>
                    </template>
                    {{ selectedUser.first_name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">Last Name</div>
                    </template>
                    {{ selectedUser.last_name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <calendar />
                            </el-icon>
                            Date of Birth
                        </div>
                    </template>
                    {{ selectedUser.date_of_birth || "- -" }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <message />
                            </el-icon>
                            Email
                        </div>
                    </template>
                    {{ selectedUser.email }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <office-building />
                            </el-icon>
                            Address
                        </div>
                    </template>
                    {{ selectedUser.address || "- -" }}
                </el-descriptions-item>
            </el-descriptions>



            <div
                v-if="
                    selectedUser.favorite_pokemon.length > 0 &&
                    selectedUser.liked_pokemons.length > 0 &&
                    selectedUser.hated_pokemons.length > 0
                "
            >
                <div
                    class="row mb-2"
                    v-if="selectedUser.favorite_pokemon.length > 0"
                >
                    <div
                        class="col d-flex justify-content-center align-items-center flex-column"
                    >
                        <h6>Favorite Pokemon</h6>
                        <div class="card">
                            <img
                                :src="
                                    selectedUser.favorite_pokemon[0].cover_image
                                "
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

                <div
                    class="row mb-2"
                    v-if="selectedUser.liked_pokemons.length > 0"
                >
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

                <div
                    class="row mb-2"
                    v-if="selectedUser.hated_pokemons.length > 0"
                >
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
            </div>
            <el-empty
                v-else
                description="This trainer is still finding pokemons.."
            />
        </el-dialog>
        <el-pagination
            class="justify-content-end mt-2"
            background
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
            loadingText: `Gathering trainers around..`,
        };
    },
    mounted() {
        if (!this.tableData || this.tableData.length < 1) {
            this.fetchUsers();
        }
    },
    computed: {
        ...mapGetters("user", {
            tableData: "getUsers",
            pagination: "getUserPagination",
            selectedUser: "getCurrentUser",
            loading: "getLoading",
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
            this.loadingText = `Getting information about ${row.name}..`;
            this.showDialog = true;
            this.fetchCurrentUser(row.id);
        },
        pageChanged(number) {
            this.fetchUsers({
                page: number,
            });
        },
        resetUser() {
            this.resetCurrentUser();
        },
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
