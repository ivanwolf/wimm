import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getCurrentUser, signOut } from '../utils/session';
import { getUserLocation, getNearbyPlaces } from '../utils/maps';
import { Page, Container } from '../components/Layout';
import RegisterForm from './home/RegisterForm';
import SideMenu from './home/Sidemenu';
import Drawer from '../components/Drawer';
import AppBar from '../components/AppBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: true,
      openForm: false,
      location: null,
      places: [],
    };
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.getUserLocationOptions = this.getUserLocationOptions.bind(this);
    this.shoudlFetchPlaces = this.shoudlFetchPlaces.bind(this);
  }

  onMenuClick() {
    this.setState(state => ({
      openMenu: !state.openMenu,
    }));
  }

  onAddClick() {
    const { openForm } = this.state;
    if (!openForm) {
      this.getUserLocationOptions();
      this.setState({ openForm: true });
    } else {
      this.setState({ openForm: false });
    }
  }

  getUserLocationOptions() {
    this.setState({ locationLoading: true });
    getUserLocation().then((position) => {
      if (this.shoudlFetchPlaces(position.coords)) {
        getNearbyPlaces(position.coords).then((places) => {
          this.setState({
            places,
            locationLoading: false,
            location: {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
          });
        });
      } else {
        this.setState({ locationLoading: false });
      }
    });
  }

  shoudlFetchPlaces(newPostion) {
    const { location } = this.state;
    if (location) {
      const { latitude, longitude } = location;
      return (newPostion.latitude - latitude) ** 2 + (newPostion.longitude - longitude) ** 2 > 0.01;
    }
    return true;
  }

  render() {
    const username = getCurrentUser().displayName;
    if (!username) {
      return <Redirect to="/username" />;
    }
    const { openForm, locationLoading, places, openMenu } = this.state;
    return (
      <Page>
        <AppBar
          openForm={openForm}
          onAddClick={this.onAddClick}
          onMenuClick={this.onMenuClick}
        />
        <Drawer active={openForm}>
          <RegisterForm
            locationLoading={locationLoading}
            getUserLocationOptions={this.getUserLocationOptions}
            places={places}
          />
        </Drawer>
        <SideMenu
          active={openMenu}
          onOverlayClick={this.onMenuClick}
          username={username}
          onSignOutClick={signOut}
        />
        <Container marginTop>
          Hola
        </Container>
      </Page>
    );
  }
}

export default Home;
