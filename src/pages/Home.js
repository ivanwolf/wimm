import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch, Route } from 'react-router-dom';
import { getCurrentUser, signOut } from '../utils/session';
import { getUserPlaces } from '../utils/maps';
import {
  getAccounts, getActivities, getCategories,
} from '../utils/firestore';
import { Page } from '../components/Layout';
import ActivityForm from './home/ActivityForm';
import SideMenu from './home/Sidemenu';
import Drawer from '../components/Drawer';
import { HomeAppBar, AppBar } from '../components/AppBar';
import withLocation from '../hocs/LocationState';
import Activity from './home/pages/Activity';
import AddFounds from './home/pages/AddFounds';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      openForm: false,
      places: [],
      placesLoading: false,
      accounts: [],
      accountsLoading: true,
      categories: [],
      categoriesLoading: true,
      activities: [],
      activitiesLoading: true,
      selectedActivities: [],
    };
    this.toggleOpenMenu = this.toggleOpenMenu.bind(this);
    this.toggleOpenForm = this.toggleOpenForm.bind(this);
    this.getPlacesOptions = this.getPlacesOptions.bind(this);
    this.updateUI = this.updateUI.bind(this);
    this.handleSelectActivity = this.handleSelectActivity.bind(this);
    this.clearSelectedActivities = this.clearSelectedActivities.bind(this);
  }

  componentDidMount() {
    const user = getCurrentUser();
    getAccounts(user).then((accounts) => {
      this.setState({ accounts, accountsLoading: false });
    });
    getCategories(user).then((categories) => {
      this.setState({ categories, categoriesLoading: false });
    });
    getActivities(user).then((activities) => {
      this.setState({ activities, activitiesLoading: false });
    });
  }

  getPlacesOptions() {
    const { location, handleLocationChange } = this.props;
    const { places } = this.state;
    this.setState({ placesLoading: true });
    getUserPlaces(location, places)
      .then((res) => {
        handleLocationChange(res.location);
        this.setState({
          places: res.places,
          placesLoading: false,
        });
      })
      .catch(() => {
        this.setState({ placesLoading: false });
      });
  }

  toggleOpenForm() {
    const { openForm } = this.state;
    if (!openForm) {
      this.getPlacesOptions();
      this.setState({ openForm: true });
    } else {
      this.setState({ openForm: false });
    }
  }

  toggleOpenMenu() {
    this.setState(state => ({
      openMenu: !state.openMenu,
    }));
  }

  updateUI(activity, accountId, accountBalance) {
    const { activities, accounts } = this.state;
    this.setState({
      activities: [activity, ...activities],
      accounts: accounts.map((acc) => {
        if (acc.id === accountId) {
          return Object.assign(acc, { balance: accountBalance });
        }
        return acc;
      }),
      openForm: false,
    });
  }

  clearSelectedActivities() {
    this.setState({ selectedActivities: [] });
  }

  handleSelectActivity(id) {
    const { selectedActivities } = this.state;
    if (selectedActivities.includes(id)) {
      this.setState({
        selectedActivities: selectedActivities.filter(actId => actId !== id),
      });
    } else {
      this.setState({
        selectedActivities: [id, ...selectedActivities],
      });
    }
  }

  render() {
    const username = getCurrentUser().displayName;
    if (!username) {
      return <Redirect to="/username" />;
    }
    const {
      openForm,
      openMenu,
      placesLoading,
      places,
      accounts,
      accountsLoading,
      categories,
      categoriesLoading,
      activities,
      activitiesLoading,
      selectedActivities,
    } = this.state;
    const isLoading = accountsLoading || activitiesLoading;
    return (
      <Page>
        <Drawer active={openForm}>
          <ActivityForm
            places={places}
            placesLoading={placesLoading}
            accounts={accounts}
            accountsLoading={accountsLoading}
            categories={categories}
            categoriesLoading={categoriesLoading}
            toggleOpenForm={this.toggleOpenForm}
            updateUI={this.updateUI}
          />
        </Drawer>
        <SideMenu
          active={openMenu}
          onOverlayClick={this.toggleOpenMenu}
          username={username}
          onSignOutClick={signOut}
        />
        <Switch>
          <Route
            path="/add_founds"
            render={() => (
              <Fragment>
                <AppBar title="Añadir fondos" />
                <AddFounds
                  accounts={accounts}
                  accountsLoading={accountsLoading}
                />
              </Fragment>
            )}
          />
          <Route
            path="/"
            render={() => (
              <Fragment>
                <HomeAppBar
                  openForm={openForm}
                  selectedActivitiesCount={selectedActivities.length}
                  toggleOpenForm={this.toggleOpenForm}
                  toggleOpenMenu={this.toggleOpenMenu}
                  clearSelectedActivities={this.clearSelectedActivities}
                />
                <Activity
                  handleSelectActivity={this.handleSelectActivity}
                  selectedActivities={selectedActivities}
                  activities={activities}
                  accounts={accounts}
                  loading={isLoading}
                />
              </Fragment>
            )}
          />
        </Switch>
      </Page>
    );
  }
}

Home.defaultProps = {
  location: null,
};

Home.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  handleLocationChange: PropTypes.func.isRequired,
};

export default withLocation(Home);
