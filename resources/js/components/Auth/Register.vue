<template>
    <div class="container py-4">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="centered">
                    <h2>Register</h2>
                    <el-form
                        :rules="rules"
                        :model="form"
                        ref="form"
                        label-width="200px"
                        class="form"
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
                            />
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input
                                v-model="form.password"
                                type="password"
                                placeholder="Enter your password"
                                show-password
                            />
                        </el-form-item>

                        <el-form-item
                            label="Password Confirmation"
                            prop="password_confirmation"
                        >
                            <el-input
                                v-model="form.password_confirmation"
                                type="password"
                                placeholder="Re-enter your password"
                                show-password
                            />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit"
                                >Register</el-button
                            >
                            <el-button>Cancel</el-button>
                        </el-form-item>
                    </el-form>
                </div>
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
                password: "",
                password_confirmation: "",
            },
            rules: {
                ...formRules,
                password: [
                    {
                        required: true,
                        message: "Password is required",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value) =>
                            value === this.form.password_confirmation,
                        message: "Passwords do not match",
                    },
                ],
                password_confirmation: [
                    {
                        required: true,
                        message: "Password Confirmation is required",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value) =>
                            value === this.form.password,
                        message: "Passwords do not match",
                    },
                ],
            },
        };
    },
    created(){
        if(this.isAuth){
            this.$router.push('/')
        }
    },
    computed: {
        ...mapGetters("auth", {
            isAuth: "getIsAuthenticated",
            user: "getUser",
        }),
    },
    methods: {
        ...mapActions("auth", ["register"]),
        async onSubmit() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    try {
                        const response = await this.register(this.form);
                        ElNotification({
                            title: "Logged in!",
                            type: "success",
                        });

                        this.$router.push("/");
                    } catch (error) {
                        ElNotification({
                            title: "Error",
                            message: error.response.data.message,
                            type: "error",
                        });
                    }
                }
            });
        },
    },
};
</script>

<style scoped>
.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.form {
        background: white;
        padding: 30px 10px;
    }
</style>
