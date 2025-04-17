import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./CategorySearchBar.css";

function CategorySearchBar({ width = "7.5rem" }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <section className="w-full py-1 pl-25 bg-white mt-32">
            <div className="flex items-center gap-6 w-full">
                {/* Category Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-[#5C0A27]">Category</h2>

                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                    {/* Input Field */}
                    <input
                        id="search"
                        type="text"
                        placeholder={isFocused ? "Baby Care" : "Search"}
                        className={`pl-10 pr-3 py-3 bg-[#FCE8EF] text-[#5C0A27] border border-[#F0759E] rounded-2xl 
                         focus:outline-none transition-all duration-300`}
                        style={{ width: isFocused ? "100%" : width }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />

                    {/* Search Icon Inside Input (Animated) */}
                    <FaSearch className={`absolute top-1/2 transform -translate-y-1/2 text-[#F0759E] transition-all duration-300 ${isFocused ? "icon-move-right" : "icon-move-left"}`} />
                </div>
            </div>
        </section>
    );
}

export default CategorySearchBar;
