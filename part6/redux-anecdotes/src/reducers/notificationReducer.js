const initialState = "";

export const addNotification = (mensaje) => {
    return {
        type: "add_notification",
        mensaje: mensaje,
    };
};

export const removeNotification = () => {
    return {
        type: "remove_notification",
    };
};

const reducer = (state = initialState, action) => {
    console.log("state now: ", state);
    console.log("action: ", action);
    switch (action.type) {
        case "add_notification": {
            return action.mensaje;
        }
        case "remove_notification": {
            return initialState;
        }
        default:
            return state;
    }
};

export default reducer;
