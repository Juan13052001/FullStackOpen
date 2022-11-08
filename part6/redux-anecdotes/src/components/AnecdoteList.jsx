import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdotesReducer";
import {
    addNotification,
    removeNotification,
} from "../reducers/notificationReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes);
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const handleVote = ({ id, content }) => {
        dispatch(vote(id));
        dispatch(addNotification(`Haz votado por ${content}`));
        setTimeout(() => {
            dispatch(removeNotification());
        }, 5000);
    };

    return (
        <>
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .filter((a) => a.content.includes(filter))
                .map((a) => (
                    <Anecdote key={a.id} anecdote={a} handleVote={handleVote} />
                ))}
        </>
    );
};

export default AnecdoteList;
