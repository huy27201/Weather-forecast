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

    // get the weather forcast based on the search keyword
    useEffect(() => {
        async function getWeatherList() {
            try {
                const paramsString = queryString.stringify(foreCast);
                const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&${paramsString}`;
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
