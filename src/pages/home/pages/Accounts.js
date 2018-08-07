import React, { Component } from 'react';
import { WhiteCard } from '../../../components/Card';
import { Container } from '../../../components/Layout';
import AccountList from './accounts/AccountList';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: null,
    };
  }

  render() {
    const { accounts } = this.props;
    return (
      <Container marginTop>
        <AccountList accounts={accounts} />
      </Container>
    );
  }
}


export default Settings;
