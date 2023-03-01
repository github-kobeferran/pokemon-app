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
};

export default mutations;
