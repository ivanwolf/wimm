import React, { Component } from 'react';
import { Page, Container } from '../components/Layout';
import { Spinner } from '../components/spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { Text } from '../components/Typography';
import { getCurrentUser } from '../utils/session';
import { createInitialDocument } from '../utils/firestore';

class InitialSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      ready: false,
    };
  }

  componentDidMount() {
    const user = getCurrentUser();
    createInitialDocument(user).then(() => {
      this.setState({ ready: true });
    }).catch((error) => {
      console.log(error);
      this.setState({ error: error.code });
    });
  }

  render() {
    const { ready } = this.state;
    if (ready) return <Redirect to="/" />;
    return (
      <Page centerContent column marginBottom>
        <Text>
          Estamos configurando tu cuenta
        </Text>
        <Spinner />
      </Page>
    );
  }
}

export default InitialSetup;
