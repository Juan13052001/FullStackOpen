import axios from "axios";
import { useEffect, useState } from "react";
import { Countries } from "./Countries";

function App() {
    const [paises, setPaises] = useState([]);
    const [paisBuscado, setPaisBuscado] = useState("");

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((resp) => setPaises(resp.data));
    }, []);

    const onInputChange = (e) => {
        setPaisBuscado(e.target.value);
    };

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                Find Countries:
                <input
                    type="text"
                    value={paisBuscado}
                    onChange={onInputChange}
                />
            </form>

            <Countries paises={paises} newSearch={paisBuscado} />
        </>
    );
}

export default App;
