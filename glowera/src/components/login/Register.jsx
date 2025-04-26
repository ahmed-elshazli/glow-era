import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import RegisterHook from "../../hooks/auth/register-hook";

function Register() {
    const navigate = useNavigate();
    const { fname, lname, email, password, loading, showPassword, onChangeFName, onChangeLName, onChangeEmail, onChangePassword, toggleShowPassword, OnSubmit } = RegisterHook();

    const [isAnimating, setIsAnimating] = useState(false);

    // Handle virtual keyboard on mobile devices
    useEffect(() => {
        const handleViewportChange = () => {
            window.scrollTo(0, 0);
            document.body.style.height = `${window.visualViewport.height}px`;
        };

        window.visualViewport.addEventListener("resize", handleViewportChange);
        return () => window.visualViewport.removeEventListener("resize", handleViewportChange);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await OnSubmit();
    };

    const handleSocialLogin = (platform) => {
        console.log(`Logging in with ${platform}`);
        setTimeout(() => {
            navigate("/dashboard");
        }, 1000);
    };

    const handleLoginClick = () => {
        setIsAnimating(true);
    };

    const onAnimationComplete = () => {
        if (isAnimating) {
            navigate("/login");
            setIsAnimating(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FCE4EC] p-2 sm:p-4">
            <div className="relative flex flex-col md:flex-row bg-[#F5A3C0] w-full max-w-md md:max-w-5xl h-auto md:h-[600px] rounded-2xl overflow-hidden shadow-lg">
                {/* Form Section */}
                <motion.div
                    className="w-full md:w-1/2 bg-[#F5A3C0] p-6 sm:p-8 md:p-12 flex flex-col justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isAnimating ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}>
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#FCE8EF] mb-6 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}>
                        REGISTRATION
                    </motion.h2>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <motion.div className="w-full md:w-1/2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.3 }}>
                                <label className="text-base sm:text-lg md:text-xl text-[#5C0A25] mb-2 block">First Name</label>
                                <input
                                    type="text"
                                    value={fname}
                                    onChange={onChangeFName}
                                    placeholder="Rehab"
                                    className="w-full px-4 py-2 sm:py-3 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F6A5B3] text-[#5C0A25] placeholder-[#5C0A2580] text-sm sm:text-base md:text-lg"
                                    required
                                />
                            </motion.div>
                            <motion.div className="w-full md:w-1/2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.4 }}>
                                <label className="text-base sm:text-lg md:text-xl text-[#5C0A25] mb-2 block">Last Name</label>
                                <input
                                    type="text"
                                    value={lname}
                                    onChange={onChangeLName}
                                    placeholder="Awad"
                                    className="w-full px-4 py-2 sm:py-3 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F6A5B3] text-[#5C0A25] placeholder-[#5C0A2580] text-sm sm:text-base md:text-lg"
                                    required
                                />
                            </motion.div>
                        </div>

                        <motion.div className="mb-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.5 }}>
                            <label className="text-base sm:text-lg md:text-xl text-[#5C0A25] mb-2 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder="@gmail.com"
                                className="w-full px-4 py-2 sm:py-3 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F6A5B3] text-[#5C0A25] placeholder-[#5C0A2580] text-sm sm:text-base md:text-lg"
                                required
                            />
                        </motion.div>

                        <motion.div className="mb-4 relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.6 }}>
                            <label className="text-base sm:text-lg md:text-xl text-[#5C0A25] mb-2 block">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={onChangePassword}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 sm:py-3 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F6A5B3] text-[#5C0A25] placeholder-[#5C0A2580] text-sm sm:text-base md:text-lg"
                                required
                            />
                            <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-10 sm:top-12 md:top-14 text-[#5C0A25] text-base sm:text-lg">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="w-full bg-[#EC467E] text-[#FCE4EC] py-2 sm:py-3 rounded-lg hover:bg-[#D93D71] transition duration-200 text-base sm:text-lg md:text-xl font-semibold"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            disabled={loading}>
                            {loading ? "Processing..." : "REGISTER NOW"}
                        </motion.button>
                    </form>

                    <motion.div className="mt-4 sm:mt-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                        <p className="text-[#FCE8EF] text-xs sm:text-sm md:text-base mb-4">Or login with social platform</p>
                        <div className="flex justify-center space-x-2 sm:space-x-4">
                            {[
                                { platform: "Facebook", icon: <FaFacebookF /> },
                                { platform: "Google", icon: <FaGoogle /> },
                                { platform: "Twitter", icon: <FaTwitter /> },
                                { platform: "LinkedIn", icon: <FaLinkedinIn /> },
                            ].map((social, index) => (
                                <motion.button
                                    key={social.platform}
                                    onClick={() => handleSocialLogin(social.platform)}
                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#FAD1DF] rounded-full text-[#5C0A25] hover:bg-[#F6A5B3] hover:text-white transition duration-200 text-base sm:text-lg md:text-xl"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    disabled={loading}>
                                    {social.icon}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Welcome Section */}
                <AnimatePresence>
                    <motion.div
                        className="relative md:static w-full md:w-1/2 bg-[#F0759E] p-6 sm:p-8 md:p-12 flex flex-col justify-center items-center text-center rounded-bl-[80px] md:rounded-bl-[150px] rounded-tl-[80px] md:rounded-tl-[150px] z-10"
                        initial={{ scale: 1 }}
                        animate={isAnimating ? { scale: 1.5, x: "-50%", borderRadius: "0px" } : { scale: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        onAnimationComplete={onAnimationComplete}>
                        <motion.div initial={{ opacity: 1, scale: 1 }} animate={isAnimating ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4">Welcome back!</h2>
                            <p className="text-white text-sm sm:text-base md:text-xl mb-6">Already have an account?</p>
                            <button
                                onClick={handleLoginClick}
                                className="bg-transparent border-2 border-white text-white px-4 py-1 sm:px-6 sm:py-2 md:px-8 md:py-3 text-base sm:text-lg md:text-xl rounded-xl hover:bg-white hover:text-[#F6A5B3] transition duration-200">
                                LOGIN
                            </button>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Register;
