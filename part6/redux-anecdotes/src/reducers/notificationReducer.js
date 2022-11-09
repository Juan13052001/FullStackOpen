const initialState = "";
let timeoutID = -1;
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

export const setNotification = (message, duration) => {
    return (dispatch) => {
        if (timeoutID >= 0) {
            clearTimeout(timeoutID);
            timeoutID = -1;
        }
        dispatch(addNotification(message));
        timeoutID = setTimeout(() => {
            dispatch(removeNotification());
        }, duration * 1000);
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
