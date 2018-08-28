import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { signOut } from '../utils/session';
import { Page } from '../components/Layout';
import SideMenu from './home/Sidemenu';
import withLocation from '../hocs/LocationState';
import { connect } from '../components/utils/Provider';
import AddFounds from './home/pages/AddFounds';
import Transfer from './home/pages/Transfer';
import Accounts from './home/pages/Accounts';
import Activities from './home/pages/Activities';

class Home extends Component {
  componentDidMount() {
    const { fetchAccounts, fetchActivities, fetchCategories } = this.props;
    fetchAccounts();
    fetchActivities();
    fetchCategories();
  }

  render() {
    return (
      <Page>
        <SideMenu onSignOutClick={signOut} />
        <Switch>
          <Route path="/home/accounts" component={Accounts} />
          <Route path="/home/add_founds" component={AddFounds} />
          <Route path="/home/transfer" component={Transfer} />
          <Route path="/home" component={Activities} />
        </Switch>
      </Page>
    );
  }
}


Home.propTypes = {
  fetchActivities: PropTypes.func.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

export default connect()(
  'fetchActivities',
  'fetchAccounts',
  'fetchCategories',
)(withLocation(Home));
