import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/authAction";
import logo from "../../assets/skincare_7348016 1.svg";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isAuthenticated } = useSelector((state) => state.auth || { user: null, isAuthenticated: false });
    const totalQuantity = useSelector((state) => state.cart.totalQuantity || 0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsVisible(prevScrollY > currentScrollY || currentScrollY < 10);
            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    const handleLogout = () => {
        dispatch(logoutUser(navigate));
    };

    const navLinks = [
        { name: "HOME", path: "/home" },
        { name: "ABOUT US", path: "/about-us", sectionId: "about" },
        { name: "SHOP", path: "/shop" },
        { name: "CONTACT US", path: "/contact-us" },
    ];

    const handleScrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
        }
    };

    const isShopCartOrProductPage = location.pathname === "/shop" || location.pathname === "/cart" || location.pathname.startsWith("/product/");
    const isHomeOrRootPage = location.pathname === "/" || location.pathname === "/home";

    // استخراج اسم المستخدم بدقة حسب الحقول المحتملة
    // استخراج اسم المستخدم بدقة حسب الحقول المحتملة
    const userName = `${user?.fristName || ""} ${user?.lastName || ""}`.trim() || "User";

    return (
        <nav className={`w-full flex justify-between items-center px-6 md:px-10 py-4 fixed top-0 left-0 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            {/* Logo */}
            <div className="flex items-center gap-3">
                <Link to="/">
                    <img src={logo} alt="logo" className="h-[40px] w-auto" />
                </Link>
                <Link to="/" className="text-2xl md:text-2xl font-bold text-[#EB477E]">
                    <h1>Glow Era</h1>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex gap-6 text-[#EB477E] font-medium">
                {navLinks.map((link) => (
                    <li key={link.name}>
                        {link.sectionId ? (
                            <button onClick={() => handleScrollToSection(link.sectionId)} className="relative group transition hover:text-[#EC4680]">
                                {link.name}
                                <span
                                    className={`absolute left-0 bottom-[-2px] h-[2px] bg-[#EC4680] transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100 w-full ${
                                        location.pathname === link.path ? "scale-x-100" : ""
                                    }`}></span>
                            </button>
                        ) : (
                            <Link to={link.path} className="relative group transition hover:text-[#EC4680]">
                                {link.name}
                                <span
                                    className={`absolute left-0 bottom-[-2px] h-[2px] bg-[#EC4680] transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100 w-full ${
                                        location.pathname === link.path ? "scale-x-100" : ""
                                    }`}></span>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>

            {/* Right buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
                {isShopCartOrProductPage && (
                    <Link
                        to="/cart"
                        className="flex items-center gap-2 w-10 h-10 justify-center bg-[#B6226A] text-white rounded-full hover:bg-white hover:text-[#EC4680] border border-transparent hover:border-[#EC4680] transition">
                        <div className="relative flex items-center justify-center">
                            <FaShoppingCart className="text-lg" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-[#EC4680] text-[10px] min-w-[18px] h-[18px] px-[2px] flex items-center justify-center rounded-full font-bold border border-[#EC4680] leading-none">
                                    {totalQuantity}
                                </span>
                            )}
                        </div>
                    </Link>
                )}
                {isHomeOrRootPage && (
                    <>
                        {isAuthenticated && user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-[#EC4680] capitalize">Hi, {userName}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-white hover:text-red-500 border border-transparent hover:border-red-500 transition">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="px-6 py-2 bg-[#EC4680] text-white rounded-lg hover:bg-white hover:text-[#EC4680] border border-transparent hover:border-[#EC4680] transition">
                                Login
                            </Link>
                        )}
                    </>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-gray-800 text-2xl" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                {isOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Mobile Menu */}
            <div
                className={`absolute top-16 left-0 w-full bg-[#FBECEB] shadow-md py-5 flex flex-col items-center gap-4 md:hidden transition-all ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}>
                {navLinks.map((link) =>
                    link.sectionId ? (
                        <button
                            key={link.name}
                            className={`transition hover:text-[#EC4680] text-lg ${location.pathname === link.path ? "font-bold underline" : ""}`}
                            onClick={() => handleScrollToSection(link.sectionId)}>
                            {link.name}
                        </button>
                    ) : (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`transition hover:text-[#EC4680] text-lg ${location.pathname === link.path ? "font-bold underline" : ""}`}
                            onClick={() => setIsOpen(false)}>
                            {link.name}
                        </Link>
                    ),
                )}
                {isShopCartOrProductPage && (
                    <Link to="/cart" className="flex items-center gap-2 text-lg text-[#EB477E] hover:text-[#EC4680]" onClick={() => setIsOpen(false)}>
                        <FaShoppingCart />
                        {totalQuantity > 0 && <span>({totalQuantity})</span>}
                    </Link>
                )}
                {isHomeOrRootPage && (
                    <>
                        {isAuthenticated && user ? (
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-sm font-medium text-[#EC4680] capitalize">Hi, {userName}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-white hover:text-red-500 border border-transparent hover:border-red-500 transition">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="px-6 py-2 bg-[#EC4680] text-white rounded-lg hover:bg-white hover:text-[#EC4680] border border-transparent hover:border-[#EC4680] transition">
                                Login
                            </Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}
