import React from "react";
import Weather from "./Weather";

export const Country = ({ name, capital, population, flagUrl }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <img src={flagUrl} alt="No flag found" height="250" width="350" />
            <Weather capital={capital} />
        </div>
    );
};
