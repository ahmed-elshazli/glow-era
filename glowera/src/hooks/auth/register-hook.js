import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../redux/actions/authAction";

const RegisterHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const onChangeFName = (e) => setFName(e.target.value);
    const onChangeLName = (e) => setLName(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    const validationValues = () => {
        const nameRegex = /^[A-Za-z\u0600-\u06FF\s]{2,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;

        if (!nameRegex.test(fname)) {
            toast.error("First name must contain at least two letters and be valid.", { position: "top-center" });
            return false;
        }

        if (!nameRegex.test(lname)) {
            toast.error("The last name must contain at least two letters and be valid.", { position: "top-center" });
            return false;
        }

        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.", { position: "top-center" });
            return false;
        }

        if (!passwordRegex.test(password)) {
            toast.error("The password must be at least 8 characters long, and contain an uppercase letter, number, and symbol.", { position: "top-center" });
            return false;
        }

        return true;
    };

    const OnSubmit = async () => {
        const isValid = validationValues();
        if (!isValid) return false;

        setLoading(true);

        const data = await dispatch(
            createNewUser({
                fristName: fname,
                lastName: lname,
                email,
                password,
                confirmPassword: password,
                role: "user",
            }),
        );

        if (data?.token) {
            localStorage.setItem("token", data.token);
            toast.success("Registration successful 🎉", { position: "top-center" });
            setFName("");
            setLName("");
            setEmail("");
            setPassword("");
            navigate("/login", { state: { email } });
        } else {
            const errorMsg = data?.errors?.[0]?.msg || data?.message || "Registration failed. Please try again.";
            toast.error(errorMsg, { position: "top-center" });
        }

        setLoading(false);
        return !!data?.token;
    };

    return {
        fname,
        lname,
        email,
        password,
        loading,
        showPassword,
        onChangeFName,
        onChangeLName,
        onChangeEmail,
        onChangePassword,
        toggleShowPassword,
        OnSubmit,
    };
};

export default RegisterHook;
