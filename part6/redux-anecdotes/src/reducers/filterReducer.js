const initialState = "";

export const changeFilter = (filter) => {
    return {
        type: "filter",
        filter: filter,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "filter":
            return action.filter;
        default:
            return state;
    }
};

export default reducer;
