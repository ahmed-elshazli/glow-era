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
        try {
            if (!user || !user._id) {
                toast.error("الرجاء تسجيل الدخول أولاً.");
                return;
            }

            if (!isValidPhone(userDetails.phone)) {
                toast.error("رقم الهاتف غير صالح. يجب أن يكون بين 10 و15 رقم.");
                return;
            }

            const orderData = {
                cartId,
                paymentMethod: "cash",
                shippingAddress: {
                    location: userDetails.location,
                    phone: userDetails.phone,
                },
            };

            await dispatch(createOrder(orderData));
            toast.success("تم إنشاء الطلب بنجاح!");

            // ✅ إغلاق البوب أب تلقائيًا بعد الدفع
            setTimeout(() => {
                setShowPopup(false);
                navigate("/order-success"); // ✅ غيّر المسار حسب اللي تبيه
            }, 1000);
        } catch (error) {
            toast.error(error.message || "فشل في إنشاء الطلب.");
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
