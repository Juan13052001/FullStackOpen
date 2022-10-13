import { Persona } from "./Persona";

export const NumbersPersons = ({ persons, personFilter, deleteContact }) => {
    return (
        <ul>
            {persons
                .filter((person) =>
                    person.name
                        .toLowerCase()
                        .includes(personFilter.toLowerCase())
                )
                .map((person) => (
                    <Persona
                        person={person}
                        key={person.name}
                        deleteContact={deleteContact}
                    />
                ))}
        </ul>
    );
};
