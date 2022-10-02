import { Part } from "./Part";

export const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) => (
                <Part
                    part={part.name}
                    exercise={part.exercises}
                    key={part.name}
                />
            ))}
        </>
    );
};
