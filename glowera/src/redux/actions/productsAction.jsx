import useGetData from "../../hooks/useGetData";
import { GET_ALL_PRODUCTS, GET_PRODUCTS_ERROR, CHECK_USER_ERROR } from "../type";
import { toast } from "react-toastify";

export const getAllProducts =
    (categoryId = null) =>
    async (dispatch, getState) => {
        try {
            const { auth } = getState();
            const token = auth?.token || localStorage.getItem("token");

            // ✅ استخدم الفلترة الصحيحة بالـ query param
            const endpoint = categoryId ? `/api/v1/products?category=${categoryId}` : `/api/v1/products`;

            const response = await useGetData(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            // console.log("📦 Response from API:", response);

            const productsData = response.data.data || response.data || [];

            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: productsData,
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch products";
            console.error("❌ Error fetching products:", errorMessage);

            if (error.response?.status === 400 || error.response?.status === 401) {
                dispatch({
                    type: CHECK_USER_ERROR,
                    payload: { error: "Session expired. Please log in again." },
                });
                toast.error("Session expired. Please log in again.");
            } else {
                dispatch({
                    type: GET_PRODUCTS_ERROR,
                    payload: errorMessage,
                });
                toast.error(errorMessage);
            }
        }
    };
