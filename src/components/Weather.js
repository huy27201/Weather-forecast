import WeatherFilter from './WeatherFilter'
import WeatherCurrent from "./WeatherCurrent";
import WeatherList from "./WeatherList";
import queryString from "query-string";
import '../assets/scss/Weather.css';
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function Weather() {
    const [weatherList, setWeatherList] = useState({});

    // default location is Ha Noi
    const [foreCast, setForeCast] = useState({
        q: "HaNoi",
        days: 1,
    });

    // get the latitude and longitude of the device
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(success, error);
    }
    
    // get the city after finding the location of the device
    const success = async pos => {
        const { latitude, longitude } = pos.coords;
    
        console.log(`Latitude : ${latitude}`);
        console.log(`Longitude: ${longitude}`);
    
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`;
        const res = await (await fetch(url)).json();
        console.log(res);

        const region = res.features.length > 0 ? res.features.find(item => item.id.includes("region")) : ''; // check exists region
        if (region) {
            handleSearch(region.text);  //city
        }
        else {
            toast.error("couldn't locate your city!"); 
        }
    }
    
    const error = err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    useEffect(() => {
        getLocation();
    }, [])

    // get the weather forcast based on the search keyword
    useEffect(() => {
        // get the weather list of the city
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

    const handleSearch = value => {
        setForeCast({
            ...foreCast,
            q: value,
        });
    }
    const handleCurrent = () => {
        getLocation();
    }

    return (
        <div id="weather">
            <WeatherFilter onSubmit={handleSearch} onCurrent={handleCurrent}/>
            <WeatherCurrent value={weatherList} />
            <WeatherList value={weatherList} />
        </div>
    );
}

export default Weather;