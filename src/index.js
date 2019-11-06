import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './components/main'
import * as serviceWorker from './serviceWorker';
import Login from './components/login/login'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <Main />
                </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
