import React from 'react'
import "./Button.css"

const Button = ({ text, onclick, type = 'button', classes }) => {
    return (
        <button
            type={type}
            onClick={onclick}
            className= {classes}
        >
            {text}
        </button>
    )
}

export default Button