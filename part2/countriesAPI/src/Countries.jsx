import { useState } from "react";
import { Country } from "./Country";
import { CountrySimple } from "./CountrySimple";

export const Countries = ({ paises, newSearch }) => {
    const [country, setCountry] = useState();

    const show = (e) => {
        console.log(e.target.value);
        const cont = paises.filter((pais) =>
            pais.name.common.includes(e.target.value)
        );
        console.log("cont: ", cont);
        setCountry(cont[0]);
    };

    const countryFilter = paises.filter((pais) =>
        pais.name.common.toUpperCase().includes(newSearch.toUpperCase())
    );

    if (countryFilter.length >= 10) {
        return <p>Too many matches, specify another filter</p>;
    }
    if (country !== undefined) {
        return (
            <Country
                key={country.name.common}
                name={country.name.common}
                capital={country.capital}
                population={country.population}
                flagUrl={country.flags.png}
            />
        );
    }
    if (countryFilter.length > 1) {
        return (
            <ul>
                {paises
                    .filter((country) =>
                        country.name.common
                            .toUpperCase()
                            .includes(newSearch.toUpperCase())
                    )
                    .map((country) => (
                        <CountrySimple
                            key={country.name.common}
                            show={show}
                            name={country.name.common}
                            country={country}
                        />
                    ))}
            </ul>
        );
    }
    return (
        <ul>
            {paises
                .filter((country) =>
                    country.name.common
                        .toUpperCase()
                        .includes(newSearch.toUpperCase())
                )
                .map((country) => (
                    <>
                        <Country
                            capital={country.capital}
                            flagUrl={country.flags.png}
                            name={country.name.common}
                            population={country.population}
                            key={country.name.common}
                        />
                    </>
                ))}
        </ul>
    );
};
