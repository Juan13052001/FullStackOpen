import { useState } from "react";
const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];
const App = () => {
    const [selected, setSelected] = useState(0);
    const [votos, setVotos] = useState(new Uint8Array(6));
    const [masVotado, setMasVotado] = useState(0);
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const handleVoto = () => {
        const copy = [...votos];
        copy[selected] += 1;
        setVotos(copy);
        if (votos[selected] >= votos[masVotado]) {
            setMasVotado(selected);
        }
    };

    const handleClick = () => {
        setSelected(random(0, anecdotes.length - 1));
    };

    return (
        <div className="anecdotes">
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>Has {votos[selected]}</p>
            <button onClick={handleVoto}>Vota</button>
            <button onClick={handleClick}>Next anecdote</button>

            <h1>Anecdote with most votes</h1>
            {anecdotes[masVotado]}
        </div>
    );
};

export default App;
