import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import skinTypeReducer from "./skinTypeReducer";
import orderReducer from "./orderReducer";
import categoryReducer from "./categoryReducer";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    skinType: skinTypeReducer,
    order: orderReducer,
    allCategories: categoryReducer,
    allProducts: productsReducer,
});

export default rootReducer;
