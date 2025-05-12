import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";

// دالة لقطع النص
const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

// هوك لعرض متجاوب
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
};

function Similar() {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const width = useWindowWidth();

    const { data: products, loading, error } = useSelector((state) => state.allProducts);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const displayedProducts = Array.isArray(products) ? products.slice(0, 8) : [];

    // تقليل عدد الكلمات حسب حجم الشاشة
    let titleWordLimit = 4;
    let descWordLimit = 6;
    if (width < 640) {
        titleWordLimit = 2;
        descWordLimit = 3;
    } else if (width < 1024) {
        titleWordLimit = 3;
        descWordLimit = 4;
    }

    return (
        <>
            <h2 className="text-xl md:text-3xl font-bold text-[#5C0A27] pl-6 sm:pl-10 pb-6">Similar Items</h2>
            {loading ? (
                <p className="text-center text-[#5C0A25] mt-6 text-xl">Loading...</p>
            ) : error ? (
                <p className="text-center text-[#5C0A25] mt-6 text-xl">Failed to load products.</p>
            ) : (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-6 md:gap-8 px-4 sm:px-6 pb-20">
                    {displayedProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-[#C0748D] max-w-[18rem] mx-auto h-[29rem] rounded-xl overflow-hidden shadow-lg relative cursor-pointer"
                            onClick={() => navigate(`/product/${product._id}`)}>
                            <div className="relative bg-white">
                                <img src={product.images?.[0]} alt={product.title} className="h-72 w-full object-contain rounded-xl transition duration-300 hover:scale-105" />
                            </div>

                            <div className="p-4 text-center">
                                <h3 className="text-base sm:text-lg font-bold text-white truncate w-full" title={product.title}>
                                    {product.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-[#FDE8EF] truncate w-full" title={product.description}>
                                    {product.description}
                                </p>

                                <p className="text-white font-medium">{product.value}</p>
                                <p className="font-bold text-lg text-[#5C0A27] mt-2">EGP {product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Similar;
