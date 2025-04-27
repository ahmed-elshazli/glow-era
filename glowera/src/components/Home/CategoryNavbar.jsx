import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getAllCategories from "../../redux/actions/categoryAction"; // تأكد من صحة المسار

function CategoryNavbar() {
    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState(null);

    // جلب الكاتيجوريز عند أول تحميل
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    // قراءة من الريدكس
    const { category, loading } = useSelector((state) => state.allCategories);

    // ضبط أول كاتيجوري تلقائيًا
    useEffect(() => {
        if (category && category.length > 0 && !activeCategory) {
            setActiveCategory(category[0].name);
        }
    }, [category, activeCategory]);

    // عند الضغط على كاتيجوري
    const handleCategoryClick = (name) => {
        setActiveCategory(name);
        console.log(`Selected category: ${name}`);
    };

    return (
        <nav className="w-full bg-white py-3 shadow-md">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-20">
                {/* قائمة التصنيفات */}
                <div className="flex overflow-x-auto scrollbar-hide space-x-3 md:space-x-6 py-2">
                    {loading ? (
                        <p className="text-[#5C0A27] text-lg">Loading categories...</p>
                    ) : category && category.length > 0 ? (
                        category.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() => handleCategoryClick(cat.name)}
                                className={`px-4 py-2 text-[#5C0A27] text-sm md:text-lg font-bold rounded-lg transition-all duration-200 ${
                                    activeCategory === cat.name ? "bg-pink-100 shadow-inner" : "bg-white hover:bg-pink-100"
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
