import { GET_ALL_PRODUCTS, GET_PRODUCTS_REQUEST, GET_PRODUCTS_ERROR, RESET_PRODUCTS } from "../type";

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_ALL_PRODUCTS:
            return {
                ...state,
                data: action.payload || [],
                loading: false,
                error: null,
            };

        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                data: [],
                loading: false,
                error: action.payload || "Failed to fetch products",
            };

        case RESET_PRODUCTS:
            return {
                ...state,
                data: [],
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default productsReducer;
