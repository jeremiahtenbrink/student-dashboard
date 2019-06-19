import { store } from "../firebase";
import { push } from "connected-react-router";
import { action } from "./action";
import { NEW_USER } from "./authActions";
import { IUser } from "../types/UserInterface";

export const FETCH_USER_BY_ID_INIT = "FETCH_USER_BY_ID_INIT";
export const FETCH_USER_BY_ID_SUCCESS = "FETCH_USER_BY_ID_SUCCESS";
export const FETCH_USER_BY_ID_FAILED = "FETCH_USER_BY_ID_FAILED";

export const getUserById = ( id: string ) => dispatch => {
    
    dispatch( action( FETCH_USER_BY_ID_INIT ) );
    store.collection( "students" )
        .doc( id )
        .get()
        .then( res => {
            if ( res.exists ) {
                const data = res.data();
                data.id = res.id;
                if ( !data.course ) {
                    data.course = "FSW";
                }
                dispatch( action( FETCH_USER_BY_ID_SUCCESS, data ) );
                dispatch( push( "/dashboard" ) );
            } else {
                dispatch( action( NEW_USER ) );
            }
        } )
        .catch(
            err => dispatch( action( FETCH_USER_BY_ID_FAILED, err.message ) ) );
};

export const FETCH_POTENTIAL_USER_BY_ID_INIT = "FETCH_POTENTIAL_USER_BY_ID_INIT";
export const FETCH_POTENTIAL_USER_BY_ID_SUCCESS = "FETCH_POTENTIAL_USER_BY_ID_SUCCESS";
export const FETCH_POTENTIAL_USER_BY_ID_FAILED = "FETCH_POTENTIAL_USER_BY_ID_FAILED";

export const getPotentialUserById = ( id: string ) => dispatch => {
    
    dispatch( action( FETCH_POTENTIAL_USER_BY_ID_INIT ) );
    store.collection( "students" ).doc( id ).get().then( res => {
        if ( res.exists ) {
            const userData: IUser = res.data() as IUser;
            userData.id = res.id;
            dispatch( action( FETCH_POTENTIAL_USER_BY_ID_SUCCESS, userData ) );
            return;
        }
        dispatch( action( FETCH_POTENTIAL_USER_BY_ID_FAILED,
            "User not found."
        ) );
    } ).catch( err => {
        dispatch( action( FETCH_POTENTIAL_USER_BY_ID_FAILED, err.message ) );
    } );
};

export const CLEAR_POTENTIAL_USER = "CLEAR_POTENTIAL_USER";

export const clearPotentialUser = () => dispatch => {
    dispatch( action( CLEAR_POTENTIAL_USER ) );
};

export const LINK_POTENTIAL_USER_TO_ID_INIT = "LINK_POTENTIAL_USER_TO_ID_INIT";
export const LINK_POTENTIAL_USER_TO_ID_SUCCESS = "LINK_POTENTIAL_USER_TO_ID_SUCCESS";
export const LINK_POTENTIAL_USER_TO_ID_FAILED = "LINK_POTENTIAL_USER_TO_ID_FAILED";

export const linkPotentialUserToId = ( id, potentialUser ) => dispatch => {
    dispatch( action( LINK_POTENTIAL_USER_TO_ID_INIT ) );
    store.collection( "students" )
        .doc( potentialUser.id )
        .delete()
        .then( res => {
            console.log( "Removed potential user." );
            
            store.collection( "students" )
                .doc( id )
                .set( potentialUser )
                .then( res => {
                    console.log( "Linked potential user" );
                    dispatch( action( LINK_POTENTIAL_USER_TO_ID_SUCCESS,
                        potentialUser
                    ) );
                    dispatch( push( "/dashboard" ) );
                } )
                .catch( err => {
                    dispatch( action( LINK_POTENTIAL_USER_TO_ID_FAILED,
                        err.message
                    ) );
                } );
            
        } )
        .catch( err => {
            dispatch( action( LINK_POTENTIAL_USER_TO_ID_FAILED, err.message ) );
        } );
};

export const CREATE_NEW_USER_INIT = "CREATE_NEW_USER_INIT";
export const CREATE_NEW_USER_SUCCESS = "CREATE_NEW_USER_SUCCESS";
export const CREATE_NEW_USER_FAILED = "CREATE_NEW_USER_FAILED";

export const createNewUser = ( user: IUser ) => dispatch => {
    
    dispatch( action( CREATE_NEW_USER_INIT ) );
    store.collection( "students" )
        .doc( user.id )
        .set( user )
        .then( res => {
            console.log( "Created new user" );
            
            dispatch( action( CREATE_NEW_USER_SUCCESS, user ) );
            dispatch( push( "/dashboard" ) );
            
        } )
        .catch( err => {
            dispatch( action( CREATE_NEW_USER_FAILED, err.message ) );
        } );
};
