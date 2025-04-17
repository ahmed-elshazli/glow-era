import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import LoginHook from "../../hooks/auth/login-hook";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const emailFromRegister = location.state?.email || "";

    const [email, password, loading, onChangeEmail, onChangePassword, onSubmit] = LoginHook();

    const [showPassword, setShowPassword] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (emailFromRegister) {
            onChangeEmail({ target: { value: emailFromRegister } });
        }
    }, [emailFromRegister, onChangeEmail]);

    const handleSocialLogin = (platform) => {
        console.log(`Logging in with ${platform}`);
        setTimeout(() => {
            navigate("/dashboard");
        }, 1000);
    };

    const handleRegisterClick = () => {
        setIsAnimating(true);
    };

    const onAnimationComplete = () => {
        if (isAnimating) {
            navigate("/register");
            setIsAnimating(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FCE4EC] p-4">
            <div className="relative flex flex-col bg-[#F5A3C0] md:flex-row w-full max-w-5xl h-auto md:h-[600px] rounded-2xl overflow-hidden shadow-lg">
                {/* قسم الترحيب */}
                <AnimatePresence>
                    <motion.div
                        className="absolute md:static w-full md:w-1/2 bg-[#F0759E] p-8 md:p-12 flex flex-col justify-center items-center text-center rounded-br-[100px] md:rounded-br-[150px] rounded-tr-[100px] md:rounded-tr-[150px] z-10"
                        initial={{ scale: 1 }}
                        animate={isAnimating ? { scale: 2, x: "50%", borderRadius: "0px" } : { scale: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onAnimationComplete={onAnimationComplete}>
                        <motion.div initial={{ opacity: 1, scale: 1 }} animate={isAnimating ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Hello, Welcome!</h2>
                            <p className="text-white text-lg md:text-xl mb-6">Don't have an account?</p>
                            <button
                                onClick={handleRegisterClick}
                                className="bg-transparent border-2 border-white text-white px-6 py-2 md:px-8 md:py-3 text-lg rounded-xl hover:bg-white hover:text-[#F6A5B3] transition duration-200">
                                REGISTER NOW
                            </button>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* نموذج تسجيل الدخول */}
                <motion.div
                    className="w-full md:w-1/2 bg-[#F5A3C0] p-8 md:p-12 flex flex-col justify-center"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isAnimating ? { opacity: 0, x: 20, filter: "blur(3px)" } : { opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-[#FCE8EF] mb-6 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}>
                        LOGIN
                    </motion.h2>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}>
                        <motion.div className="mb-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                            <label className="block text-xl md:text-2xl text-[#5C0A25] mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder="@gmail.com"
                                className="w-full px-4 py-2 md:py-3 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F6A5B3] text-[#5C0A25] placeholder-[#5C0A2580] text-base md:text-lg"
                                disabled={loading}
                                required
                            />
                        </motion.div>

                        <motion.div className="mb-4 relative" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <label className="block text-xl md:text-2xl text-[#5C0A25] mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={onChangePassword}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 md:py-3 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F6A5B3] text-[#5C0A25] placeholder-[#5C0A2580] text-base md:text-lg"
                                disabled={loading}
                                required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-12 md:top-14 text-[#5C0A25] text-lg">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </motion.div>

                        <motion.div className="text-center mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                            <a href="/forgot-password" className="text-[#FCE8EF] text-sm md:text-base hover:underline">
                                Forget your password
                            </a>
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="w-full bg-[#EC467E] text-[#FCE4EC] py-3 rounded-lg hover:bg-[#D93D71] transition duration-200 text-lg md:text-xl font-semibold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            disabled={loading}>
                            {loading ? "Loading..." : "LOGIN"}
                        </motion.button>
                    </form>

                    <motion.div className="mt-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                        <p className="text-[#FCE8EF] text-sm md:text-base mb-4">Or login with social platform</p>
                        <div className="flex justify-center space-x-4">
                            {[
                                { platform: "Facebook", icon: <FaFacebookF /> },
                                { platform: "Google", icon: <FaGoogle /> },
                                { platform: "Twitter", icon: <FaTwitter /> },
                                { platform: "LinkedIn", icon: <FaLinkedinIn /> },
                            ].map((social, index) => (
                                <motion.button
                                    key={social.platform}
                                    onClick={() => handleSocialLogin(social.platform)}
                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#FAD1DF] rounded-full text-[#5C0A25] hover:bg-[#F6A5B3] hover:text-white transition duration-200 text-lg md:text-xl"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    disabled={loading}>
                                    {social.icon}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Login;
