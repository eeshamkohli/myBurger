import React from 'react'
import Aux from '../Auxilary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    drawerToggledHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    }

    render() {
        return (
            <Aux >
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerHandler} />
                <Toolbar drawerToggled={this.drawerToggledHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout
