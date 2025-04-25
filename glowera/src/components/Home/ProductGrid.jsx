import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ViewHomeProductsHook from "../../hooks/products/view-home-products-hook";
import { getAllProducts } from "../../redux/actions/productsAction";

// Truncate text to a specific number of words
const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

// Hook to get the window width
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

    // Adjust title/description length based on screen size
    let titleWordLimit = 4;
    let descWordLimit = 6;
    if (width < 640) {
        titleWordLimit = 2;
        descWordLimit = 3;
    } else if (width < 1024) {
        titleWordLimit = 3;
        descWordLimit = 4;
    }

    const toggleWishlist = (id) => {
        setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Fetch products only if a skin type is selected
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
        <section className="bg-white py-4 pl-20 sm:py-8 lg:py-5 relative">
            <button
                className="absolute left-9 z-10 top-1/2 transform -translate-y-1/2 bg-white text-[#C0748D] p-3 rounded-full shadow-lg 
                           hover:bg-[#C0748D] hover:text-white transition"
                onClick={() => scroll("left")}>
                <FaChevronLeft />
            </button>

            <div ref={scrollRef} className="overflow-x-auto whitespace-nowrap px-6 scrollbar-hide relative">
                <div className="flex gap-6">
                    {error ? (
                        <div>
                            <p>An error occurred while fetching products: {error}</p>
                            <button onClick={fetchProducts} className="mt-2 px-4 py-2 bg-[#C0748D] text-white rounded-lg hover:bg-[#5C0A25] transition">
                                Retry
                            </button>
                        </div>
                    ) : loading ? (
                        <p>Loading...</p>
                    ) : !selectedSkinType || !selectedSkinType._id ? (
                        <p>
                            Please select a skin type to view products or go to the{" "}
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
                                className="bg-[#C0748D] w-64 h-[26rem] rounded-xl overflow-hidden flex-shrink-0 shadow-lg cursor-pointer">
                                <div className="group relative block h-64">
                                    <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover rounded-xl transition duration-300 group-hover:scale-105" />
                                    <button
                                        className="absolute bottom-4 right-4 border border-[#c74a6b] rounded-full p-2 transition-transform duration-200 hover:scale-110"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleWishlist(product._id);
                                        }}>
                                        {wishlist.includes(product._id) ? <FaHeart className="text-[#c74a6b] text-lg" /> : <FaRegHeart className="text-lg text-[#c74a6b]" />}
                                    </button>
                                </div>

                                <div className="pt-6 px-4 text-center">
                                    <h3 className="text-lg font-bold text-white" title={product.title}>
                                        {truncateText(product.title, titleWordLimit)}
                                    </h3>
                                    <p className="text-sm text-[#FDE8EF]" title={product.description}>
                                        {truncateText(product.description, descWordLimit)}
                                    </p>
                                    <p className="text-white font-medium">{product.size}</p>
                                    <p className="font-bold text-[#5C0A27] text-lg mt-2">${product.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found for the selected skin type.</p>
                    )}
                </div>
            </div>

            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-[#C0748D] p-3 rounded-full shadow-lg 
                           hover:bg-[#C0748D] hover:text-white transition"
                onClick={() => scroll("right")}>
                <FaChevronRight />
            </button>
        </section>
    );
}

export default ProductGrid;
