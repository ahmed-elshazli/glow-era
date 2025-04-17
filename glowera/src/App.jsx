import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./redux/actions/authAction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Shop from "./pages/Shop";
import Error404 from "./components/Uitily/Error404";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import Success from "./components/cart/Success";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/login/Dashboard";
import Register from "./components/login/Register";
import ProductDetails from "./components/Shop/ProductDetials";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Uitily/ProtectedRoute";

function App() {
    const dispatch = useDispatch();
    const { loading: authLoading } = useSelector((state) => state.auth || { loading: false });
    const [isAppReady, setIsAppReady] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            await dispatch(checkUser());
            setIsAppReady(true);
        };
        initializeApp();
    }, [dispatch]);

    if (!isAppReady || authLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Landing />} />
                    <Route path="/" element={<Landing />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetailsPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Error404 />} />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <CartPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <ToastContainer position="top-right" autoClose={2000} />
            </BrowserRouter>
        </>
    );
}

export default App;
