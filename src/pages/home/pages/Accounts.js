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

  render() {
    const { accounts, openForm, toggleOpenForm } = this.props;
    const { loading } = this.state;
    return (
      <SelectItemProvider>
        <Container marginTop noPadding>
          <HomeAppBar
            openForm={openForm}
            toggleOpenForm={toggleOpenForm}
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
)(withOpenFormState(SettingsAccounts));
