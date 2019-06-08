import React from 'react'

import classes from './Input.module.css'

const Input = (props) => {

    let inputEl = null;
    const inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputEl = <input {...props.elementConfig} value={props.value} className={inputClasses.join(' ')} onChange={props.changed} />
            break;
        case 'textarea':
            inputEl = <textarea {...props.elementConfig} value={props.value} className={inputClasses.join(' ')} onChange={props.changed} />
            break;
        case 'select':
            inputEl = (
                <select value={props.value} className={inputClasses.join(' ')} onChange={props.changed} >{props.elementConfig.options.map(val =>
                    <option value={val.value} key={val.value} >
                        {val.displayValue}
                    </option>)}
                </select>
            )
            break;
        default:
            inputEl = <input {...props.elementConfig} value={props.value} className={inputClasses.join(' ')} onChange={props.changed} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
        </div>
    )
}

export default Input
