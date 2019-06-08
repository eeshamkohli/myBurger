import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../../ui/Backdrop/Backdrop';

const SideDrawer = (props) => {
   let attatchedClasses = [classes.SideDrawer, classes.Closed];
   if(props.open){
       attatchedClasses = [classes.SideDrawer, classes.Open]; 
   }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attatchedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer

