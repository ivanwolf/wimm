import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch, Route } from 'react-router-dom';
import { getCurrentUser, signOut } from '../utils/session';
import { getUserPlaces } from '../utils/maps';
import {
  getUserMethods, getUserLabels, getUserActivity, getUserBalance,
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
      methods: [],
      methodsLoading: true,
      labels: [],
      labelsLoading: true,
      activities: [],
      activitiesLoading: true,
      balance: 0,
      balanceLoading: true,
      selectedActivities: [],
    };
    this.toggleOpenMenu = this.toggleOpenMenu.bind(this);
    this.toggleOpenForm = this.toggleOpenForm.bind(this);
    this.getPlacesOptions = this.getPlacesOptions.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.handleSelectActivity = this.handleSelectActivity.bind(this);
    this.clearSelectedActivities = this.clearSelectedActivities.bind(this);
  }

  componentDidMount() {
    const user = getCurrentUser();
    getUserMethods(user).then((methods) => {
      this.setState({ methods, methodsLoading: false });
    });
    getUserLabels(user).then((labels) => {
      this.setState({ labels, labelsLoading: false });
    });
    getUserActivity(user).then((activities) => {
      this.setState({ activities, activitiesLoading: false });
    });
    getUserBalance(user).then((balance) => {
      this.setState({ balance, balanceLoading: false });
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
    console.log('Hola');
    this.setState(state => ({
      openMenu: !state.openMenu,
    }));
  }

  addActivity(activity) {
    const { activities, balance } = this.state;
    this.setState({
      activities: [activity, ...activities],
      balance: activity.method.id === 'cash' ? balance - activity.sum : balance,
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
      methods,
      methodsLoading,
      labels,
      labelsLoading,
      activities,
      activitiesLoading,
      balance,
      balanceLoading,
      selectedActivities,
    } = this.state;
    const isLoading = balanceLoading || activitiesLoading;
    return (
      <Page>
        <Drawer active={openForm}>
          <ActivityForm
            places={places}
            placesLoading={placesLoading}
            methods={methods}
            methodsLoading={methodsLoading}
            labels={labels}
            labelsLoading={labelsLoading}
            toggleOpenForm={this.toggleOpenForm}
            addActivity={this.addActivity}
            balance={balance}
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
                  methods={methods}
                  methodsLoading={methodsLoading}
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
                  balance={balance}
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
