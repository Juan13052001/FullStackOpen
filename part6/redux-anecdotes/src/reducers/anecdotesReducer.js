import anecdoteServices from "../services/anecdotes";

const asObject = (anecdote) => {
    return {
        content: anecdote,
        votes: 0,
    };
};

export const addAnecdote = (content) => {
    return async (dispatch) => {
        dispatch({
            type: "ADD_ANECDOTE",
            data: content,
        });
    };
};

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteServices.getAll();
        dispatch({
            type: "INIT_ANECDOTES",
            data: anecdotes,
        });
    };
};

export const vote = (id) => {
    return async (dispatch, getState) => {
        const state = getState().anecdotes;
        console.log(state);
        const anecdoteToChange = state.find((a) => a.id === id);
        const changedAnecdote = {
            ...anecdoteToChange,
            votes: anecdoteToChange.votes + 1,
        };
        const updatedAnecdote = await anecdoteServices.updateAnecdote(
            id,
            changedAnecdote
        );
        const anecdotes = state.map((a) => (a.id !== id ? a : updatedAnecdote));
        dispatch(initializeAnecdotes(anecdotes));
    };
};

const reducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_ANECDOTE": {
            return [...state, action.data];
        }
        case "INIT_ANECDOTES":
            return action.data;
        case "VOTE": {
            return state.map((a) => (a.id !== id ? a : newAnecdotes));
        }
        default:
            return state;
    }
};

export default reducer;
