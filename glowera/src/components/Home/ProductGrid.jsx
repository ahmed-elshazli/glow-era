import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ViewHomeProductsHook from "../../hooks/products/view-home-products-hook";
import { getAllProducts } from "../../redux/actions/productsAction";

// لتقصير النصوص
const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

// لمعرفة عرض الشاشة
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
};

function ProductGrid() {
    const [wishlist, setWishlist] = useState([]);
    const scrollRef = useRef(null);
    const [allProducts, selectedSkinType, loading, error] = ViewHomeProductsHook();
    const width = useWindowWidth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // تحكم بطول النص حسب الشاشة
    // تحكم بطول النص حسب الشاشة
    let titleWordLimit = 4;
    let descWordLimit = 3; // ثابت ليظهر سطر واحد فقط
    if (width < 640) {
        titleWordLimit = 2;
    } else if (width < 1024) {
        titleWordLimit = 3;
    }


    const toggleWishlist = (id) => {
        setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = width < 640 ? 200 : 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        if (selectedSkinType && selectedSkinType._id) {
            dispatch(getAllProducts(selectedSkinType._id));
        }
    }, [selectedSkinType?._id, dispatch]);

    const fetchProducts = () => {
        if (selectedSkinType?._id) {
            dispatch(getAllProducts(selectedSkinType._id));
        }
    };

    return (
        <section className="bg-white py-4 px-4 sm:px-8 lg:px-20 relative">
            {/* زر السهم لليسار */}
            <button
                className="flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-[#C0748D] p-2 sm:p-3 rounded-full shadow-md hover:bg-[#C0748D] hover:text-white transition z-10"
                onClick={() => scroll("left")}>
                <FaChevronLeft className="text-sm sm:text-base" />
            </button>

            {/* المنتجات */}
            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide relative">
                <div className="flex gap-4 sm:gap-6">
                    {error ? (
                        <div>
                            <p className="text-[#5C0A27]">An error occurred while fetching products: {error}</p>
                            <button onClick={fetchProducts} className="mt-2 px-4 py-2 bg-[#C0748D] text-white rounded-lg hover:bg-[#5C0A27] transition">
                                Retry
                            </button>
                        </div>
                    ) : loading ? (
                        <p className="text-[#5C0A27]">Loading...</p>
                    ) : !selectedSkinType || !selectedSkinType._id ? (
                        <p className="text-[#5C0A27]">
                            Please select a skin type or visit the{" "}
                            <Link to="/shop" className="text-[#C0748D] hover:underline">
                                shop page
                            </Link>
                            .
                        </p>
                    ) : allProducts?.length > 0 ? (
                        allProducts.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => navigate(`/product/${product._id}`)}
                                className="bg-[#C0748D] w-48 sm:w-64 h-[24rem] sm:h-[26rem] rounded-xl overflow-hidden flex-shrink-0 shadow-lg cursor-pointer">
                                <div className="group relative bg-white block h-48 sm:h-64">
                                    <img src={product.images[0]} alt={product.title} className="h-full w-full object-contain rounded-xl transition duration-300 group-hover:scale-105" />
                                </div>

                                <div className="pt-4 sm:pt-6 px-2 sm:px-4 text-center">
                                    <h3 className="text-base sm:text-lg font-bold text-white truncate w-full" title={product.title}>
                                        {product.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#FDE8EF] truncate w-full" title={product.description}>
                                        {product.description}
                                    </p>

                                    <p className="text-white text-sm sm:text-base font-medium">{product.size}</p>
                                    <p className="font-bold text-[#5C0A27] text-base sm:text-lg ">EGP {product.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#5C0A27]">No products found for the selected skin type.</p>
                    )}
                </div>
            </div>

            {/* زر السهم لليمين */}
            <button
                className="flex absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-[#C0748D] p-2 sm:p-3 rounded-full shadow-md hover:bg-[#C0748D] hover:text-white transition z-10"
                onClick={() => scroll("right")}>
                <FaChevronRight className="text-sm sm:text-base" />
            </button>
        </section>
    );
}

export default ProductGrid;
