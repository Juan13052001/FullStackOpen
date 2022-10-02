import React from "react";
import { Statistic } from "./Statistic";

export const Statistics = ({
    good,
    neutral,
    bad,
    promedio,
    promedioPositivo,
    total,
}) => {
    return (
        <>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="All" value={total} />
            <Statistic text="Average" value={promedio} />
            <Statistic text="Positive" value={`${promedioPositivo}%`} />
            {/* <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
            <p>All {total}</p>
            <p>Average {promedio}%</p>
            <p>Positive: {promedioPositivo}%</p> */}
        </>
    );
};
