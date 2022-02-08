import React, { useState } from 'react'
import { BiCurrentLocation } from 'react-icons/bi'
import ReactTooltip from 'react-tooltip'

function WeatherFilter(props) {
    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = e => {
        e.preventDefault()  
        props.onSubmit(searchTerm)
    }
    
    const handleCurrent = () => { 
        props.onCurrent()
    }

    const handleChange = event => {
        const value = event.target.value
        setSearchTerm(value)
    }
    return (
        <form className = 'filter' onSubmit = {handleSubmit}>
            <div className='search-container'>
                <input 
                    className='search' 
                    type='text' 
                    autoComplete='off' 
                    placeholder='Enter the city' 
                    onChange={handleChange}
                    value = {searchTerm} 
                />
                <BiCurrentLocation className='location' data-tip="Current location" onClick={handleCurrent}/>
                <ReactTooltip place="bottom" type="dark" effect="float"/>
            </div>
            <button className='btn'>Search</button>
        </form>
    )
}

export default WeatherFilter
