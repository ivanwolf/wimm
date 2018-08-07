import React, { Component } from 'react';
import { Page } from '../components/Layout';
import { Spinner } from '../components/spinner/Spinner';
import { Text } from '../components/Typography';
import { createInitialDocument } from '../utils/firestore';
import withUser from '../hocs/userContext';

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    const { user, history } = this.props;
    createInitialDocument(user).then(() => {
      history.replace('/home');
    }).catch((error) => {
      this.setState({ error: error.code });
    });
  }

  render() {
    const { error } = this.state;
    if (error) return <div>Error</div>;
    return (
      <Page centerContent column>
        <Text>
          Estamos configurando tu cuenta
        </Text>
        <Spinner />
      </Page>
    );
  }
}

export default withUser(Setup);
