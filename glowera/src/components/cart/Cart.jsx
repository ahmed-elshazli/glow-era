import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import progress from "../../assets/progress.png";
import mc from "../../assets/Mastercard.png";
import visa from "../../assets/Visa.png";
import cashIcon from "../../assets/cash.svg";
import apple from "../../assets/ApplePay.png";
import google from "../../assets/GooglePay.png";
import paypal from "../../assets/PayPal.png";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, fetchCart } from "../../redux/actions/cartAction";

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const items = Array.isArray(cart.items) ? cart.items.filter((item) => item !== null && item.price !== undefined) : [];

    const totalQuantity = items.reduce((total, item) => total + (item.quantity || 0), 0);
    const subtotal = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleCheckout = () => {
        if (items.length === 0) {
            toast.error("Cart is empty! Please add products before checkout.", {
                position: "top-center",
            });
            return;
        }
        navigate("/payment");
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 pt-16 sm:pt-20">
            {/* Progress Bar */}
            <div className="flex justify-center mb-4 sm:mb-6">
                <img src={progress} alt="Progress" className="w-full max-w-xs sm:max-w-sm" />
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 pl-0 sm:pl-10">
                    {/* Cart Items Table */}
                    <div className="w-full lg:w-3/4 overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left border-b-2 border-[#C57A84] text-[#3D1C1E]">
                                    <th className="py-2 sm:py-3">Product</th>
                                    <th className="py-2 sm:py-3">Price</th>
                                    <th className="py-2 sm:py-3">Quantity</th>
                                    <th className="py-2 sm:py-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 sm:py-8 text-[#5C0A25]">
                                            Your cart is empty.
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={`${item._id}-${item.size}`} className="border-b border-[#C57A84] relative">
                                            <td className="py-2 sm:py-4 flex items-center gap-3 sm:gap-4">
                                                <img
                                                    src={item.images?.[0] || "/fallback-image.png"}
                                                    alt={item.title || "Product not available"}
                                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <h4 className="text-base sm:text-lg font-semibold text-[#3D1C1E]">{item.title || "Product not available"}</h4>
                                                    <span className="text-xs sm:text-sm text-gray-500">({item.category || "Unknown"})</span>
                                                    <span className="block text-xs sm:text-sm text-gray-500">Size: {item.size || "Unknown"}</span>
                                                </div>
                                            </td>
                                            <td className="py-2 sm:py-4 font-bold text-[#3D1C1E] text-sm sm:text-base">EGP {item.price || "N/A"}</td>
                                            <td className="py-2 sm:py-4 text-center">
                                                <div className={`w-8 sm:w-10 text-center text-sm sm:text-base ${item.quantity === 0 ? "text-red-500" : ""}`}>
                                                    {item.quantity === 0 ? "Out of Stock" : item.quantity}
                                                </div>
                                            </td>
                                            <td className="py-2 sm:py-4 font-bold text-[#3D1C1E] text-sm sm:text-base">EGP {(item.price || 0) * (item.quantity || 0)}</td>
                                            <span
                                                className="absolute right-2 sm:right-3 top-2 sm:top-3 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center cursor-pointer text-[#5C0A25]"
                                                onClick={() => dispatch(removeFromCart(item._id))}>
                                                <FaTimes className="text-sm sm:text-base" />
                                            </span>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-1/4 bg-[#FCE8EF] p-4 sm:p-6 rounded-lg border border-[#C57A84]">
                        <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#3D1C1E]">
                            Order Summary ({totalQuantity} {totalQuantity === 1 ? "item" : "items"}):
                        </h3>
                        <div className="flex items-center mb-3">
                            <input
                                type="text"
                                placeholder="Discount code"
                                className="w-full px-3 sm:px-4 py-1 sm:py-2 border-none bg-[#FAD1DF] rounded-lg rounded-br-none rounded-tr-none focus:outline-none focus:ring-2 focus:ring-[#F6A5B3] text-sm sm:text-base"
                            />
                            <button className="bg-[#FAD1DF] text-[#5C0A25] px-3 sm:px-4 py-1 sm:py-2 rounded-br-lg rounded-tr-lg hover:bg-[#f0b3c7] transition text-sm sm:text-base">Apply</button>
                        </div>
                        <div className="flex justify-between text-base sm:text-lg font-semibold text-[#3D1C1E] mt-4">
                            <span>Subtotal</span>
                            <span>EGP {subtotal || 0}</span>
                        </div>
                        <button onClick={handleCheckout} className="w-full bg-[#EC467E] text-[#FCE4EC] py-2 sm:py-3 rounded-lg mt-4 sm:mt-6 hover:bg-[#D93D71] transition text-sm sm:text-base">
                            CHECKOUT
                        </button>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-8 sm:mt-10 pt-8 sm:pt-12">
                    <h3 className="text-base sm:text-lg font-medium text-[#5C0A2580] mb-3 sm:mb-4 text-center">Available payment methods</h3>
                    <div className="flex justify-center flex-wrap gap-2 sm:gap-4">
                        <img src={cashIcon} alt="Cash" className="h-12 sm:h-20 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200" />
                        {/* <img src={mc} alt="Mastercard" className="h-12 sm:h-20 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200" /> */}
                        <img src={visa} alt="Visa" className="h-12 sm:h-20 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200" />
                        {/* <img src={apple} alt="Apple Pay" className="h-12 sm:h-20 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200" /> */}
                        {/* <img src={google} alt="Google Pay" className="h-12 sm:h-20 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200" /> */}
                        {/* <img src={paypal} alt="Paypal" className="h-12 sm:h-20 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
