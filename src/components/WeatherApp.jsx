import React, { useEffect, useState } from 'react';
import axios from 'axios';


const WeatherApp = () => {

    const [weather, setWeather] = useState({})

    const [temperatureValue, setTemperatureValue] = useState()
    const [temperatureType, setTemperatureType] = useState("°C")





    useEffect(() => {

        const success = pos => {

            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f55a6629bf6e12d1d8122dabbec870fe&units=metric`)
                .then(res => {
                    setWeather(res.data)
                    setTemperatureValue(Math.round(res.data.main.temp))
                })



        }



        navigator.geolocation.getCurrentPosition(success)

    }, [])


    console.log(weather)





    const changeType = () => {

        if (temperatureType === "°F") {

            setTemperatureValue(Math.round((temperatureValue - 32) / 1.8))
            setTemperatureType("°C")


        } else {
            setTemperatureValue(Math.round(temperatureValue * 1.8 + 32))
            setTemperatureType("°F")



        }



    }



    const changeBGWeather = () => {

        let bgWeather = ""
        let weatherValue = weather.weather?.[0].description

        if (weatherValue === "broken clouds" || weatherValue === "overcast clouds") {
            return bgWeather = "https://media.giphy.com/media/gk3s6G7AdUNkey0YpE/giphy.gif"
        }

        if (weatherValue === "few clouds" || weatherValue === "scattered clouds" || weatherValue === "few clouds" || weatherValue === "haze") {
            return bgWeather = "https://64.media.tumblr.com/f2c54f963c4ce18a1befdc9618674bfc/11dcc9f9aecf9fca-94/s250x400/0e365a2831970b544966d9fa67513d60c6f0d128.gifv"
        }

        if (weatherValue === "clear sky") {
            return bgWeather = "https://c.tenor.com/Xl68k_UY0boAAAAC/sunrise-desert.gif"
        }

        if (weatherValue === "rain") {
            return bgWeather = "https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif"
        }



        return bgWeather
    }


    document.body.style = `background-image: url(${changeBGWeather()}); background-repeat: no-repeat; background-size: 100%;`








    return (

        <div className='container'>

            <div className="card-weather">

                <h1>Weather App</h1>
                <h3>{weather.name}, {weather.sys?.country}</h3>
                <h3>{temperatureValue}{temperatureType}  "{weather.weather?.[0].description}"</h3>
                <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                <ul>
                    <li><strong>Wind Speed</strong></li>
                    <li>{weather.wind?.speed} m/s</li>
                    

                    <li><strong>Clouds</strong></li>
                    <li>{weather.clouds?.all} %</li>
                    

                    <li><strong>Pressure</strong></li>
                    <li>{weather.main?.pressure} hPa</li>



                </ul>
                <button onClick={changeType}>Degrees °F / °C </button>
            </div>



        </div>
    );
};

export default WeatherApp;