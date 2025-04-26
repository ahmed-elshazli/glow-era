import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";

// Function to truncate text to a certain number of words
const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
};

// Custom hook to get the current window width
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
};

function ShopPage() {
    const [wishlist, setWishlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: products, loading, error } = useSelector((state) => state.allProducts);
    const width = useWindowWidth();

    let titleWordLimit = 4;
    let descWordLimit = 6;
    if (width < 640) {
        titleWordLimit = 2;
        descWordLimit = 3;
    } else if (width < 1024) {
        titleWordLimit = 3;
        descWordLimit = 4;
    }

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const toggleWishlist = (id) => {
        setWishlist((prevWishlist) => (prevWishlist.includes(id) ? prevWishlist.filter((item) => item !== id) : [...prevWishlist, id]));
    };

    const filteredProducts = Array.isArray(products) ? products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())) : [];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <section className="py-8 pt-46">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Search Bar */}
                <div className="flex justify-center mb-12 sm:mb-12">
                    <form onSubmit={handleSearchSubmit} className="w-full max-w-md flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="relative flex-1">
                            <label htmlFor="search" className="mb-2 text-sm font-medium text-[#F0759E] sr-only">
                                Search
                            </label>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <FaSearch className="w-5 h-5 text-[#F0759E]" />
                            </div>
                            <input
                                type="search"
                                id="search"
                                className="block w-full p-3 pl-12 text-base text-[#F0759E] border border-[#F0759E] rounded-lg bg-[#FCE8EF] focus:outline-none focus:ring-2 focus:ring-[#F0759E] placeholder-[#F0759E]"
                                placeholder="Search for products by title..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </div>

                {/* Products List */}
                <div className="text-start pl-4 sm:pl-10">
                    <h2 className="text-2xl sm:text-3xl text-[#5C0A25] font-bold">All Products</h2>
                    <hr className="w-32 sm:w-48 border-[#5C0A25] mt-2" />
                </div>

                {error ? (
                    <div className="text-center mt-6">
                        <p className="text-[#5C0A25] text-xl">An error occurred while fetching products: {error}</p>
                        <button onClick={() => dispatch(getAllProducts())} className="mt-4 px-4 py-2 bg-[#C0748D] text-white rounded-lg hover:bg-[#5C0A25] transition">
                            Retry
                        </button>
                    </div>
                ) : loading ? (
                    <p className="text-center text-[#5C0A25] mt-6 text-xl">Loading...</p>
                ) : filteredProducts.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-[#C0748D] w-84 h-[29rem] rounded-xl overflow-hidden shadow-lg relative cursor-pointer"
                                onClick={() => navigate(`/product/${product._id}`)}>
                                <div className="relative">
                                    <img src={product.images[0]} alt={product.title} className="h-74 w-full object-cover rounded-xl transition duration-300 hover:scale-105" />
                                    <button
                                        className="absolute bottom-4 right-4 border border-[#c74a6b] rounded-full p-2 transition-transform duration-200 hover:scale-110 bg-white"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleWishlist(product._id);
                                        }}>
                                        {wishlist.includes(product._id) ? <FaHeart className="text-[#c74a6b] text-lg" /> : <FaRegHeart className="text-lg text-[#c74a6b]" />}
                                    </button>
                                </div>

                                <div className="p-4 text-center">
                                    <h3 className="text-lg font-bold text-white" title={product.title}>
                                        {truncateText(product.title, titleWordLimit)}
                                    </h3>
                                    <p className="text-sm text-[#FDE8EF]" title={product.description}>
                                        {truncateText(product.description, descWordLimit)}
                                    </p>
                                    <p className="text-white font-medium">{product.value}</p>
                                    <p className="font-bold text-lg text-[#5C0A27] mt-2">EGP {product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-[#5C0A25] mt-6">No products available.</p>
                )}
            </div>
        </section>
    );
}

export default ShopPage;
