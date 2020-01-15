import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOG_OUT, SET_LOADING, UNSET_LOADING } from '../type';
const authReducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true
            };
        case UNSET_LOADING:
            return {
                ...state,
                loading: false
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload);
            localStorage.setItem("isAuthenticated", true);
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            };
        case LOGIN_FAIL:
        case LOG_OUT:
        case AUTH_ERROR:
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            };
        default:
            return state;
    }
};
export default authReducer;