import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../redux/actions/orderAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderPayCashHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [userDetails, setUserDetails] = useState({
        location: "",
        phone: "",
    });

    // ✅ تحميل البيانات من localStorage عند بداية الكومبوننت
    useEffect(() => {
        const savedDetails = localStorage.getItem("userDetails");
        if (savedDetails) {
            setUserDetails(JSON.parse(savedDetails));
        }
    }, []);

    const cart = useSelector((state) => state.cart || { items: [], cartId: null });
    const { items: cartItems, cartId } = cart;

    const { user } = useSelector((state) => state.auth || { user: null });

    const handleCashPayment = () => {
        if (!cartItems || cartItems.length === 0) {
            toast.error("السلة فارغة، لا يمكن إتمام الطلب.");
            return;
        }
        setShowPopup(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updated = {
            ...userDetails,
            [name]: value,
        };
        setUserDetails(updated);
        localStorage.setItem("userDetails", JSON.stringify(updated)); // ✅ حفظ مؤقت
    };

    const isValidPhone = (phone) => {
        const regex = /^\d{10,15}$/;
        return regex.test(phone);
    };

    const handleCashSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            location: userDetails.location,
            phone: userDetails.phone,
            paymentMethod: "cash",
        };

        try {
            if (cartId) {
                await dispatch(createOrder(orderData, cartId));
                toast.success("Order placed successfully!", { position: "top-center" });
                navigate("/success"); // توجيه المستخدم إلى صفحة التأكيد
            } else {
                toast.error("Cart ID is missing!", { position: "top-center" });
            }
        } catch (error) {
            toast.error("Failed to create order.", { position: "top-center" });
        }
    };


    return {
        showPopup,
        setShowPopup,
        userDetails,
        handleCashPayment,
        handleCashSubmit,
        handleInputChange,
    };
};

export default OrderPayCashHook;
