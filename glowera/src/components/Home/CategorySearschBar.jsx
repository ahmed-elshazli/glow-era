import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./CategorySearchBar.css";

function CategorySearchBar({ width = "7.5rem" }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <section className="w-full py-2 px-4 md:px-24 bg-white mt-20 md:mt-32" id="product-grid">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full">
                {/* عنوان الكاتيجوري */}
                <h2 className="text-xl md:text-3xl font-bold text-[#5C0A27]">Category</h2>

                {/* مربع البحث */}
                <div className="relative w-full max-w-md">
                    <input
                        id="search"
                        type="text"
                        placeholder={isFocused ? "Baby Care" : "Search"}
                        className="pl-10 pr-4 py-3 w-full bg-[#FCE8EF] text-[#5C0A27] border border-[#F0759E] rounded-2xl focus:outline-none transition-all duration-300"
                        style={{ width: isFocused ? "100%" : width }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F0759E] transition-all duration-300 ${isFocused ? "icon-move-right" : "icon-move-left"}`} />
                </div>
            </div>
        </section>
    );
}

export default CategorySearchBar;
