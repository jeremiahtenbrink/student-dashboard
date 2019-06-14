import {
    SUBSCRIBE, UNSUBSCRIBE
} from "../actions/index";
import { IAction } from "../types/ActionInterface";

interface IState {
    subscriptions: {[name: string]: Function}
}

const initialState: IState = {
    subscriptions: {}
};

export const subscriptionReducer = ( state: IState = initialState, action: IAction ): IState => {
    
    switch( action.type ){
        case SUBSCRIBE:
            
            if( state.subscriptions[ action.payload.name ] ){
                const unsubscribe = state.subscriptions[ action.payload.name ];
                unsubscribe();
            }
            state.subscriptions[ action.payload.name ] = action.payload.subscription;
            return { subscriptions: { ...state.subscriptions } };
        case UNSUBSCRIBE:
            
            const unSubScribe = state.subscriptions[ action.payload ];
            if( unSubScribe ){
                unSubScribe();
            }
            delete state.subscriptions[ action.payload ];
            return {
                subscriptions: { ...state.subscriptions },
            };
        default:
            return { ...state };
    }
    
};
