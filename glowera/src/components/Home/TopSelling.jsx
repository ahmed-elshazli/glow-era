import { useState, useRef } from "react";
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ProductGrid.css";

const products = [
    {
        id: 1,
        name: "Aloe Glow Serum",
        brand: "Fancy Brand",
        price: "$19.99",
        details: "An intensely hydrating serum that gives your skin a natural glow",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120 ml",
    },
    {
        id: 2,
        name: "Cool Outfit",
        brand: "Cool Brand",
        details: "An intensely hydrating serum that gives your skin a natural glow",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120 ml",
    },
    {
        id: 3,
        name: "Nice Outfit",
        brand: "Nice Brand",
        details: "An intensely hydrating serum that gives your skin a natural glow",
        price: "$35.00",
        image: "https://images.unsplash.com/photo-1548286978-f218023f8d18?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120 ml",
    },
    {
        id: 4,
        name: "Lavish Outfit",
        brand: "Lavish Brand",
        details: "An intensely hydrating serum that gives your skin a natural glow",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120 ml",
    },
    {
        id: 1,
        name: "Aloe Glow Serum",
        brand: "Fancy Brand",
        price: "$19.99",
        details: "An intensely hydrating serum that gives your skin a natural glow",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120 ml",
    },
    {
        id: 2,
        name: "Cool Outfit",
        brand: "Cool Brand",
        details: "An intensely hydrating serum that gives your skin a natural glow",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120 ml",
    },
    {
        id: 3,
        name: "Nice Outfit",
        brand: "Nice Brand",
        details: "An intensely hydrating serum that gives your skin a natural glow",
        price: "$35.00",
        image: "https://images.unsplash.com/photo-1548286978-f218023f8d18?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120 ml",
    },
    {
        id: 4,
        name: "Lavish Outfit",
        brand: "Lavish Brand",
        details: "An intensely hydrating serum that gives your skin a natural glow",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120 ml",
    },
];

function TopSelling() {
    const [wishlist, setWishlist] = useState([]);
    const scrollRef = useRef(null);

    const toggleWishlist = (id) => {
        if (wishlist.includes(id)) {
            setWishlist(wishlist.filter((item) => item !== id));
        } else {
            setWishlist([...wishlist, id]);
        }
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

    return (
        <section className="w-full py-2 px-4 md:px-24 bg-white mt-20 md:mt-32 relative">
            <h2 className="text-xl pb-6 md:text-3xl font-bold text-[#5C0A27]">Suggegtions & Top Selling</h2>
            {/* Left Scroll Button */}
            <button
                className="flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-[#C0748D] p-2 sm:p-3 rounded-full shadow-md hover:bg-[#C0748D] hover:text-white transition z-10"
                onClick={() => scroll("left")}>
                <FaChevronLeft className="text-sm sm:text-base" />
            </button>

            {/* Scrollable container */}
            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide relative">
                <div className="flex gap-4 sm:gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-[#C0748D] w-48 sm:w-64 h-[24rem] sm:h-[26rem] rounded-xl overflow-hidden flex-shrink-0 shadow-lg cursor-pointer">
                            <a href="/shop" className="group relative block h-64">
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded-xl transition duration-300 group-hover:scale-105" />

                                {/* Wishlist Button */}
                                {/* <button className={`wishlist-button`} onClick={() => toggleWishlist(product.id)}>
                                    {wishlist.includes(product.id) ? <FaHeart className="filled-heart" /> : <FaRegHeart />}
                                </button> */}
                            </a>

                            <div className="pt-6 h-35 flex flex-col items-center justify-end">
                                <div className="text-center">
                                    <a href="/shop" className="text-lg font-bold text-white hover:text-[#5C0A27] transition">
                                        {product.name}
                                    </a>
                                    <p className="text-sm text-wrap text-[#FDE8EF]">{product.details}</p>
                                    <p className="text-lg text-bold text-white">{product.value}</p>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-[#5C0A27] text-lg">{product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
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
