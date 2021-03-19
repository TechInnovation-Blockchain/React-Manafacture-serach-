import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from "history"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Switch>
        <Route path="/:year" exact>
          <App />
        </Route>
        <Route path="/:year/:make" exact>
          <App />
        </Route>
        <Route path="/:year/:make/:model" exact>
          <App />
        </Route>
        <Route path="/:year/:make/:model/:engine" exact>
          <App />
        </Route>
        <Route path="/:year/:make/:model/:engine/:trans" exact>
          <App />
        </Route>
        <Route path="/:year/:make/:model/:engine/:trans/:product" exact>
          <App />
        </Route>
        <Route path="" exact>
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
