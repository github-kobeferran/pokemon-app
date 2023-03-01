const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
    setCurrentUser(state, user) {
        state.currentUser = user;
    },
    setPagination(state, pagination) {
        state.pagination = pagination;
    },
    resetCurrentUser(state) {
        state.currentUser = null;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    resetState(state) {
        Object.assign(state, {
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
        });
    },
};

export default mutations;
