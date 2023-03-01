const getters = {
    getUsers: (state) => state.users,
    getCurrentUser: (state) => state.currentUser,
    getUserPagination: (state) => state.pagination,
    getLoading: (state) => state.loading,
};

export default getters;
