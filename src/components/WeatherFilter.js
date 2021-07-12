import React from 'react'

function WeatherFilter(props) {
    
    function handleSubmit(e) {
        e.preventDefault()  
        props.onSubmit(e.target.elements.city.value)
    }
    return (
        <form className = 'filter' onSubmit = {handleSubmit}>
            <input name='city' className='search' type='text' autoComplete='off' placeholder='Enter the location.'/>
            <button className='btn'>Search</button>
        </form>
    )
}

export default WeatherFilter
