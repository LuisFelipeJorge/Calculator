import React from 'react'
import './Button.css'

export default props => 
    <button
        onClick={e => props.click && props.click(props.label)} // guarantees that the second part will only be executed if the first is true
        className={`
            button
            ${props.operation ? 'operation':''}  // if the property is defined, pass the class operation, otherwise pass nothing
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}>
        {props.label}
    </button>
