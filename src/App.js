import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from './utils/session';
import Home from './pages/Home';
import PromptName from './pages/PromptName';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/username" component={PromptName} />
  </Switch>
);


export default App;
