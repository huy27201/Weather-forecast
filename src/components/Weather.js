import WeatherFilter from './WeatherFilter'
import WeatherCurrent from "./WeatherCurrent";
import WeatherList from "./WeatherList";
import queryString from "query-string";
import '../assets/scss/Weather.css';
import React, { useState, useEffect } from "react";

function Weather() {
    const [weatherList, setWeatherList] = useState({});

    const [foreCast, setForeCast] = useState({
        q: "HaNoi",
        days: 1,
    });
    useEffect(() => {
        async function getWeatherList() {
        try {
            const paramsString = queryString.stringify(foreCast);
            console.log(paramsString);
            const url = `https://api.weatherapi.com/v1/forecast.json?key=eea0c8a5ff5c47a880d104712212906&${paramsString}`;
            const responseJSON = await (await fetch(url)).json();
            console.log(responseJSON);
            setWeatherList(responseJSON);
        } catch (error) {
            console.log(error.message);
        }
        }
        getWeatherList();
    }, [foreCast]);

    function handleSearch(value) {
        setForeCast({
        ...foreCast,
        q: value,
        });
    }
    return (
        <div id="weather">
            <WeatherFilter onSubmit={handleSearch} />
            <WeatherCurrent value={weatherList} />
            <WeatherList value={weatherList} />
        </div>
    );
}

export default Weather;
