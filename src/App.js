import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import PromptName from './pages/PromptName';
import InitialSetup from './pages/InitialSetup';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/username" component={PromptName} />
    <Route path="/setup" component={InitialSetup} />
  </Switch>
);


export default App;
