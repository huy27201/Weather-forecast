import React from 'react'

function WeatherCurrent(props) {
    const {current, location} = props.value
    return (
        <div className='weather-current'>
            { location ? <h1>{location.name}</h1> : ('')}
            { current ? 
                <div>
                    <img 
                        className='current-img' 
                        src={current.condition.icon} 
                        alt='' 
                    />
                    <p className='current temp'>
                        {current.temp_c}°C
                    </p>
                    <p className='current describe'>
                        {current.condition.text}
                    </p>
                </div> 
                : <h1>Invalid city</h1>
            }
        </div>
    )
}

export default WeatherCurrent
