import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducer";

const store = createStore(reducer);
function App() {
    const dispatch = (type) => {
        store.dispatch({
            type,
        });
    };

    return (
        <div>
            <button onClick={() => dispatch("GOOD")}>good</button>
            <button onClick={() => dispatch("OK")}>ok</button>
            <button onClick={() => dispatch("BAD")}>bad</button>
            <button onClick={() => dispatch("ZERO")}>reset stats</button>
            <div>good {store.getState().good}</div>
            <div>ok {store.getState().ok}</div>
            <div>bad {store.getState().bad}</div>
        </div>
    );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const renderApp = () => {
//     root.render(<App />);
// };

// renderApp();
// store.subscribe(renderApp);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
