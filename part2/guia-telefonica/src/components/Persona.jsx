import React from "react";

export const Persona = ({ person, deleteContact }) => {
    return (
        <p>
            {person.name} {person.number}
            <button
                id={person.id}
                name={person.name}
                type="button"
                onClick={() => deleteContact(person.name, person.id)}
            >
                Delete
            </button>
        </p>
    );
};
