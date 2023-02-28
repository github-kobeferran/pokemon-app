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
            search: "",
        };
    },
    mounted() {
        this.fetchUsers();
    },
    computed: {
        ...mapGetters("user", {
            tableData: "getUsers",
            pagination: "getUserPagination",
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
        ...mapActions("user", ["fetchUsers"]),
        handleView(index, row) {
            console.log(index, "index");
            console.log(row, "row");
        },
        pageChanged(number) {
            this.fetchUsers({
                page: number,
            });
        },
    },
};
</script>

<style></style>
