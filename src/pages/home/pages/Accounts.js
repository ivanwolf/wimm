import React, { Component, Fragment } from 'react';
import { Container } from '../../../components/Layout';
import Drawer from '../../../components/Drawer';
import AccountList from './accounts/AccountList';
import Form from './accounts/NewAccountForm';
import { updateAccount, createAccount } from '../../../utils/firestore';
import { SettingsAppBar } from '../../../components/AppBar';

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
    const { user, addAccountToState } = this.props;
    await this.setState({ loading: true });
    const account = await createAccount(user, {
      name,
      balance,
      active: true,
      activityCount: 0,
    });
    await addAccountToState(account);
    await this.setState({ loading: false, openForm: false });
  }

  handleAccountToggle(accountId, active) {
    const { user, updateUI } = this.props;
    updateAccount(user, accountId, {
      active: !active,
    }).then(() => {
      updateUI(null, [{
        id: accountId,
        active: !active,
      }]);
    });
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


export default Settings;
