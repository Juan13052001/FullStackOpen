import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ capital }) => {
    const [weatherData, setWeatherData] = useState([]);
    const Weather = async () => {
        const data = await axios
            .get(
                `${import.meta.env.VITE_URL}${capital[0]}${
                    import.meta.env.VITE_WEATHER_API
                }`
            )
            .then((resp) => {
                console.log(resp.data);
                setWeatherData(resp.data);
            });
        const {
            weather: { description, icon, id },
            sys,
            name,
            main: { temp, humidity },
        } = data;
        return {
            sys,
            name,
            main,
            description,
            icon,
            id,
            temp,
            humidity,
        };
    };

    useEffect(() => {
        const data = async () => {
            const dataWeather = await Weather();
            return dataWeather;
        };
        data();
    }, [capital]);
    return (
        <div>
            Weather in {capital}
            <p>{weatherData.temp}</p>
        </div>
    );
};

export default Weather;
