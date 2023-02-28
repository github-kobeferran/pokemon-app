<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 mx-auto">
                <h4 class="text-center">Update Your Profile</h4>
                <el-form
                    :rules="rules"
                    :model="form"
                    ref="form"
                    label-width="200px"
                >
                    <el-form-item label="First Name" prop="first_name">
                        <el-input
                            placeholder="Enter first name"
                            type="text"
                            v-model="form.first_name"
                        />
                    </el-form-item>
                    <el-form-item label="Last Name" prop="last_name">
                        <el-input
                            placeholder="Enter last name"
                            type="text"
                            v-model="form.last_name"
                        />
                    </el-form-item>
                    <el-form-item label="Email" prop="email">
                        <el-input
                            placeholder="Enter email"
                            type="email"
                            v-model="form.email"
                            disabled
                        />
                    </el-form-item>
                    <el-form-item label="Date of Birth" prop="dob">
                        <el-date-picker
                            v-model="form.dob"
                            type="date"
                            placeholder="Select date of birth"
                            format="DD/MM/YYYY"
                            value-format="YYYY-MM-DD"
                        />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit"
                            >Save</el-button
                        >
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ElNotification } from "element-plus";
import { formRules } from "../../mixins/user.js";

export default {
    data() {
        return {
            form: {
                first_name: "",
                last_name: "",
                email: "",
                dob: null,
            },
            rules: formRules,
        };
    },
    mounted() {
        if (this.user) {
            this.form = this.user;
        }
    },
    computed: {
        ...mapGetters("auth", {
            isAuth: "getIsAuthenticated",
            user: "getUser",
        }),
    },
    methods: {
        ...mapActions("user", ["updateUser"]),
        async onSubmit() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    this.updateUser({
                        id: this.user.id,
                        fields: this.form,
                    }).then(res => {
                        ElNotification({
                            title: 'Profile updated',
                            type: 'success'
                        })
                    }).catch(error => {
                           ElNotification({
                            title: 'Error',
                            message: error.response.data.message,
                            type: 'error'
                        })
                    })
                }
            });
        },
    },
};
</script>

<style></style>
