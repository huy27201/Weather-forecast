import React, { useState } from 'react'

function WeatherFilter(props) {
    const [searchTerm, setSearchTerm] = useState('')

    function handleSubmit(e) {
        e.preventDefault()  
        props.onSubmit(searchTerm)
    }

    const handleChange = event => {
        const value = event.target.value
        setSearchTerm(value)
    }
    return (
        <form className = 'filter' onSubmit = {handleSubmit}>
            <input 
                className='search' 
                type='text' 
                autoComplete='off' 
                placeholder='Enter the location' 
                onChange={handleChange}
                value = {searchTerm} 
            />
            <button className='btn'>Search</button>
        </form>
    )
}

export default WeatherFilter
