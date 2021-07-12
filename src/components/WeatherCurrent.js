import React from 'react'

function WeatherCurrent(props) {
    const {current, location} = props.value
    return (
        <div className='weather-current'>
            {typeof location != 'undefined' ? <h1>{location.name}</h1> : ('')}
            {typeof current != 'undefined' ? 
                <div>
                    <img className='current-img' src={current.condition.icon} alt='' />
                    <p className='current temp'>{current.temp_c}°C</p>
                    <p className='current describe'>{current.condition.text}</p>
                </div> : ('')}
        </div>
        
    )
}

export default WeatherCurrent
