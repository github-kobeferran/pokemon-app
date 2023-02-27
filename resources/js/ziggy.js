const Ziggy = {
    url: "http://pokemon-app.test",
    port: null,
    defaults: {},
    routes: {
        "sanctum.csrf-cookie": {
            uri: "sanctum/csrf-cookie",
            methods: ["GET", "HEAD"],
        },
        "ignition.healthCheck": {
            uri: "_ignition/health-check",
            methods: ["GET", "HEAD"],
        },
        "ignition.executeSolution": {
            uri: "_ignition/execute-solution",
            methods: ["POST"],
        },
        "ignition.updateConfig": {
            uri: "_ignition/update-config",
            methods: ["POST"],
        },
        "api.pokemons.index": {
            uri: "api/v1/pokemons",
            methods: ["GET", "HEAD"],
        },
        "api.pokemons.store": { uri: "api/v1/pokemons", methods: ["POST"] },
        "api.pokemons.show": {
            uri: "api/v1/pokemons/{pokemon}",
            methods: ["GET", "HEAD"],
        },
        "api.pokemons.update": {
            uri: "api/v1/pokemons/{pokemon}",
            methods: ["PUT", "PATCH"],
        },
        "api.pokemons.destroy": {
            uri: "api/v1/pokemons/{pokemon}",
            methods: ["DELETE"],
        },
        login: { uri: "login", methods: ["GET", "HEAD"] },
        logout: { uri: "logout", methods: ["POST"] },
        register: { uri: "register", methods: ["GET", "HEAD"] },
        "password.request": { uri: "password/reset", methods: ["GET", "HEAD"] },
        "password.email": { uri: "password/email", methods: ["POST"] },
        "password.reset": {
            uri: "password/reset/{token}",
            methods: ["GET", "HEAD"],
        },
        "password.update": { uri: "password/reset", methods: ["POST"] },
        "password.confirm": {
            uri: "password/confirm",
            methods: ["GET", "HEAD"],
        },
        "verification.notice": {
            uri: "email/verify",
            methods: ["GET", "HEAD"],
        },
        "verification.verify": {
            uri: "email/verify/{id}/{hash}",
            methods: ["GET", "HEAD"],
        },
        "verification.resend": {
            uri: "email/verification-notification",
            methods: ["POST"],
        },
        home: { uri: "home", methods: ["GET", "HEAD"] },
    },
};

if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
