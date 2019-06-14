import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";
import {History} from "history"

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history: History = createBrowserHistory();

function configureStore( preloadedState ){
    const store = createStore( createRootReducer( history ),
        preloadedState,
        composeEnhancers( applyMiddleware( routerMiddleware( history ),
            thunk
        ), ),
    );
    
    return store;
}

const initialState = {};
export default configureStore( initialState );