import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productsAction";

// Action to reset products (you'll need to add this to your Redux setup)
const RESET_PRODUCTS = "RESET_PRODUCTS";

const ViewHomeProductsHook = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.allProducts.data || []);
    const loading = useSelector((state) => state.allProducts.loading);
    const error = useSelector((state) => state.allProducts.error);
    const selectedSkinType = useSelector((state) => state.skinType.selected);

    useEffect(() => {
        // Set a flag in localStorage to detect page refresh
        const handleBeforeUnload = () => {
            localStorage.setItem("pageRefreshed", "true");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        // Check if the page was refreshed
        const isPageRefreshed = localStorage.getItem("pageRefreshed") === "true";

        if (isPageRefreshed) {
            // Reset the products state in Redux
            dispatch({ type: RESET_PRODUCTS });
            // Clear the flag after handling
            localStorage.removeItem("pageRefreshed");
        } else if (selectedSkinType?._id) {
            // Fetch products only if the page was not refreshed
            // console.log("Hook Triggered - selectedSkinType:", selectedSkinType);
            dispatch(getAllProducts(selectedSkinType._id));
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [selectedSkinType, dispatch]);

    useEffect(() => {
        // console.log("🧪 Products from Redux:", products);
    }, [products]);

    const state = useSelector((state) => state);
    // console.log("📦 Full Redux State:", state);

    return [products, selectedSkinType, loading, error];
};

export default ViewHomeProductsHook;
