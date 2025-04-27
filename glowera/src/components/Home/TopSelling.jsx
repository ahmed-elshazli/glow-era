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
        <section className="bg-white py-4 pl-20 sm:py-8 lg:py-5 relative">
            <h2 className="text-xl md:text-3xl font-bold text-[#5C0A27] pl-7 pt-10 pb-7">Suggegtions & Top Selling</h2>
            {/* Left Scroll Button */}
            <button
                className="absolute left-9 z-10 top-1/2 transform -translate-y-1/2 bg-white text-[#C0748D] p-3 rounded-full shadow-lg 
                                       hover:bg-[#C0748D] hover:text-white transition"
                onClick={() => scroll("left")}>
                <FaChevronLeft />
            </button>

            {/* Scrollable container */}
            <div ref={scrollRef} className="overflow-x-auto whitespace-nowrap px-6 scrollbar-hide relative">
                <div className="flex gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-[#C0748D] w-64 h-[26rem] rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-[#C0748D] p-3 rounded-full shadow-lg 
                                       hover:bg-[#C0748D] hover:text-white transition "
                onClick={() => scroll("right")}>
                <FaChevronRight />
            </button>
        </section>
    );
}

export default TopSelling;
