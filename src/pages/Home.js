import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { signOut } from '../utils/session';
import { Page } from '../components/Layout';
import SideMenu from './home/Sidemenu';
import withUser from '../hocs/userContext';
import AddFounds from './home/pages/AddFounds';
import Transfer from './home/pages/Transfer';
import Accounts from './home/pages/Accounts';
import Activities from './home/pages/Activities';
import FirestoreProvider from '../components/utils/Provider';
import OpenMenuProvider from '../components/utils/OpenMenu';
import Splash from './Splash';

const Home = ({ user }) => {
  if (user === null) {
    return <Splash />;
  }
  return (
    <FirestoreProvider>
      <OpenMenuProvider>
        <Page>
          <SideMenu onSignOutClick={signOut} />
          <Switch>
            <Route path="/home/accounts" component={Accounts} />
            <Route path="/home/add_founds" component={AddFounds} />
            <Route path="/home/transfer" component={Transfer} />
            <Route path="/home" component={Activities} />
          </Switch>
        </Page>
      </OpenMenuProvider>
    </FirestoreProvider>
  );
}

Home.defaultProps = {
  user: null,
};

Home.propTypes = {
  user: PropTypes.object,
};

export default withUser(Home);
