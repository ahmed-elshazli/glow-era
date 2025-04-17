import { GET_ALL_CATEGORIES, GET_CATEGORIES_ERROR } from "../type";
import baseURL from "../../Api/baseURL";
import useGetData from "../../hooks/useGetData";

const getAllCategories = () => async (dispatch) => {
    try {
        // const res = await baseURL.get("/api/v1/categories");
        // console.log(res.data);
        const response = await useGetData("/api/v1/categories");
        //console.log(response.data);
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: response.data,
        });
    } catch (e) {
        dispatch({
            type: GET_CATEGORIES_ERROR,
            payload: "Error " + e,
        });
    }
};

export default getAllCategories;
