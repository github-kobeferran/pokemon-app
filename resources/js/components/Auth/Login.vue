<template>
    <div class="container py-4">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="centered">
                    <h2>Login</h2>
                    <el-form
                        :rules="rules"
                        :model="form"
                        ref="form"
                        label-width="120px"
                    >
                        <el-form-item label="Email" prop="email">
                            <el-input
                                placeholder="Enter email"
                                type="email"
                                v-model="form.email"
                            />
                            <span
                                v-if="formErrors && formErrors.email[0]"
                                class="text-danger"
                                >{{ formErors.email[0] }}}</span
                            >
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input
                                v-model="form.password"
                                type="password"
                                placeholder="Enter your password"
                                prop="password"
                                show-password
                            />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit"
                                >Login</el-button
                            >
                            <el-button>Cancel</el-button>
                        </el-form-item>
                    </el-form>
                    Not registered yet? Registere
                    <router-link to="/register">here</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            formErors: null,
            rules: {
                email: [
                    {
                        required: true,
                        message: "Email is required",
                        trigger: "blur",
                    },
                    {
                        type: 'email',
                        message: "Enter a correct email address",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "Password is required",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {
        ...mapGetters(
            {
                isAuth: "getIsAuthenticated",
                user: "getUser",
            },
            "auth"
        ),
    },
    methods: {
        ...mapActions(["login"], "auth"),
        async onSubmit() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.login(this.form).then(res => {
                        this.$router.push("/");
                    });
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
</style>
