import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getAllCategories from "../../redux/actions/categoryAction"; // Ensure this path is correct

function CategoryNavbar() {
    const dispatch = useDispatch();

    // State for active category
    const [activeCategory, setActiveCategory] = useState(null);

    // Fetch categories on mount
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    // Select state from Redux store
    const { category, loading } = useSelector((state) => state.allCategories);

    // Set the first category as active once data is loaded
    useEffect(() => {
        if (category && category.length > 0 && !activeCategory) {
            setActiveCategory(category[0].name);
        }
    }, [category, activeCategory]);

    // Handler for category click
    const handleCategoryClick = (name) => {
        setActiveCategory(name);
        console.log(`Selected category: ${name}`);
    };

   

    return (
        <nav className="w-full bg-[#FFF] py-4 mt-0 shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-26">
                {/* Category List */}
                <div className="flex overflow-x-auto scrollbar-hide space-x-4 md:space-x-6 py-2">
                    {loading ? (
                        <p className="text-[#5C0A27] text-lg">Loading categories...</p>
                    ) : category && category.length > 0 ? (
                        category.map((cat) => (
                            <button
                                key={cat._id} // Use _id as the unique key
                                onClick={() => handleCategoryClick(cat.name)}
                                className={`px-4 py-2 text-[#5C0A27] text-lg font-bold rounded-lg transition-all duration-200 ${
                                    activeCategory === cat.name ? "bg-[#FCE8EF] shadow-inner" : "bg-white hover:bg-[#FCE8EF]"
                                }`}>
                                {cat.name}
                            </button>
                        ))
                    ) : (
                        <p className="text-[#5C0A27] text-lg">No categories available</p>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default CategoryNavbar;
