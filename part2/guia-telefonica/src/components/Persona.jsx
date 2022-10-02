import React from "react";

export const Persona = ({ person }) => {
    return (
        <p>
            {person.name} {person.number}
        </p>
    );
};
