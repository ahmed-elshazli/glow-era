// ✅ أنواع الإجراءات لنوع البشرة
export const SET_SKIN_TYPE = "SET_SKIN_TYPE";

// ✅ مُخفّض نوع البشرة
const skinTypeReducer = (state = { selected: null }, action) => {
    switch (action.type) {
        case SET_SKIN_TYPE:
            return {
                ...state,
                selected: action.payload,
            };
        default:
            return state;
    }
};

export default skinTypeReducer;
