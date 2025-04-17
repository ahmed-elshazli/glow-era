import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import bg from "../../assets/Rectangle5.png";
import bg_blur from "../../assets/Rectangle1.png";
import { getAllProducts } from "../../redux/actions/productsAction";
import getAllCategories from "../../redux/actions/categoryAction";
import { setSkinType } from "../../redux/actions/skinTypeAction";
import "./Header.css";

export default function Header() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const dispatch = useDispatch();
  const { category, loading } = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedCategory) {
          setAlert({ type: "success", message: `You selected: ${selectedCategory.name}` });
          dispatch(setSkinType(selectedCategory));
          dispatch(getAllProducts(selectedCategory._id)); // ✅ هنا نرسل ID
      } else {
          setAlert({ type: "error", message: "Please select a skin type." });
      }
  };

  return (
      <header className="header w-full relative">
          {/* Alert Popup */}
          {alert.message && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                  <div className={`rounded-lg shadow-lg p-4 w-full max-w-sm ${alert.type === "success" ? "bg-white border border-green-300" : "bg-white border border-red-300"}`}>
                      <div className="flex items-start gap-4">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className={`size-6 ${alert.type === "success" ? "text-green-600" : "text-red-600"}`}>
                              {alert.type === "success" ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              )}
                          </svg>
                          <div className="flex-1">
                              <strong className="font-medium text-gray-900">{alert.type === "success" ? "Selection Saved" : "Error"}</strong>
                              <p className="mt-0.5 text-sm text-gray-700">{alert.message}</p>
                          </div>
                          <button onClick={() => setAlert({ type: "", message: "" })} className="rounded-full p-1.5 text-gray-500 transition hover:bg-gray-100" aria-label="Dismiss alert">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                          </button>
                      </div>
                  </div>
              </div>
          )}

          <div
              className="container w-full h-screen flex flex-col items-center justify-center relative px-4"
              style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <h1 className="text-4xl md:text-[120px] font-bold text-[#EB477E] text-center leading-tight font-cursive">Glow Era</h1>
              <h3 className="text-lg md:text-6xl font-bold text-[#EB477E] text-center leading-relaxed">What is your skin type?</h3>
              <p className="text-sm md:text-3xl text-[#EB477E] text-center mt-2">"Select your skin type to find the best products for you"</p>

              <form onSubmit={handleSubmit} className="flex flex-col items-center mt-14">
                  <div className="flex flex-wrap justify-center gap-4 md:gap-9">
                      {loading ? (
                          <p className="text-[#EB477E] text-lg md:text-2xl">Loading categories...</p>
                      ) : category && category.length > 0 ? (
                          category.map((cat) => (
                              <label key={cat._id} className="flex items-center text-[#EB477E] text-lg md:text-3xl font-medium cursor-pointer">
                                  <input type="radio" name="skin-type" value={cat.name} className="mr-3 w-5 h-5 md:w-7 md:h-7 custom-radio" onChange={(e) => setSelectedCategory(cat)} />
                                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                              </label>
                          ))
                      ) : (
                          <p className="text-[#EB477E] text-lg md:text-2xl">No categories available</p>
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
