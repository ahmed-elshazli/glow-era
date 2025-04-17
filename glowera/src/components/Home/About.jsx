import React from "react";
import bg from "../../assets/Rectangle12.png";

function About() {
    return (
        <div className="my-12 "  id="about">
            <h2 className=" text-3xl md:text-4xl font-bold text-center text-[#5C0A27]  pt-0 ">“About Us”</h2>
            {/* Background Image Wrapper */}
            <div className="bg-cover bg-center bg-no-repeat flex items-center justify-center py-10">
                <div
                    className="max-w-screen-lg mx-auto px-6 md:px-12 lg:px-16 bg-white p-8 rounded-xl shadow-lg text-center md:text-left"
                    style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <span className="text-white uppercase tracking-widest font-semibold">About</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">GlowEra – Unlock Your Skin’s Natural Glow</h2>
                    <p className="text-white mt-4 leading-relaxed">
                        At GlowEra, we believe that skincare is more than just a routine—it’s a self-care ritual that brings out your inner glow. Our mission is to provide clean, effective, and
                        science-backed skincare solutions that nourish, protect, and enhance your skin’s natural beauty.
                    </p>
                    <h3 className="text-lg font-semibold text-white mt-4">🌿 Our Philosophy</h3>
                    <p className="text-white leading-relaxed">
                        We embrace the power of nature and innovation. Every GlowEra product is crafted with high-quality, skin-loving ingredients, free from harsh chemicals, parabens, and sulfates—so
                        you can glow with confidence, every day.
                    </p>

                    {/* List */}
                    <ul className="mt-4 space-y-2 text-white">
                        <li>
                            ✔ <span className="font-semibold">Pure & Natural Formulas</span> – Enriched with botanical extracts for deep hydration.
                        </li>
                        <li>
                            ✔ <span className="font-semibold">For Every Skin Type</span> – Thoughtfully designed to cater to your unique skin needs.
                        </li>
                        <li>
                            ✔ <span className="font-semibold">Cruelty-Free & Sustainable</span> – No animal testing, eco-friendly packaging.
                        </li>
                        <li>
                            ✔ <span className="font-semibold">Dermatologist-Approved</span> – Safe, effective, and results-driven.
                        </li>
                        <li>
                            <span className="font-semibold">✨ Glow Naturally. Feel Confident. Stay Radiant with GlowEra.</span>
                        </li>
                    </ul>

                    {/* Button Centered */}
                    <div className="flex justify-center mt-6">
                        <button className="px-6 py-3 text-white rounded-lg border border-white hover:bg-white hover:text-[#5C0A27] transition font-medium">Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
