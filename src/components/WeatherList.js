import React from 'react'

function WeatherList(props) {
    const { forecast } = props.value

    const forecastListFilter = forecast ? 
        forecast.forecastday[0].hour.filter((item, index) => (index + 1) % 4 === 0) : null // 4-hour duration

    const foreCastList = forecastListFilter ? 
        forecastListFilter.map(item => 
            <div className='forecast-item' key = {item.time}>
                <p className='time'>{item.time.substring(item.time.indexOf(' ') + 1)}</p>
                <img src={item.condition.icon} alt=''></img>
                <p className='temp'>{item.temp_c}°C</p>
                <p className='describe'>{item.condition.text}</p>
            </div>
        ) 
        : null
    return (
        <div className='forecast-list'>
            {foreCastList}
        </div>
    )
}

export default WeatherList
