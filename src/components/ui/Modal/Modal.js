import React from 'react'
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/Backdrop';
const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.ModalClosed}/>
            <div className={classes.Modal} style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)' }}>

                {props.children}
            </div>
        </Aux>
    )
}

export default Modal
