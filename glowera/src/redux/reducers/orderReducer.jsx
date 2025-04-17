import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER,
    CREATE_ORDER_ERROR,
    UPDATE_ORDER_STATUS_REQUEST, // Add action type for starting loading when updating status
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_STATUS_ERROR,
} from "../actions/orderAction";

// ✅ Initial state
const initialState = {
    lastOrder: null, // Last order
    error: null, // Errors
    loading: false, // Loading state during order processing
};

// ✅ Order reducer
const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true, // Start loading
            };
        case CREATE_ORDER:
            return {
                ...state,
                lastOrder: action.payload,
                error: null,
                loading: false, // End loading after successful creation
            };
        case CREATE_ORDER_ERROR:
            return {
                ...state,
                lastOrder: null,
                error: action.payload,
                loading: false, // End loading after error
            };
        case UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true, // Start loading
            };
        case UPDATE_ORDER_STATUS:
            // Check if lastOrder exists before updating
            if (!state.lastOrder) {
                return {
                    ...state,
                    error: "No order found to update its status",
                    loading: false,
                };
            }
            return {
                ...state,
                lastOrder: {
                    ...state.lastOrder,
                    isPaid: action.payload.isPaid,
                },
                error: null,
                loading: false, // End loading after update
            };
        case UPDATE_ORDER_STATUS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false, // End loading after error
            };
        default:
            return state;
    }
};

export default orderReducer;
