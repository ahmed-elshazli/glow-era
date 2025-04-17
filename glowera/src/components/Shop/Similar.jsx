import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const products = [
    {
        id: 1,
        name: "Aloe Glow Serum",
        brand: "Fancy Brand",
        price: "$19.99",
        details: "An intensely hydrating serum",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120ml",
    },
    {
        id: 2,
        name: "Cool Outfit",
        brand: "Cool Brand",
        price: "$29.99",
        details: "A stylish outfit for a modern look",
        image: "https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120ml",
    },
    {
        id: 3,
        name: "Nice Outfit",
        brand: "Nice Brand",
        price: "$35.00",
        details: "Trendy casual outfit for daily wear",
        image: "https://images.unsplash.com/photo-1548286978-f218023f8d18?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120ml",
    },
    {
        id: 4,
        name: "Lavish Outfit",
        brand: "Lavish Brand",
        price: "$49.99",
        details: "Elegant wear with premium fabric",
        image: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120ml",
    },
    {
        id: 4,
        name: "Lavish Outfit",
        brand: "Lavish Brand",
        price: "$49.99",
        details: "Elegant wear with premium fabric",
        image: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120ml",
    },
    {
        id: 4,
        name: "Lavish Outfit",
        brand: "Lavish Brand",
        price: "$49.99",
        details: "Elegant wear with premium fabric",
        image: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120ml",
    },
    {
        id: 4,
        name: "Lavish Outfit",
        brand: "Lavish Brand",
        price: "$49.99",
        details: "Elegant wear with premium fabric",
        image: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120ml",
    },
    {
        id: 4,
        name: "Lavish Outfit",
        brand: "Lavish Brand",
        price: "$49.99",
        details: "Elegant wear with premium fabric",
        image: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?auto=format&q=75&fit=crop&crop=top&w=600&h=700",
        value: "120ml",
    },
];

function Similar() {

    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    const toggleWishlist = (id) => {
        setWishlist((prevWishlist) => (prevWishlist.includes(id) ? prevWishlist.filter((item) => item !== id) : [...prevWishlist, id]));
    };
  return (
      <>
          <h2 className="text-xl md:text-3xl font-bold text-[#5C0A27] pl-7  pb-7">Similar Items</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-6 pb-20">
              {products.map((product) => (
                  <div key={product.id} className="bg-[#C0748D] w-84 h-[29rem] rounded-xl overflow-hidden shadow-lg relative cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                      <div className="relative">
                          <img src={product.image} alt={product.name} className="h-74 w-full object-cover rounded-xl transition duration-300 hover:scale-105" />
                          <button
                              className="absolute bottom-4 right-4 border border-[#c74a6b] rounded-full p-2 transition-transform duration-200 hover:scale-110"
                              onClick={(e) => {
                                  e.stopPropagation();
                                  toggleWishlist(product.id);
                              }}>
                              {wishlist.includes(product.id) ? <FaHeart className="text-[#c74a6b] text-lg" /> : <FaRegHeart className="text-lg text-[#c74a6b]" />}
                          </button>
                      </div>

                      <div className="p-4 text-center">
                          <h3 className="text-lg font-bold text-white">{product.name}</h3>
                          <p className="text-sm text-[#FDE8EF]">{product.details}</p>
                          <p className="text-white font-medium">{product.value}</p>
                          <p className="font-bold text-lg text-[#5C0A27] mt-2">{product.price}</p>
                      </div>
                  </div>
              ))}
          </div>
      </>
  );
}

export default Similar
