import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createHistory from "history/createHashHistory";
import { Route} from "react-router";
import { ConnectedRouter, routerReducer, routerMiddleware, push } from "react-router-redux"; 
import reducers from "./reducers";
import App from "./components/App";
import Help from "./components/Help";
import Login from "./components/Login";

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(middleware),
)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/help" component={Help} />
        <Route path="/login" component={Login} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
