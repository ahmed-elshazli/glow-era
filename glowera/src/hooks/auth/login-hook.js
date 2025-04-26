// LoginHook.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../redux/actions/authAction";

const LoginHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // الحصول على البريد الإلكتروني من الـ location
    const emailFromRegister = location.state?.email || "";

    const { user = null, isAuthenticated = false, loading: reduxLoading = false, error = null } = useSelector((state) => state.auth || {});

    const [email, setEmail] = useState(emailFromRegister); // تعيين البريد الإلكتروني من صفحة التسجيل
    const [password, setPassword] = useState("");
    const [localLoading, setLocalLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            toast.dismiss(); // تنظيف التوست القديم
            // toast.success("Login successful! Welcome back.", { position: "top-center" });
            if (user.role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/home"); // التوجيه إلى الصفحة الرئيسية
            }
        }
    }, [isAuthenticated, user, navigate]);

    useEffect(() => {
        setLocalLoading(reduxLoading);
    }, [reduxLoading]);

    useEffect(() => {
        if (error) {
            const errorMessage = error?.data?.message || "Login failed. Please check your credentials.";
            toast.error(errorMessage, { position: "top-center" });
        }
    }, [error]);

    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    const validation = () => {
        if (email.trim() === "" || password.trim() === "") {
            toast.error("Please fill in all fields.", { position: "top-center" });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.", { position: "top-center" });
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.", { position: "top-center" });
            return false;
        }

        return true;
    };

    const onSubmit = async () => {
        if (!validation()) return;

        setLocalLoading(true);
        await dispatch(loginUser({ email, password }, navigate));
    };

    return [email, password, localLoading, onChangeEmail, onChangePassword, onSubmit];
};

export default LoginHook;
