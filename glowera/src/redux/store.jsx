import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

// استرجاع skinType من localStorage
const skinTypeFromStorage = localStorage.getItem("skinType") ? JSON.parse(localStorage.getItem("skinType")) : null;

// استرجاع عناصر السلة من localStorage
const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

// حساب totalQuantity
const cartTotalQuantityFromStorage = cartItemsFromStorage.reduce((sum, item) => sum + (item.quantity || 0), 0);

// الحالة الابتدائية
const initialState = {
    skinType: {
        selected: skinTypeFromStorage,
    },
    cart: {
        items: cartItemsFromStorage,
        totalQuantity: cartTotalQuantityFromStorage,
    },
    order: {
        lastOrder: null,
        error: null,
        loading: false,
    },
    allCategories: {},
    allProducts: {},
};

const middleware = [thunk];

// إنشاء الـ store
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
// console.log("الحالة الابتدائية للمتجر:", store.getState());

// حفظ skinType و cartItems في localStorage عند التغيير
store.subscribe(() => {
    const { skinType, cart } = store.getState();
    const currentSkinType = localStorage.getItem("skinType");
    const currentCartItems = localStorage.getItem("cartItems");

    if (currentSkinType !== JSON.stringify(skinType.selected)) {
        localStorage.setItem("skinType", JSON.stringify(skinType.selected));
    }
    if (currentCartItems !== JSON.stringify(cart.items)) {
        localStorage.setItem("cartItems", JSON.stringify(cart.items));
    }
});

export default store;
