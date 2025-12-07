import React from 'react'

function ButtonCustom({ title, className, style, onClick, ...rest }) {
    return (
        <button
            className={`group-button ${className}`}
            style={style}
            {...rest}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default ButtonCustom