// src/redux/actions/logoutAction.js
import { SET_USER } from "../type";

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: SET_USER, payload: null }); // مسح المستخدم من redux
};
