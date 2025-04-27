import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import bg from "../../assets/Rectangle5.png";
import bg_blur from "../../assets/Rectangle1.png";
import { getAllProducts } from "../../redux/actions/productsAction";
import getAllCategories from "../../redux/actions/categoryAction";
import { setSkinType } from "../../redux/actions/skinTypeAction";
import "./Header.css";

export default function Header() {
    const dispatch = useDispatch();
    const { category, loading } = useSelector((state) => state.allCategories);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // مرجع لقسم المنتجات عشان نعمله Scroll
    const productSectionRef = useRef(null);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCategory) {
            dispatch(setSkinType(selectedCategory));
            dispatch(getAllProducts(selectedCategory._id));

            // التمرير السلس لقسم المنتجات
            const section = document.getElementById("product-grid");
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 100, // تقدر تتحكم بالمسافة فوق لو حابب
                    behavior: "smooth",
                });
            }
        }
    };


    return (
        <header className="header w-full relative">
            <div
                className="container w-full h-screen flex flex-col items-center justify-center relative px-4"
                style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <h1 className="text-4xl md:text-[120px] font-bold text-[#EB477E] text-center leading-tight font-cursive">Glow Era</h1>
                <h3 className="text-lg md:text-6xl font-bold text-[#EB477E] text-center leading-relaxed">What is your skin type?</h3>
                <p className="text-sm md:text-3xl text-[#EB477E] text-center mt-2">"Select your skin type to find the best products for you"</p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center mt-14">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-9">
                        {loading ? (
                            <p className="text-[#EB477E] text-lg md:text-2xl">جاري تحميل الفئات...</p>
                        ) : category && category.length > 0 ? (
                            category.map((cat) => (
                                <label key={cat._id} className="flex items-center text-[#EB477E] text-lg md:text-3xl font-medium cursor-pointer">
                                    <input type="radio" name="skin-type" value={cat.name} className="mr-3 w-5 h-5 md:w-7 md:h-7 custom-radio" onChange={() => setSelectedCategory(cat)} />
                                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                                </label>
                            ))
                        ) : (
                            <p className="text-[#EB477E] text-lg md:text-2xl">لا توجد فئات متاحة</p>
                        )}
                    </div>
                    <div className="flex justify-center mt-8">
                        <button type="submit" className="px-4 py-2 border text-xl border-[#EC4680] text-[#EC4680] rounded-lg hover:bg-[#EC4680] hover:text-white transition text-center">
                            Submit
                        </button>
                    </div>
                </form>
                <img src={bg_blur} className="blur absolute bottom-[-200px] w-full opacity-100" alt="background_blur" />
            </div>
        </header>
    );
}
