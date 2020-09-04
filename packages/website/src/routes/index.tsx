import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from '../modules/Register';

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/register" render={() => <Register />} />
    </Switch>
  </Router>
)

