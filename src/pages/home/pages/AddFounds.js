import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Container } from '../../../components/Layout';
import { TextInput, Button } from '../../../components/Input';
import { Dropdown } from '../../../components/Dropdown';
import { WhiteCard } from '../../../components/Card';
import { connect } from '../../../components/utils/Provider';
import { AppBar } from '../../../components/AppBar';


const Form = styled.form`
  margin: 7px 0;
  display: flex;
  flex-direction: column;
`;

class AddFounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: '',
      accountId: '',
      sumError: '',
      detail: '',
      loading: false,
    };
    this.handleSumChange = this.handleSumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.hanldeDetailChange = this.hanldeDetailChange.bind(this);
  }

  handleSumChange(ev) {
    this.setState({ sum: ev.target.value });
  }

  hanldeDetailChange(ev) {
    this.setState({ detail: ev.target.value });
  }

  handleMethodChange(accountId) {
    this.setState({ accountId });
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    const {
      accounts,
      history,
      createActivity,
      updateAccounts,
    } = this.props;
    await this.setState({ loading: true });
    try {
      const { sum, accountId, detail } = this.state;
      const account = accounts.find(me => me.id === accountId);
      const activity = {
        createdAt: Date.now(),
        sum: parseInt(sum, 10),
        type: 'income',
        account: {
          id: accountId,
          name: account.name,
        },
        detail,
      };

      const accountData = {
        id: accountId,
        activityCount: account.activityCount + 1,
        balance: account.balance + activity.sum,
      };

      await createActivity(activity);
      await updateAccounts([accountData]);
      history.push('/home');
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      sum, sumError, accountId, loading, detail,
    } = this.state;
    const { accounts, accountsLoading } = this.props;
    return (
      <Fragment>
        <AppBar title="Añadir fondos" />
        <Container marginTop>
          <WhiteCard>
            En esta sección regitras los ingresos a tus cuentas, por ejemplo, cuando recibes tu sueldo o un amigo te paga una deuda.
          </WhiteCard>
          <Form onSubmit={this.handleSubmit}>
            <Dropdown
              options={accounts}
              value={accountId}
              onSelect={this.handleMethodChange}
              placeholder="Cuenta"
              loading={accountsLoading}
            />
            <TextInput
              type="number"
              value={sum}
              onChange={this.handleSumChange}
              error={sumError}
              placeholder="Monto (CLP)"
            />
            <TextInput
              type="text"
              value={detail}
              onChange={this.hanldeDetailChange}
              placeholder="Detalle"
              error=""
            />
            <Button
              type="submit"
              disabled={!sum || loading}
            >
              OK
            </Button>
          </Form>
        </Container>
      </Fragment>
    );
  }
}

export default connect(
  'accounts',
)(
  'createActivity',
  'updateAccounts',
)(AddFounds);
