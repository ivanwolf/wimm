import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getCurrentUser, signOut } from '../utils/session';
import { Page, Container } from '../components/Layout';
import AppBar from '../components/AppBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      openForm: false,
    };
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  onMenuClick() {
    this.setState(state => ({
      openMenu: !state.openMenu,
    }));
  }

  onAddClick() {
    this.setState(state => ({
      openForm: !state.openForm,
    }));
  }

  render() {
    if (!getCurrentUser().displayName) {
      return <Redirect to="/username" />;
    }
    const { openForm } = this.state;
    return (
      <Page>
        <AppBar openForm={openForm} onAddClick={this.onAddClick} />
        <Container marginTop>
          <button type="button" onClick={signOut}>
            Adiós
          </button>
        </Container>
      </Page>
    );
  }
}

export default Home;
