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
};
