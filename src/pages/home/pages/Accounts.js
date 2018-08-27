import React, { Component } from 'react';
import { Container } from '../../../components/Layout';
import Drawer from '../../../components/Drawer';
import AccountList from './accounts/AccountList';
import Form from './accounts/NewAccountForm';
import { HomeAppBar } from '../../../components/AppBar';
import { connect } from '../../../components/utils/Provider';
import SelectItemProvider from '../../../components/utils/SelectItem';

class SettingsAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openForm: false,
      loading: false,
      selectedAccounts: [],
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
      <SelectItemProvider>
        <Container marginTop noPadding>
          <HomeAppBar
            openForm={openForm}
            toggleOpenForm={this.toggleOpenForm}
            title="Cuentas"
            formTitle="Agrega una cuenta"
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
      </SelectItemProvider>
    );
  }
}


export default connect(
  'accounts',
)(
  'createAccount',
  'updateAccounts',
)(SettingsAccounts);
