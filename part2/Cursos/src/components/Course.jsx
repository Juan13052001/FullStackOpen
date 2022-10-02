import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";
export const Course = ({ course }) => {
    const totalCursos = course.parts.reduce(
        (total, cursos) => (total += cursos.exercises),
        0
    );

    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={totalCursos} />
        </>
    );
};
