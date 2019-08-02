import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createRootReducer from "./reducers";
import { History } from "history"


const composeEnhancers = compose;

export const history: History = createBrowserHistory();

function configureStore( preloadedState ) {
  return createStore( createRootReducer( history ),
    preloadedState,
    composeEnhancers( applyMiddleware( routerMiddleware( history ),
      thunk
    ), ),
  );
}

const initialState = {};
export default configureStore( initialState );