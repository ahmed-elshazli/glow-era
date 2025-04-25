// ✅ Action Types
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER = "CREATE_ORDER";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";

export const UPDATE_ORDER_STATUS_REQUEST = "UPDATE_ORDER_STATUS_REQUEST";
export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
export const UPDATE_ORDER_STATUS_ERROR = "UPDATE_ORDER_STATUS_ERROR";

import baseURL from "../../Api/baseURL";

// ✅ إنشاء طلب كاش (عادي)
// في ملف actions/orderAction.js
export const createOrder = (orderData, cartId) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const { auth } = getState();
        const token = auth?.token || localStorage.getItem("token");

        if (!token) throw new Error("Authentication token not found.");
        if (!cartId) throw new Error("Cart ID is required.");

        const response = await baseURL.post(`/api/v1/orders/${cartId}`, orderData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: CREATE_ORDER,
            payload: response.data,
        });

        return response.data;
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_ERROR,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};


// ✅ تحديث حالة الطلب إلى مدفوع (مثلاً بعد الدفع أو من لوحة الإدارة)
export const updateOrderStatus = (orderId, isPaid) => async (dispatch, getState) => {
    try {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

        const { auth } = getState();
        const token = auth?.token || localStorage.getItem("token");

        if (!token) throw new Error("Authentication token not found.");

        const response = await baseURL.put(
            `/api/v1/orders/${orderId}/deliver`,
            { isPaid },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        dispatch({
            type: UPDATE_ORDER_STATUS,
            payload: { orderId, isPaid },
        });

        return response.data;
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_STATUS_ERROR,
            payload: error.response?.data?.message || error.message,
        });
        throw error;
    }
};  

// ✅ Stripe Checkout: الانتقال إلى صفحة الدفع
export const goToStripeCheckout = (cartId) => async (dispatch, getState) => {
    try {
        const { auth } = getState();
        const token = auth?.token || localStorage.getItem("token");

        if (!token) throw new Error("Authentication token not found");
        if (!cartId) throw new Error("Cart ID is required for checkout session");

        // إرسال طلب لـ Checkout Session باستخدام cartId
        const response = await baseURL.get(`/api/v1/orders/checkout-session/${cartId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // تحقق من حالة الرد وفتح الرابط
        if (response.data.status === "success" && response.data.data.url) {
            window.location.href = response.data.data.url; // التوجيه إلى رابط الدفع
        } else {
            throw new Error("فشل في الحصول على رابط الدفع.");
        }
    } catch (error) {
        console.error("Stripe checkout error:", error);
        toast.error(error.message || "حدث خطأ أثناء عملية الدفع.", {
            position: "top-center",
        });
    }
};
