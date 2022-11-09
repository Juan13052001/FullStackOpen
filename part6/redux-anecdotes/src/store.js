import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // no changes here 😀
import { composeWithDevTools } from "redux-devtools-extension";
import anecdotesReducer from "./reducers/anecdotesReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
