<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 mx-auto">
                <h4 class="text-center text-white">Update Your Profile</h4>
                <el-form
                    class="form"
                    ref="form"
                    label-width="200px"
                    :rules="rules"
                    :model="form"
                >
                    <el-form-item label="Profile Photo" prop="image">
                        <el-upload
                            class="avatar-uploader"
                            :action="uploadUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :headers="headerInfo"
                            name="image"
                        >
                            <img
                                v-if="imageUrl"
                                :src="imageUrl"
                                class="avatar"
                            />
                            <el-icon v-else class="avatar-uploader-icon"
                                ><Plus
                            /></el-icon>
                        </el-upload>
                    </el-form-item>
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
                            <el-form-item label="Address" prop="address">
                        <el-input
                            placeholder="Address"
                            type="text"
                            v-model="form.address"
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
            uploadUrl: "",
            imageUrl: "",
            headerInfo: {},
        };
    },
    mounted() {
        if (this.user) {
            this.form = this.user;
            this.uploadUrl = route("api.user.image-upload");
            this.imageUrl = this.user.image_url;

            const token = localStorage.getItem("token");

            this.headerInfo = {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                "X-Requested-With": "XMLHttpRequest",
                Authorization: `Bearer ${token}`,
            };
        }
    },
    computed: {
        ...mapGetters("auth", {
            isAuth: "getIsAuthenticated",
            user: "getUser",
        }),
        token() {
            if (this.user) {
                return localStorage.getItem("token") || null;
            }
        },
    },
    methods: {
        ...mapActions("user", ["updateUser"]),
        handleAvatarSuccess(response) {
            this.imageUrl = response.user.image_url;
            this.$store.commit("auth/setUser", response.user);
            ElNotification({
                title: "Profile photo updated",
                type: "success",
            });
        },
        async onSubmit() {
            this.$refs["form"].validate(async (valid) => {
                if (valid) {
                    this.updateUser({
                        id: this.user.id,
                        fields: this.form,
                    })
                        .then((res) => {
                            ElNotification({
                                title: "Profile updated",
                                type: "success",
                            });
                        })
                        .catch((error) => {
                            ElNotification({
                                title: "Error",
                                message: error.response.data.message,
                                type: "error",
                            });
                        });
                }
            });
        },
    },
};
</script>

<style scoped>
.form {
    background: white;
    padding: 30px 10px;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
