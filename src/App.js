import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { cookieGet } from "./actions/cookie";
import { connect } from "react-redux";
import Welcome from "./Views/Welcome";
import { getUserById, checkAuth } from "./actions";
import "./App.scss";
import requireAuth from "./AuthRoutes";
import Dashboard from "./Views/Dashboard";
import Retro from "./Views/Retro";
import firebase from "./firebase";

const Protected = ( { component: Component, ...rest } ) => ( <Route
    { ...rest }
    render={ props => cookieGet( "code" ) ? <Component { ...props } /> :
        <Redirect to="/verify"/> }
/> );

class App extends React.Component{
    
    state = {
        redirected: false,
    };
    
    componentDidMount(){
        
        this.unregisterAuthObserver = firebase.auth()
            .onAuthStateChanged( () => this.props.checkAuth() );
    }
    
    componentWillUnmount(){
        this.unregisterAuthObserver();
    }
    
    render(){
        debugger;
        return ( <Switch>
            <Route exact path="/"
                   render={ props => <Welcome { ...props } /> }
            />
            <Route path="/dashboard"
                   component={ requireAuth( Dashboard,
                       this.props.isAuthenticated
                   ) }
            />
            <Route path="/retro"
                   component={ requireAuth( Retro,
                       this.props.isAuthenticated
                   ) }
            />
        </Switch> );
    }
}

const mstp = state => ( {
    isAuthenticated: state.users.isAuthenticated,
} );

export default withRouter( connect( mstp, { getUserById, checkAuth } )( App ) );
