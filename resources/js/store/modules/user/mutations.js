const mutations = {
    setUsers(state, users) {
        state.users = users;
    },
    setCurrentUser(state, user) {
        state.currentUser = user;
    },
};

export default mutations;
