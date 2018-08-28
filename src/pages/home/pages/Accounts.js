import React, { Component } from 'react';
import { Container } from '../../../components/Layout';
import Drawer from '../../../components/Drawer';
import AccountList from './accounts/AccountList';
import Form from './accounts/NewAccountForm';
import { HomeAppBar } from '../../../components/AppBar';
import { connect } from '../../../components/utils/Provider';
import SelectItemProvider from '../../../components/utils/SelectItem';
import withOpenFormState from '../../../hocs/OpenFormState';

class SettingsAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleAccountToggle = this.handleAccountToggle.bind(this);
    this.handleNewAccount = this.handleNewAccount.bind(this);
    this.handleDeleteAccounts = this.handleDeleteAccounts.bind(this);
  }

  async handleNewAccount(name, balance) {
    const { createAccount, toggleOpenForm } = this.props;
    await this.setState({ loading: true });
    const account = {
      name,
      balance,
      active: true,
      activityCount: 0,
      createdAt: Date.now(),
    };
    await createAccount(account);
    await this.setState({ loading: false });
    await toggleOpenForm();
  }

  async handleDeleteAccounts(selectedAccounts) {
    const { deleteAccounts } = this.props;
    try {
      await deleteAccounts(selectedAccounts);
    } catch (err) {
      console.log(err);
    }
  }

  async handleAccountToggle(accountId, active) {
    const { updateAccounts } = this.props;
    await updateAccounts([{
      id: accountId,
      active: !active,
    }]);
  }

  render() {
    const { accounts, openForm, toggleOpenForm } = this.props;
    const { loading } = this.state;
    return (
      <SelectItemProvider>
        <Container marginTop noPadding>
          <HomeAppBar
            title="Cuentas"
            formTitle="Agrega una cuenta"
            openForm={openForm}
            toggleOpenForm={toggleOpenForm}
            handleDeleteItems={this.handleDeleteAccounts}
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
  'deleteAccounts',
)(withOpenFormState(SettingsAccounts));
