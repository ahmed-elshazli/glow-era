// components/LogoutButton.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/logoutAction";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = localStorage.getItem("token"); // نتحقق هل فيه مستخدم داخل

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    if (!token) return null; // إذا ما فيه مستخدم مخزن، ما نظهر الزر

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
