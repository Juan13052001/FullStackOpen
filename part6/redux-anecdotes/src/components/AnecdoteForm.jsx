import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdotesReducer";
import {
    addNotification,
    removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addNewAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.anecdota.value;
        e.target.anecdota.value = "";
        dispatch(addAnecdote(content));
        dispatch(addNotification(`You add ${content}`));
        setTimeout(() => {
            dispatch(removeNotification());
        }, 5000);
    };
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div>
                    <input name="anecdota" />
                </div>
                <button>create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;
