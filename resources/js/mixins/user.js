export const formRules = {
    first_name: [
        {
            required: true,
            message: "First Name is required",
            trigger: "blur",
        },
    ],
    last_name: [
        {
            required: true,
            message: "Last Name is required",
            trigger: "blur",
        },
    ],
    email: [
        {
            required: true,
            message: "Email is required",
            trigger: "blur",
        },
        {
            type: "email",
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
            validator: (rule, value) => value === this.form.password,
            message: "Passwords do not match",
        },
    ],
};
