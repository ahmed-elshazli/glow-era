import { CREATE_NEW_USER, LOGIN_USER, SET_USER, LOGOUT_USER, CHECK_USER_REQUEST, CHECK_USER_ERROR } from "../type";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_USER_REQUEST:
            console.log("authReducer: Received CHECK_USER_REQUEST");
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CHECK_USER_ERROR:
            console.log("authReducer: Received CHECK_USER_ERROR:", action.payload);
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload.error || "Failed to verify user",
            };

        case CREATE_NEW_USER:
        case LOGIN_USER:
            console.log("authReducer: Received event:", action.type, "Payload:", action.payload);
            return {
                ...state,
                user: action.payload.user || null,
                token: action.payload.token || null,
                isAuthenticated: Boolean(action.payload.user && action.payload.token),
                loading: false,
                error: action.payload.error || null,
            };

        case SET_USER:
            console.log("authReducer: Received SET_USER:", action.payload);
            return {
                ...state,
                user: action.payload.user || null,
                token: action.payload.token || null,
                isAuthenticated: Boolean(action.payload.user && action.payload.token),
                loading: false,
                error: action.payload.error || null, // السماح بتخزين الخطأ إذا كان موجودًا
            };

        case LOGOUT_USER:
            console.log("authReducer: Received LOGOUT_USER");
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default authReducer;
