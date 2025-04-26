import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaFacebookF, FaGoogle, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import RegisterHook from "../../hooks/auth/register-hook";

function Register() {
    const navigate = useNavigate();
    const { fname, lname, email, password, loading, showPassword, onChangeFName, onChangeLName, onChangeEmail, onChangePassword, toggleShowPassword, OnSubmit } = RegisterHook();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await OnSubmit();
        // if (success) {
        //     setTimeout(() => {
        //         navigate("/login", { state: { email } });
        //     }, 1000);
        // }
    };

    const handleSocialLogin = (platform) => {
        console.log(`Logging in with ${platform}`);
        setTimeout(() => {
            navigate("/dashboard");
        }, 1000);
    };

    const [isAnimating, setIsAnimating] = React.useState(false);

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
            <div className="relative flex flex-col bg-[#F5A3C0] md:flex-row w-full max-w-[90%] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-auto md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">
                {/* Left Section - Form */}
                <motion.div
                    className="w-full md:w-1/2 bg-[#F5A3C0] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isAnimating ? { opacity: 0, x: -20, filter: "blur(3px)" } : { opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}>
                    <motion.h2 className="text-4xl font-bold text-[#FCE8EF] mb-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        REGISTRATION
                    </motion.h2>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <div className="w-full md:w-1/2">
                                <label className="text-xl text-[#5C0A25] mb-2 block">First Name</label>
                                <input
                                    type="text"
                                    value={fname}
                                    onChange={onChangeFName}
                                    placeholder="Rehab"
                                    className="w-full px-4 py-2 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 text-[#5C0A25]"
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <label className="text-xl text-[#5C0A25] mb-2 block">Last Name</label>
                                <input
                                    type="text"
                                    value={lname}
                                    onChange={onChangeLName}
                                    placeholder="Awad"
                                    className="w-full px-4 py-2 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 text-[#5C0A25]"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="text-xl text-[#5C0A25] mb-2 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder="@gmail.com"
                                className="w-full px-4 py-2 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 text-[#5C0A25]"
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label className="text-xl text-[#5C0A25] mb-2 block">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={onChangePassword}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 bg-[#FAD1DF] rounded-2xl focus:outline-none focus:ring-2 text-[#5C0A25]"
                            />
                            <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-10 text-[#5C0A25]">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <button type="submit" className="w-full bg-[#EC467E] text-[#FCE4EC] py-3 rounded-lg hover:bg-[#D93D71] transition duration-200 text-xl font-semibold" disabled={loading}>
                            {loading ? "Processing..." : "REGISTER NOW"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-[#FCE8EF] mb-4">Or login with social platform</p>
                        <div className="flex justify-center gap-4">
                            {[
                                { platform: "Facebook", icon: <FaFacebookF /> },
                                { platform: "Google", icon: <FaGoogle /> },
                                { platform: "Twitter", icon: <FaTwitter /> },
                                { platform: "LinkedIn", icon: <FaLinkedinIn /> },
                            ].map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSocialLogin(s.platform)}
                                    className="bg-[#FAD1DF] w-10 h-10 rounded-full flex items-center justify-center text-[#5C0A25] hover:bg-[#F6A5B3] transition">
                                    {s.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Section */}
                <AnimatePresence>
                    <motion.div
                        className="absolute md:static w-full md:w-1/2 bg-[#F0759E] p-8 flex flex-col justify-center items-center text-center z-10"
                        initial={{ scale: 1 }}
                        animate={isAnimating ? { scale: window.innerWidth < 768 ? 1.5 : 2, x: window.innerWidth < 768 ? "0%" : "-50%", borderRadius: "0px" } : { scale: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        onAnimationComplete={onAnimationComplete}>
                        <motion.div initial={{ opacity: 1 }} animate={isAnimating ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.4 }}>
                            <h2 className="text-4xl font-bold text-white mb-4">Welcome back!</h2>
                            <p className="text-white mb-6">Already have account?</p>
                            <button onClick={handleLoginClick} className="border-2 border-white text-white px-6 py-2 rounded-xl hover:bg-white hover:text-[#F6A5B3] transition duration-200">
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
