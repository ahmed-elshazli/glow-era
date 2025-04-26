import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import process from "../../assets/paymentProcess.png";
import visa from "../../assets/Visa2.png";
import cashIcon from "../../assets/cash.svg";

import OrderPayCashHook from "../../hooks/checkout/order-pay-cash-hook";
import { checkUser } from "../../redux/actions/authAction";
import { fetchCart, createCartIfNotExists } from "../../redux/actions/cartAction";
import { goToStripeCheckout } from "../../redux/actions/orderAction";

function Payment() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const cartItems = cart.items || [];
    const cartId = cart.cartId;
    const cartLoading = cart.loading;
    const cartError = cart.error;

    
    const { showPopup, setShowPopup, userDetails, handleCashPayment, handleCashSubmit, handleInputChange } = OrderPayCashHook();

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (!isAuthenticated || !user?._id) {
            if (token) dispatch(checkUser());
            else navigate("/login");
        }
        dispatch(fetchCart());
    }, [isAuthenticated, user, navigate, dispatch]);

    const handleVisaPayment = async () => {
        try {
            if (cartItems.length === 0) {
                toast.error("Your cart is empty! Please add items before checking out.", {
                    position: "top-center",
                });
                navigate("/cart"); // توجيه المستخدم إلى السلة
                return;
            }

            if (!cartId) {
                // محاولة إنشاء سلة إذا لزم الأمر
                await dispatch(createCartIfNotExists());
                const updatedCart = useSelector((state) => state.cart);
                if (!updatedCart.cartId) {
                    throw new Error("Failed to create basket. Try again.");
                }
                dispatch(goToStripeCheckout(updatedCart.cartId));
            } else {
                dispatch(goToStripeCheckout(cartId));
            }
        } catch (error) {
            toast.error(error.message || "Payment processing failed.", {
                position: "top-center",
            });
        }
    };


    if (authLoading || cartLoading) return <p>Loading...</p>;
    if (cartError) return <p className="text-red-500 text-center">{cartError}</p>;

    return (
        <>
            <div className="container h-screen mx-auto p-6 pt-20 bg-[#FCE4EC]">
                <button onClick={() => navigate("/cart")} className="mb-4 text-[#EC4680] hover:underline">
                    Back to Cart
                </button>
                <div className="flex justify-center mb-6">
                    <img src={process} alt="Progress" className="w-full max-w-sm" />
                </div>
                <div className="mt-10 pt-12">
                    <h3 className="text-lg font-medium text-[#5C0A2580] mb-4 text-center">Available Payment Methods</h3>
                    <div className="flex justify-center gap-6">
                        <img src={cashIcon} alt="Cash" className="cursor-pointer h-20" onClick={handleCashPayment} />
                        <img src={visa} alt="Visa" className="cursor-pointer h-20" onClick={handleVisaPayment} />
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-medium text-[#5C0A27] mb-4">Enter Delivery Details</h3>
                        <form onSubmit={handleCashSubmit}>
                            <input type="text" name="location" value={userDetails.location} onChange={handleInputChange} placeholder="Location" required className="w-full p-2 border rounded mb-4" />
                            <input type="tel" name="phone" value={userDetails.phone} onChange={handleInputChange} placeholder="Phone Number" required className="w-full p-2 border rounded mb-4" />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowPopup(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-200">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-[#EC4680] text-white px-4 py-2 rounded hover:bg-[#ec4680d0]">
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Payment;
