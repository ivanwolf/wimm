import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getCurrentUser, signOut } from '../utils/session';
import { getUserPlaces } from '../utils/maps';
import { getUserMethods, getUserLabels, getUserActivity } from '../utils/firestore';
import { Page, Container } from '../components/Layout';
import ActivityForm from './home/ActivityForm';
import ActivityList from './home/ActivityList';
import SideMenu from './home/Sidemenu';
import Drawer from '../components/Drawer';
import AppBar from '../components/AppBar';
import Alert from '../components/Alert';
import withLocation from '../hocs/LocationState';

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
    };
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.getPlacesOptions = this.getPlacesOptions.bind(this);
    this.addActivity = this.addActivity.bind(this);
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
  }

  onMenuClick() {
    this.setState(state => ({
      openMenu: !state.openMenu,
    }));
  }

  onAddClick() {
    const { openForm } = this.state;
    if (!openForm) {
      this.getPlacesOptions();
      this.setState({ openForm: true });
    } else {
      this.setState({ openForm: false });
    }
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

  addActivity(activity) {
    const { activities } = this.state;
    this.setState({
      activities: [activity, ...activities],
    });
  }


  render() {
    const username = getCurrentUser().displayName;
    if (!username) {
      return <Redirect to="/username" />;
    }
    const {
      openForm,
      placesLoading,
      places,
      openMenu,
      methods,
      methodsLoading,
      labels,
      labelsLoading,
      activities,
      activitiesLoading,
    } = this.state;
    return (
      <Page>
        <AppBar
          openForm={openForm}
          onAddClick={this.onAddClick}
          onMenuClick={this.onMenuClick}
        />
        <Drawer active={openForm}>
          <ActivityForm
            places={places}
            placesLoading={placesLoading}
            methods={methods}
            methodsLoading={methodsLoading}
            labels={labels}
            labelsLoading={labelsLoading}
            onAddClick={this.onAddClick}
            addActivity={this.addActivity}
          />
        </Drawer>
        <SideMenu
          active={openMenu}
          onOverlayClick={this.onMenuClick}
          username={username}
          onSignOutClick={signOut}
        />
        <Container marginTop>
          <ActivityList activities={activities} loading={activitiesLoading} />
        </Container>
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
