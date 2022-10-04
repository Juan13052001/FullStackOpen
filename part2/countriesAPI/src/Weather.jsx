import axios from "axios";
import { useState } from "react";

const Weather = ({ capital }) => {
    const [weatherData, setWeatherData] = useState({});
    const Weather = () => {
        axios
            .get(
                `${process.env.REACT_APP_URL}${capital}${process.env.REACT_APP_WEATHER_API}`
            )
            .then((resp) => {
                console.log(resp.data);
                setWeatherData(resp.data);
            });
    };
    return <div onLoad={()=>Weather()}>Weather</div>;
};

export default Weather;
