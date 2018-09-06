import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import Splash from './pages/Splash';
import './index.css';
import getFirebaseApp from './firebaseApp';

import registerServiceWorker from './registerServiceWorker';


registerServiceWorker();

const App = Loadable({
  loader: () => import('./App'),
  loading: Splash,
});

const renderApp = (user) => {
  ReactDOM.render(
    <BrowserRouter>
      <App user={user} />
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

const renderSplash = () => {
  ReactDOM.render(
    <Splash />,
    document.getElementById('root'),
  )
}

renderSplash();

getFirebaseApp().auth().onAuthStateChanged((user) => {
  if (user) {
    renderApp(user);
  } else {
    renderApp(null)
  }
});



