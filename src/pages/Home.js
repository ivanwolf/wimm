import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { getCurrentUser, signOut } from '../utils/session';
import { getUserPlaces } from '../utils/maps';
import { accountsToUpdate, categoriesToUpdate } from '../utils/lambda';
import { Page } from '../components/Layout';
import ActivityForm from './home/ActivityForm';
import SideMenu from './home/Sidemenu';
import Drawer from '../components/Drawer';
import { HomeAppBar, AppBar } from '../components/AppBar';
import withLocation from '../hocs/LocationState';
import withUser from '../hocs/userContext';
import { connect } from '../components/utils/Provider';
import Activity from './home/pages/Activity';
import AddFounds from './home/pages/AddFounds';
import Transfer from './home/pages/Transfer';
import Accounts from './home/pages/Accounts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      openForm: false,
      places: [],
      placesLoading: false,
      selectedActivities: [],
    };
    this.toggleOpenMenu = this.toggleOpenMenu.bind(this);
    this.toggleOpenForm = this.toggleOpenForm.bind(this);
    this.getPlacesOptions = this.getPlacesOptions.bind(this);
    this.handleSelectActivity = this.handleSelectActivity.bind(this);
    this.clearSelectedActivities = this.clearSelectedActivities.bind(this);
    this.handleDeleteActivities = this.handleDeleteActivities.bind(this);
  }

  componentDidMount() {
    const { fetchAccounts, fetchActivities, fetchCategories } = this.props;
    fetchAccounts();
    fetchActivities();
    fetchCategories();
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

  async handleDeleteActivities() {
    const { selectedActivities } = this.state;
    const {
      activities,
      accounts,
      categories,
      deleteActivities,
      updateAccounts,
      updateCategories,
    } = this.props;
    const activitiesToDelete = activities.filter(act => selectedActivities.includes(act.id));
    const updatedAccountsData = accountsToUpdate(activitiesToDelete, accounts);
    const updatedCategoriesData = categoriesToUpdate(activitiesToDelete, categories);
    try {
      await deleteActivities(selectedActivities);
      await updateAccounts(updatedAccountsData);
      await updateCategories(updatedCategoriesData);
      this.clearSelectedActivities();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      openForm,
      openMenu,
      placesLoading,
      places,
      selectedActivities,
    } = this.state;
    const { user } = this.props;
    return (
      <Page>
        <SideMenu
          active={openMenu}
          onOverlayClick={this.toggleOpenMenu}
          username={user.displayName}
          onSignOutClick={signOut}
        />
        <Switch>
          <Route
            path="/home/accounts"
            component={Accounts}
          />
          <Route
            path="/home/add_founds"
            render={({ history }) => (
              <Fragment>
                <AppBar title="Añadir fondos" />
                <AddFounds history={history} />
              </Fragment>
            )}
          />
          <Route
            path="/home/transfer"
            render={({ history }) => (
              <Fragment>
                <AppBar title="Transferir entre cuentas" />
                <Transfer history={history} />
              </Fragment>
            )}
          />
          <Route
            path="/home"
            render={() => (
              <Fragment>
                <Drawer active={openForm}>
                  <ActivityForm
                    places={places}
                    placesLoading={placesLoading}
                    toggleOpenForm={this.toggleOpenForm}
                  />
                </Drawer>
                <HomeAppBar
                  openForm={openForm}
                  selectedActivitiesCount={selectedActivities.length}
                  toggleOpenForm={this.toggleOpenForm}
                  toggleOpenMenu={this.toggleOpenMenu}
                  clearSelectedActivities={this.clearSelectedActivities}
                  handleDeleteActivities={this.handleDeleteActivities}
                />
                <Activity
                  handleSelectActivity={this.handleSelectActivity}
                  selectedActivities={selectedActivities}
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
  deleteActivities: PropTypes.func.isRequired,
  fetchActivities: PropTypes.func.isRequired,
  fetchAccounts: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

export default connect(
  'activities',
  'accounts',
  'categories',
)(
  'fetchActivities',
  'fetchAccounts',
  'fetchCategories',
  'deleteActivities',
  'updateAccounts',
  'updateCategories',
)(withUser(withLocation(Home)));
