import React, { Component } from 'react';
import { Container } from '../../../components/Layout';
import Drawer from '../../../components/Drawer';
import AccountList from './accounts/AccountList';
import Form from './accounts/NewAccountForm';
import { SettingsAppBar } from '../../../components/AppBar';
import { connect } from '../../../components/utils/Provider';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAccount: null,
      openForm: false,
      loading: false,
    };
    this.handleAccountToggle = this.handleAccountToggle.bind(this);
    this.handleNewAccount = this.handleNewAccount.bind(this);
    this.toggleOpenForm = this.toggleOpenForm.bind(this);
  }

  async handleNewAccount(name, balance) {
    const { createAccount } = this.props;
    await this.setState({ loading: true });
    const account = {
      name,
      balance,
      active: true,
      activityCount: 0,
    };
    await createAccount(account);
    await this.setState({ loading: false, openForm: false });
  }

  async handleAccountToggle(accountId, active) {
    const { updateAccounts } = this.props;
    await updateAccounts([{
      id: accountId,
      active: !active,
    }]);
  }

  toggleOpenForm() {
    const { openForm } = this.state;
    this.setState({ openForm: !openForm });
  }

  render() {
    const { accounts } = this.props;
    const { openForm, loading } = this.state;
    return (
      <Container marginTop>
        <SettingsAppBar
          openForm={openForm}
          toggleOpenForm={this.toggleOpenForm}
          title="Configuración"
        />
        <Drawer active={openForm}>
          <Form
            handleSubmit={this.handleNewAccount}
            loading={loading}
          />
        </Drawer>
        <AccountList
          accounts={accounts}
          handleAccountToggle={this.handleAccountToggle}
        />
      </Container>
    );
  }
}


export default connect(
  'accounts',
)(
  'createAccount',
  'updateAccounts',
)(Settings);
