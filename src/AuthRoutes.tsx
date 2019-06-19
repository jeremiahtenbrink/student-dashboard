import React from "react";
import {History} from "history";

interface AuthenticateProps {
    isAuthenticated: boolean,
    history: History,
}

export default function <P extends object>( Component: React.ComponentType<P>,
                                            isAuthenticated: boolean ) {
    class Authenticate extends React.Component<P & AuthenticateProps>  {
        
        componentDidMount() {
            
            this.checkAndRedirect();
        }
        
        componentDidUpdate() {
            
            this.checkAndRedirect();
        }
        
        checkAndRedirect() {
            
            if ( !isAuthenticated ) {
                this.props.history.push( "/" );
            }
        }
        
        render() {
            return ( <Component { ...this.props as P } /> );
        }
    }
    
    return Authenticate;
}