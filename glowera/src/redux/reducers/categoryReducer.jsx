import { GET_ALL_CATEGORIES, GET_CATEGORIES_ERROR } from "../type";

const initial = {
    category:[],
    loading:true,
}
const categoryReducer=(state=initial , action)=>{
    switch (action.type) {
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                category: action.payload,
                loading: false,
            };
        case GET_CATEGORIES_ERROR:
            return {
                loading: true,
                category: action.payload,
            };
        default:
            return state;
    }
}

export default categoryReducer