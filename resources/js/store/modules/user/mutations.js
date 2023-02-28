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
};

export default mutations;
