import {
    SIGNIN_INIT, SIGNIN_SUCCESS, SIGNIN_FAILED, SIGNIN_NEW_USER, LOGOUT_INIT,
    LOGOUT_SUCCESSFUL, LOGOUT_FAILED, AUTH_INIT, AUTH_SUCCESS, AUTH_FAILED,
} from "../actions";
import { IAction } from "../types/ActionInterface";

const initialState: IState = {
    isLoading: false,
    gettingUser: false,
    editingUser: false,
    uid: null,
    displayName: null,
    token: "",
    error: "",
};

export const authReducer = ( state: IState = initialState, action: IAction ):IState => {
    switch( action.type ){
        case AUTH_INIT:
            return { ...state, isLoading: true };
        case AUTH_FAILED:
            return { ...state, isLoading: false };
        case AUTH_SUCCESS:
            
            return {
                ...state,
                isLoading: false,
                uid: action.payload.uid,
                displayName: action.payload.displayName
            };
        case SIGNIN_INIT:
            return { ...state, isLoading: true };
        case SIGNIN_NEW_USER:
            
            return {
                ...state,  uid: action.payload, isLoading: false,
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                uid: action.payload,
            };
        case SIGNIN_FAILED:
            return { ...state, error: action.payload };
        
        case LOGOUT_INIT:
            return { ...state, isLoading: true, error: "" };
        case LOGOUT_SUCCESSFUL:
            return {
                ...state,
                isLoading: false,
                uid: null,
                token: "",
                error: "",
            };
        case LOGOUT_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        
        default:
            return state;
    }
};

interface IState {
    isLoading: boolean,
    gettingUser: boolean,
    editingUser: boolean,
    uid: null | string,
    displayName: null | string,
    token: string,
    error: string,
}
