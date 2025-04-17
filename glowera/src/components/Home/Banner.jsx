import React from "react";
import skin from "../../assets/Rectangle6.png";
import nurturing from "../../assets/Rectangle7.png";

function Banner() {
    return (
        <section className="w-full py-10 bg-white mt-20">
            <div className="container mx-auto flex flex-col gap-16 px-4 md:px-8">
                {/* Skincare Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                    {/* Left - Image */}
                    <img src={skin} alt="Skincare" className="w-full max-w-md md:max-w-lg rounded-lg shadow-md" />

                    {/* Right - Text */}
                    <div className="text-center md:text-left max-w-lg">
                        <span className="text-[#5C0A27] uppercase text-sm font-medium tracking-wide">Skin Care</span>
                        <h2 className="text-xl md:text-2xl font-bold text-[#5C0A27] mt-3 leading-snug">Potent Solutions for Demanding Skin</h2>
                        <p className="text-[#5C0A27] text-lg mt-4 leading-normal">
                            Discover products tailored for mature skin and urban lifestyles, offering daily hydration and the added advantage of powerful vitamins and antioxidants.
                        </p>
                        <button className="mt-6 px-6 py-3 bg-[#5C0A27] text-white rounded-lg border border-[#5C0A27] hover:bg-white hover:text-[#5C0A27] transition font-medium">Read more</button>
                    </div>
                </div>

                {/* Nurturing Section */}
                <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-center gap-10">
                    {/* Right - Image */}
                    <img src={nurturing} alt="Nurturing" className="w-full max-w-md md:max-w-lg rounded-lg shadow-md" />

                    {/* Left - Text */}
                    <div className="text-center md:text-left max-w-lg">
                        <h2 className="text-xl md:text-2xl font-bold text-[#5C0A27] mt-3 leading-snug">Nurturing Your Skin</h2>
                        <h3 className="text-[#5C0A27] text-lg mt-4 leading-normal">
                            Tailored formulas for urban living and aging skin, providing deep moisture while delivering essential nutrients like vitamins and antioxidants for healthier, more radiant
                            skin.
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;
