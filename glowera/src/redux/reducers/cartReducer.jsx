// cartReducer.js

import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, FETCH_CART_REQUEST, FETCH_CART_SUCCESS, FETCH_CART_ERROR } from "../type";

const initialState = {
    items: [],
    totalQuantity: 0,
    cartId: null,
    loading: false,
    error: null,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_CART_SUCCESS:
            return {
                ...state,
                items: action.payload.items,
                totalQuantity: action.payload.totalQuantity,
                cartId: action.payload.cartId,
                loading: false,
                error: null,
            };

        case FETCH_CART_ERROR:
            return { ...state, loading: false, error: action.payload };

        case ADD_TO_CART:
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.productId === newItem.productId && item.size === newItem.size);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) => (item.productId === newItem.productId && item.size === newItem.size ? { ...item, quantity: item.quantity + newItem.quantity } : item)),
                    totalQuantity: state.totalQuantity + newItem.quantity,
                };
            }
            return {
                ...state,
                items: [...state.items, newItem],
                totalQuantity: state.totalQuantity + newItem.quantity,
            };

        case REMOVE_FROM_CART:
            const itemToRemove = state.items.find((item) => item._id === action.payload);
            return {
                ...state,
                items: state.items.filter((item) => item._id !== action.payload),
                totalQuantity: state.totalQuantity - (itemToRemove?.quantity || 0),
            };

        case UPDATE_QUANTITY:
            const itemToUpdate = state.items.find((item) => item._id === action.payload.id);
            const quantityDifference = action.payload.quantity - (itemToUpdate?.quantity || 0);
            return {
                ...state,
                items: state.items.map((item) => (item._id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)),
                totalQuantity: state.totalQuantity + quantityDifference,
            };

        default:
            return state;
    }
};

export default cartReducer;
