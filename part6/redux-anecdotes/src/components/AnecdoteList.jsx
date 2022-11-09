import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdotesReducer";
import { setNotification } from "../reducers/notificationReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) =>
        state.filter
            ? state.anecdotes.filter((a) => a.content.includes(state.filter))
            : state.anecdotes
    );
    const dispatch = useDispatch();

    const handleVote = ({ id, content }) => {
        dispatch(vote(id));
        dispatch(setNotification(`Haz votado por ${content}`, 5));
    };

    return (
        <>
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map((a) => (
                    <Anecdote key={a.id} anecdote={a} handleVote={handleVote} />
                ))}
        </>
    );
};

export default AnecdoteList;
