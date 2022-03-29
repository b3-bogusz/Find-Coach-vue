export default {
    getRequestsList(state, _, _2, rootGetters) {
        const coachId = rootGetters.userId;
        return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequests(_, getters) {
        return getters.getRequestsList && getters.getRequestsList.length > 0;
    }
}