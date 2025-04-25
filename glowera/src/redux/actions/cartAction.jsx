import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, FETCH_CART_REQUEST, FETCH_CART_SUCCESS, FETCH_CART_ERROR, CHECK_USER_ERROR, UPDATE_TOTAL_QUANTITY, UPDATE_CART } from "../type";

import baseURL from "../../Api/baseURL";
import { toast } from "react-toastify";

// Fetch the user's current cart from the server and populate product details
export const fetchCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: FETCH_CART_REQUEST });

        const { auth } = getState();
        const token = auth?.token || localStorage.getItem("token");

        if (!token) throw new Error("Authorization token not found");

        const cartResponse = await baseURL.get("/api/v1/carts", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const cartItems = cartResponse.data.data.cartItems;
        console.log("Cart data from server:", cartItems);

        const productIds = cartItems.map((item) => item.product);

        const productRequests = productIds.map((productId) =>
            baseURL.get(`/api/v1/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        );

        const productResponses = await Promise.all(productRequests);
        const products = productResponses.map((res) => res.data.data);

        const validItems = cartItems
            .map((item, index) => {
                const product = products[index];
                if (!product || !product.title) return null;
                return {
                    _id: item._id,
                    productId: item.product,
                    title: product.title,
                    category: product.category?.name,
                    price: item.price,
                    images: product.images || [],
                    quantity: item.quantity,
                    size: item.size,
                };
            })
            .filter((item) => item !== null);

        dispatch({
            type: FETCH_CART_SUCCESS,
            payload: {
                items: validItems,
                totalQuantity: validItems.reduce((total, item) => total + item.quantity, 0),
                cartId: cartResponse.data.data._id,
            },
        });

        if (validItems.length < cartItems.length) {
            toast.warn("Some invalid items were removed from the cart.", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    } catch (error) {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || "Failed to fetch cart data";

        if (status === 401) {
            dispatch({
                type: CHECK_USER_ERROR,
                payload: { error: "Session expired. Please log in again." },
            });
        } else if (status === 404) {
            dispatch({
                type: FETCH_CART_SUCCESS,
                payload: { items: [], totalQuantity: 0, cartId: null },
            });
            dispatch(createCartIfNotExists());
        } else {
            dispatch({ type: FETCH_CART_ERROR, payload: errorMessage });
            toast.error(errorMessage, { position: "top-center" });
        }
    }
};



// Create a cart if it doesn't exist
export const createCartIfNotExists = () => async (dispatch, getState) => {
    try {
        const { auth } = getState();
        const token = auth?.token || localStorage.getItem("token");
        if (!token) return;

        await baseURL.post(
            "/api/v1/carts",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        dispatch(fetchCart());
    } catch (error) {
        console.error("createCartIfNotExists error:", error.response?.data);
        toast.error(error.response?.data?.message || "Failed to create cart.", {
            position: "top-center",
        });
    }
};

// Add a product to the cart
export const addToCart = (productData) => async (dispatch, getState) => {
    try {
        const { auth, cart } = getState();
        const token = auth?.token || localStorage.getItem("token");

        if (!token) {
            toast.error("Please log in first.", { position: "top-center" });
            return;
        }

        // التأكد من الكمية
        const quantity = parseInt(productData.quantity, 10) || 1;
        if (quantity < 1) {
            toast.error("Quantity must be at least 1.", { position: "top-center" });
            return;
        }

        const requestData = {
            productId: productData._id || productData.productId,
            size: productData.size,
            quantity: quantity,
        };

        const response = await baseURL.post("/api/v1/carts", requestData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        console.log("Add to cart response:", response.data);

        if (response.data.status === "success") {
            // عند نجاح إضافة المنتج إلى السلة، نقوم بتحديث السلة من الرد
            const updatedCartItems = response.data.data.cartItems;
            const totalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);

            // تحديث السلة في Redux
            dispatch({
                type: UPDATE_CART,
                payload: updatedCartItems,
            });

            // تحديث الكمية الإجمالية
            dispatch({
                type: UPDATE_TOTAL_QUANTITY,
                payload: totalQuantity,
            });
        } else {
            toast.error("Failed to add product to cart.", { position: "top-center" });
        }
    } catch (error) {
        console.error("Add to cart error:", error);
        toast.error(error.response?.data?.message || "An error occurred while adding to cart.", {
            position: "top-center",
        });
    }
};




// Remove an item from the cart
export const removeFromCart = (itemId) => async (dispatch, getState) => {
    try {
        const { auth } = getState();
        const token = auth?.token || localStorage.getItem("token");

        if (!token) {
            toast.error("Please log in first.", { position: "top-center" });
            return;
        }

        console.log("Sending remove from cart request:", itemId);
        const response = await baseURL.delete(`/api/v1/carts/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Remove item response:", response.data);
        if (response.data.status === "success") {
            dispatch(fetchCart());
            toast.success("Product removed from cart successfully!", {
                position: "top-center",
                autoClose: 2000,
                style: {
                    backgroundColor: "#FCE8EF",
                    color: "#5C0A25",
                    fontWeight: "bold",
                    fontFamily: "inherit",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                },
                icon: "🛒",
            });
        } else {
            toast.error("Failed to remove product from cart.", { position: "top-center" });
        }
    } catch (error) {
        console.error("Remove item error:", error.response?.data);
        toast.error(error.response?.data?.message || "An error occurred while removing the product.", {
            position: "top-center",
        });
    }
};

// Update quantity locally (Redux only)
export const updateQuantity = (id, quantity) => ({
    type: UPDATE_QUANTITY,
    payload: { id, quantity },
});

// Sync cart quantities with the server
export const syncCart = () => async (dispatch, getState) => {
    try {
        const { auth, cart } = getState();
        const token = auth?.token || localStorage.getItem("token");

        if (!token) {
            toast.error("Please log in first.", { position: "top-center" });
            return false;
        }

        const items = cart.items || [];
        if (!items.length) {
            console.log("No items in the cart to sync.");
            return true;
        }

        const updateRequests = items.map((item) =>
            baseURL
                .put(
                    `/api/v1/carts/${item._id}`,
                    { quantity: item.quantity },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    },
                )
                .catch((error) => {
                    console.error(`Failed to update quantity for item ${item._id}:`, error.response?.data);
                    return { error: true, itemId: item._id };
                }),
        );

        const responses = await Promise.all(updateRequests);

        const failedUpdates = responses.filter((res) => res?.error);
        if (failedUpdates.length > 0) {
            toast.error("Failed to sync some item quantities with the server.", { position: "top-center" });
            console.log("Failed items:", failedUpdates);
            return false;
        }

        await dispatch(fetchCart());
        toast.success("Cart synced successfully with the server!", { position: "top-center" });
        return true;
    } catch (error) {
        console.error("Sync cart error:", error.response?.data);
        toast.error(error.response?.data?.message || "An error occurred while syncing the cart.", {
            position: "top-center",
        });
        return false;
    }
};
