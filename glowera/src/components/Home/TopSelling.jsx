import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getAllProducts } from "../../redux/actions/productsAction";
import { useNavigate } from "react-router-dom";
import "./ProductGrid.css";

function TopSelling() {
    const [wishlist, setWishlist] = useState([]);
    const scrollRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: products, loading, error } = useSelector((state) => state.allProducts);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        dispatch(getAllProducts());

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [dispatch]);

    const displayedProducts = Array.isArray(products) ? products.slice(0, 7) : [];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const truncateText = (text, wordLimit) => {
        if (!text) return "";
        const words = text.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
    };

    // تحديد عدد الكلمات حسب حجم الشاشة
    let titleWordLimit = 4;
    let descWordLimit = 6;

    if (windowWidth < 640) {
        titleWordLimit = 2;
        descWordLimit = 3;
    } else if (windowWidth < 1024) {
        titleWordLimit = 3;
        descWordLimit = 4;
    }

    return (
        <section className="w-full py-2 px-4 md:px-24 bg-white mt-20 md:mt-32 relative">
            <h2 className="text-xl pb-6 md:text-3xl font-bold text-[#5C0A27]">Suggestions & Top Selling</h2>

            {/* Left Scroll Button */}
            <button
                className="flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-[#C0748D] p-2 sm:p-3 rounded-full shadow-md hover:bg-[#C0748D] hover:text-white transition z-10"
                onClick={() => scroll("left")}>
                <FaChevronLeft className="text-sm sm:text-base" />
            </button>

            {/* Scrollable container */}
            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide relative">
                <div className="flex gap-4 sm:gap-6">
                    {loading ? (
                        <p className="text-[#5C0A27] text-lg">Loading...</p>
                    ) : error ? (
                        <p className="text-[#5C0A27] text-lg">Failed to load products.</p>
                    ) : (
                        displayedProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-[#C0748D] w-48 sm:w-64 h-[24rem] sm:h-[26rem] rounded-xl overflow-hidden flex-shrink-0 shadow-lg cursor-pointer"
                                onClick={() => navigate(`/product/${product._id}`)}>
                                <div className="group relative block h-64 bg-white">
                                    <img src={product.images?.[0]} alt={product.title} className="h-full w-full object-contain rounded-xl transition duration-300 group-hover:scale-105" />
                                </div>

                                <div className="pt-6 h-35 flex flex-col items-center justify-end px-2 text-center">
                                    <h3 className="text-base sm:text-lg font-bold text-white truncate w-full" title={product.title}>
                                        {product.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#FDE8EF] truncate w-full" title={product.description}>
                                        {product.description}
                                    </p>

                                    <p className="text-white font-medium">{product.value}</p>
                                    <span className="font-bold text-[#5C0A27] text-lg">EGP {product.price}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Scroll Button */}
            <button
                className="flex absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-[#C0748D] p-2 sm:p-3 rounded-full shadow-md hover:bg-[#C0748D] hover:text-white transition z-10"
                onClick={() => scroll("right")}>
                <FaChevronRight className="text-sm sm:text-base" />
            </button>
        </section>
    );
}

export default TopSelling;
