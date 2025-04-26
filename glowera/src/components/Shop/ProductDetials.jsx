import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { getAllProducts } from "../../redux/actions/productsAction";
import { toast } from "react-toastify";

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allProducts = useSelector((state) => state.allProducts?.data || []);
    const loading = useSelector((state) => state.allProducts?.loading || false);
    const error = useSelector((state) => state.allProducts?.error || null);

    const product = allProducts.find((p) => p._id === id);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (!allProducts.length && !loading && !error) {
            dispatch(getAllProducts());
        }
    }, [dispatch, allProducts, loading, error]);

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

   const handleAddToCart = async () => {
       if (isAdding) return;

       // Check if product data exists
       if (!product || !product._id || !product.price) {
           toast.error("An error occurred loading product data!", { position: "top-center" });
           return;
       }

       // Check if size is selected
       if (!selectedSize) {
           toast.warning("Please select a size first!", { position: "top-center" });
           return;
       }

       // Check if quantity is greater than 0
       if (quantity < 1) {
           toast.warning("Quantity must be at least 1.", { position: "top-center" });
           return;
       }

       try {
           setIsAdding(true);

           // Create the object to be added to the cart
           const productToAdd = {
               _id: product._id,
               title: product.title,
               price: product.price,
               images: product.images,
               category: product.category,
               size: selectedSize,
               quantity: quantity, // Ensure the current quantity is passed
           };

        //    console.log(`🔼 Send product to cart with quantity: ${quantity}`);

           // Add product to cart
           await dispatch(addToCart(productToAdd));

           // Show a notification of a successful addition to the cart
           toast.success("The product has been added to the cart 🛒", {
               position: "top-center",
               autoClose: 2000,
               style: {
                   backgroundColor: "#FCE8EF",
                   color: "#5C0A25",
                   fontWeight: "bold",
                   fontFamily: "inherit",
                   borderRadius: "10px",
                   boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
               },
               icon: "🛒",
           });
       } catch (err) {
           console.error("Error adding to cart:", err);
           toast.error("An error occurred while adding the product to the cart.", { position: "top-center" });
       } finally {
           setIsAdding(false);
       }
   };



    if (loading) return <p className="text-center text-[#5C0A27] text-xl mt-10">Loading...</p>;
    if (error) return <p className="text-center text-[#5C0A27] text-xl mt-10">Error: {error}</p>;
    if (!product) return <p className="text-center text-[#5C0A27] text-xl mt-10">Product not found.</p>;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-6">
                <div className="flex-shrink-0">
                    <img src={product.images[0]} alt={product.title} className="w-88 h-110 rounded-lg" />
                </div>
                <div className="max-w-lg">
                    <h2 className="text-[#F0759E] text-2xl font-bold">{product.title}</h2>
                    <p className="text-[#5C0A27] text-lg mt-2">{product.description}</p>

                    <h6 className="text-[#F0759E] mt-4 text-lg font-semibold">📍 Size:</h6>
                    <div className="flex flex-wrap gap-2 my-2">
                        {product.size?.length ? (
                            product.size.map((s, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSize(s)}
                                    className={`px-4 py-1 border rounded-lg transition ${selectedSize === s ? "bg-[#F0759E] text-white" : "text-[#5C0A27] border-[#F0759E] hover:bg-[#F0759E20]"}`}>
                                    {s}
                                </button>
                            ))
                        ) : (
                            <p className="text-[#5C0A27]">No sizes available</p>
                        )}
                    </div>

                    <div className="flex space-x-1 text-yellow-500 text-xl mt-3">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                        ))}
                    </div>
                    <h3 className="text-[#5C0A27] text-2xl font-bold mt-4">EGP {product.price}</h3>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 relative">
                <div className="flex items-center p-2 space-x-4 absolute left-1/2 transform -translate-x-1/2">
                    <button onClick={decreaseQuantity} className="bg-[#EC4680] text-white text-xl px-4 py-2 rounded-lg hover:opacity-90">
                        <i className="fas fa-minus"></i>
                    </button>
                    <span className="text-lg border border-none w-10 h-10 bg-[#EC468038] flex items-center justify-center rounded-full font-semibold">{quantity}</span>
                    <button onClick={increaseQuantity} className="bg-[#EC4680] text-white text-xl px-4 py-2 rounded-lg hover:opacity-90">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>

                <div className="flex items-end space-x-4 absolute right-5">
                    <button onClick={handleAddToCart} className="bg-[#EC4680] text-white px-6 py-2 rounded-lg hover:opacity-90 text-lg font-semibold flex items-center gap-2" disabled={isAdding}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
