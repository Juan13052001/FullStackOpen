import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { AddPerson } from "./components/AddPerson";
import { FilterPerson } from "./components/FilterPerson";
import { NumbersPersons } from "./components/NumbersPersons";
const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [personFilter, setPersonFilter] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then((response) => setPersons(response.data));
    }, []);

    const onInputNameChange = (e) => {
        setNewName(e.target.value);
    };

    const onInputPhoneChange = (e) => {
        setNewPhone(e.target.value);
    };

    const onInputFilterChange = (e) => {
        setPersonFilter(e.target.value);
    };

    const addPerson = (e) => {
        e.preventDefault();
        const persona = {
            name: newName,
            number: newPhone,
        };
        if (
            persons.filter((person) => person.name === persona.name).length > 0
        ) {
            return alert(`${persona.name} ya existe`);
        }
        setPersons([
            ...persons,
            {
                name: newName,
                number: newPhone,
            },
        ]);

        setNewName("");
        setNewPhone("");
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <FilterPerson
                personFilter={personFilter}
                onInputFilterChange={onInputFilterChange}
            />
            <h2>Add a new</h2>
            <AddPerson
                addPerson={addPerson}
                newName={newName}
                newPhone={newPhone}
                onInputNameChange={onInputNameChange}
                onInputPhoneChange={onInputPhoneChange}
            />
            <h2>Numbers</h2>
            <NumbersPersons persons={persons} personFilter={personFilter} />
        </div>
    );
};

export default App;
