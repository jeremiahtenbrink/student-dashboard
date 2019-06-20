import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Welcome from "./Views/Welcome";
import { checkAuth } from "./actions";
import "./App.scss";
import requireAuth from "./AuthRoutes";
import Dashboard from "./Views/Dashboard";
import Retro from "./Views/Retro";
import firebase from "./firebase";
import Sprint from "./Views/Sprint";

interface IProps {
    checkAuth: Function;
    isAuthenticated: boolean;
}

interface IState {
    redirected: boolean
}

class App extends React.Component<IProps, IState> {
    
    private unregisterAuthObserver: firebase.Unsubscribe;
    
    state = {
        redirected: false,
    };
    
    
    componentDidMount() {
        debugger;
        this.unregisterAuthObserver = firebase.auth()
            .onAuthStateChanged( () => this.props.checkAuth() );
    }
    
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }
    
    render() {
        
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
            <Route path="/sprint"
                   component={ requireAuth( Sprint,
                       this.props.isAuthenticated
                   ) }
            />
        </Switch> );
    }
}

const mstp = state => ( {
    isAuthenticated: state.users.isAuthenticated,
} );


export default withRouter(
    connect( mstp, { checkAuth: Function } )( App ) );
