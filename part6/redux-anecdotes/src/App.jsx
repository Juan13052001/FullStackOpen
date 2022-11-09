import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { initializeAnecdotes } from "./reducers/anecdotesReducer";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, [dispatch]);

    return (
        <div>
            <h2>Anecdotes</h2>

            <Notification />
            <Filter />
            <AnecdoteForm />
            <AnecdoteList />
        </div>
    );
};

export default App;
