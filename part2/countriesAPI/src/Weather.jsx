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
                const {
                    weather: [{ description, icon, id }],
                    sys: { country },
                    name,
                    main: { temp, humidity },
                } = resp.data;
                setWeatherData({
                    description,
                    icon,
                    id,
                    country,
                    name,
                    temp,
                    humidity,
                });
            });
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
            <h2>
                Weather in {capital}, {weatherData.country}
            </h2>
            <p>{weatherData.description}</p>
            <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.name}
            />
            <p>{weatherData.temp} °C</p>
            <p>{weatherData.humidity}</p>
        </div>
    );
};

export default Weather;
