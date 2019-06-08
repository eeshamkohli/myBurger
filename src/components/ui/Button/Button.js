import React from 'react'
import classes from './Button.module.css'

function Button(props) {
    return (
        <button onClick={props.clicked} className={[classes.Button, classes[props.buttonType]].join(' ')} disabled={props.disabled}>{props.children}</button>
    )
}

export default Button
