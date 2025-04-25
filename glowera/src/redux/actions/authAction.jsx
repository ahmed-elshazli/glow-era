import { CREATE_NEW_USER, LOGIN_USER, SET_USER, LOGOUT_USER } from "../type";
import { useInsertData } from "../../hooks/useinsertData";
import baseURL from "../../Api/baseURL";
import { toast } from "react-toastify";
import { createCartIfNotExists } from "./cartAction";
import axios from "axios";

// ✅ دالة مساعدة لاستخراج المستخدم والتوكن من رد السيرفر
const extractUserAndToken = (data) => {
    const user = data?.data || data?.user || data?.userData || data;
    const token = data?.token || data?.accessToken;
    return { user, token };
};

// ✅ Interceptor لإضافة التوكن تلقائيًا مع كل طلب
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ==================== ✅ Check User ====================
export const checkUser = () => (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "null");

        console.log("checkUser (local only):", { token, user });

        if (!token || !user) {
            dispatch({
                type: SET_USER,
                payload: { user: null, token: null, loading: false },
            });
            return;
        }

        dispatch({
            type: SET_USER,
            payload: { user, token, loading: false },
        });

        dispatch(createCartIfNotExists());
    } catch (e) {
        console.error("checkUser error:", e.message);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({
            type: SET_USER,
            payload: { user: null, token: null, loading: false },
        });
    }
};

// ==================== ✅ Create New User ====================
export const createNewUser = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_NEW_USER, payload: { loading: true } });

        const response = await useInsertData("/api/v1/auth/signup", data);
        const { user, token } = extractUserAndToken(response.data);

        console.log("createNewUser API response:", response.data);

        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            dispatch({
                type: CREATE_NEW_USER,
                payload: { user, token, loading: false, error: null },
            });

            return response.data;
        } else {
            return response.data;
        }
    } catch (e) {
        const errorResponse = e.response?.data;

        console.error("createNewUser error:", errorResponse || e.message);

        dispatch({
            type: CREATE_NEW_USER,
            payload: { loading: false, error: errorResponse },
        });

        return errorResponse || { message: e.message };
    }
};

// ==================== ✅ Login ====================
export const loginUser = (data, navigate) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER, payload: { loading: true } });

        const response = await useInsertData("/api/v1/auth/login", data);
        console.log("loginUser API response:", response.data);

        const { user, token } = extractUserAndToken(response.data);

        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            console.log("loginUser: Data saved to localStorage:", { user, token });

            await dispatch(createCartIfNotExists());

            toast.success("تم تسجيل الدخول!");
            dispatch({
                type: LOGIN_USER,
                payload: { user, token, loading: false, error: null },
            });

            // navigate("/cart");
        } else {
            throw new Error("بيانات تسجيل الدخول غير مكتملة.");
        }

        return response?.data;
    } catch (e) {
        console.error("loginUser error:", e.response?.data || e.message);

        const errorMessage = e.response?.data?.message || e.message || "فشل تسجيل الدخول.";

        toast.error(errorMessage);
        dispatch({
            type: LOGIN_USER,
            payload: { loading: false, error: e.response || e.message },
        });

        return null;
    }
};

// ==================== ✅ Logout ====================
export const logoutUser = (navigate) => (dispatch) => {
    console.log("logoutUser: Removing data from localStorage");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({
        type: LOGOUT_USER,
        payload: { user: null, token: null, loading: false },
    });

    toast.success("تم تسجيل الخروج");
    // navigate("/login");
};

// ==================== ✅ Set User ====================
export const setUser = (user, token) => ({
    type: SET_USER,
    payload: { user, token, loading: false },
});
