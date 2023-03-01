import actions from "./action";
import getters from "./getters.js";
import mutations from "./mutations.js";

const state = {
    users: [],
    currentUser: null,
    pagination: {
        current_page: 1,
        first_page_url: null,
        from: 0,
        last_page: 0,
        last_page_url: null,
        next_page_url: null,
        path: null,
        per_page: 15,
        prev_page_url: null,
        to: 0,
        total: 0,
    },
    loading: false,
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
};


