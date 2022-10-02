export const FilterPerson = ({ personFilter, onInputFilterChange }) => {
    return (
        <form>
            <div>
                Filter shown with:{" "}
                <input value={personFilter} onChange={onInputFilterChange} />
            </div>
        </form>
    );
};
