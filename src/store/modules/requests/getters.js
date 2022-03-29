export default {
    getRequestsList(state) {
        return state.requests;
    },
    hasRequests(state) {
        return state.requests && state.requests.length > 0;
    }
}