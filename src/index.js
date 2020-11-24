import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./Pages/Home";
import Juego from "./Pages/juego";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router >
            <Switch >                            
                <Route path="/juego" >
                    <Juego />
                </Route>               
                <Route path="/" >
                    <Home />
                </Route>
            </Switch>
        </Router>
  </React.StrictMode>,
  document.getElementById('root')
);