import { useState } from "react";
import { Button } from "./components/Button";
import { Statistics } from "./components/Statistics";
export const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const total = good + neutral + bad;
    const handleClickGood = () => {
        setGood(good + 1);
    };
    const handleClickBad = () => {
        setBad(bad + 1);
    };

    const handleClickNeutral = () => {
        setNeutral(neutral + 1);
    };

    const promedio = total / 3;
    const promedioPositivo = good / total;
    return (
        <>
            <h1>Give feedback</h1>
            <Button text="Good" handleClick={handleClickGood} />
            <Button text="Neutral" handleClick={handleClickNeutral} />
            <Button text="Bad" handleClick={handleClickBad} />
            <h2>Statistics</h2>
            {total === 0 ? (
                <p>No Feedback given</p>
            ) : (
                <Statistics
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    promedio={promedio}
                    promedioPositivo={promedioPositivo}
                    total={total}
                />
            )}
        </>
    );
};
