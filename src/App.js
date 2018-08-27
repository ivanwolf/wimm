import React, { Component } from 'react';
import firebase from 'firebase';
import { Switch, Route, withRouter } from 'react-router-dom';
import { getUserDoc } from './utils/firestore';
import Home from './pages/Home';
import Splash from './pages/Splash';
import Setup from './pages/Setup';
import Login from './pages/Login';
import { UserProvider } from './hocs/userContext';
import FirestoreProvider from './components/utils/Provider';
import OpenMenuProvider from './components/utils/OpenMenu';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.state;
    const { history } = this.props;
    if (prevState.user !== user) {
      if (user) {
        getUserDoc(user).get().then((doc) => {
          if (doc.exists) {
            history.replace('/home');
          } else {
            history.replace('/setup');
          }
        });
      } else {
        history.replace('/login');
      }
    }
  }

  render() {
    const { user } = this.state;
    if (!user) return <Splash />;
    return (
      <UserProvider value={user}>
        <FirestoreProvider user={user}>
          <OpenMenuProvider>
            <Switch>
              <Route path="/setup" component={Setup} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/" component={Splash} />
            </Switch>
          </OpenMenuProvider>
        </FirestoreProvider>
      </UserProvider>
    );
  }
}


export default withRouter(App);
