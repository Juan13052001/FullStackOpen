import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdotesReducer";
import {
    addNotification,
    removeNotification,
    setNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addNewAnecdote = async (e) => {
        e.preventDefault();
        const content = e.target.anecdota.value;
        e.target.anecdota.value = "";
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(addAnecdote(newAnecdote));
        dispatch(setNotification(`You add ${newAnecdote.content}`, 5));
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
