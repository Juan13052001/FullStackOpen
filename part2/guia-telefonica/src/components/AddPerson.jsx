import React from "react";

export const AddPerson = ({
    addPerson,
    newName,
    newPhone,
    onInputNameChange,
    onInputPhoneChange,
}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={onInputNameChange} />
            </div>
            <div>
                phone: <input value={newPhone} onChange={onInputPhoneChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};
