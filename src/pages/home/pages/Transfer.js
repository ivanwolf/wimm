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

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: '',
      fromId: '',
      toId: '',
      sumError: '',
      detail: '',
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSumChange = this.handleSumChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.hanldeDetailChange = this.hanldeDetailChange.bind(this);
  }

  handleSumChange(ev) {
    this.setState({ sum: ev.target.value });
  }

  hanldeDetailChange(ev) {
    this.setState({ detail: ev.target.value });
  }

  handleFromChange(fromId) {
    const { toId } = this.state;
    this.setState({
      fromId,
      toId: fromId === toId ? '' : toId,
    });
  }

  handleToChange(toId) {
    this.setState({ toId });
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    const {
      accounts,
      updateAccounts,
      createActivity,
      history,
    } = this.props;
    await this.setState({ loading: true });
    try {
      const {
        sum, fromId, toId, detail,
      } = this.state;

      const fromAccount = accounts.find(acc => acc.id === fromId);
      const toAccount = accounts.find(acc => acc.id === toId);

      const activity = {
        createdAt: Date.now(),
        sum: parseInt(sum, 10),
        type: 'transfer',
        from: {
          id: fromId,
          name: fromAccount.name,
        },
        to: {
          id: toId,
          name: toAccount.name,
        },
        detail,
      };

      const fromData = {
        id: fromId,
        activityCount: fromAccount.activityCount + 1,
        balance: fromAccount.balance - activity.sum,
      };

      const toData = {
        id: toId,
        activityCount: toAccount.activityCount + 1,
        balance: toAccount.balance + activity.sum,
      };

      await createActivity(activity);
      await updateAccounts([fromData, toData]);
      history.push('/home');
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      sum, sumError, fromId, toId, loading, detail,
    } = this.state;
    const { accounts, accountsLoading } = this.props;
    return (
      <Fragment>
        <AppBar title="Transferir" />
        <Container marginTop>
          <WhiteCard>
            En esta sección transfiere dinero entre cuentas, por ejemplo, cuando haces un giro en un cajero automático o un depósito en tu cuenta corriente
          </WhiteCard>
          <Form onSubmit={this.handleSubmit}>
            <Dropdown
              options={accounts}
              value={fromId}
              onSelect={this.handleFromChange}
              placeholder="Origen"
              loading={accountsLoading}
            />
            <Dropdown
              options={accounts.filter(acc => acc.id !== fromId)}
              value={toId}
              onSelect={this.handleToChange}
              placeholder="Destino"
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
)(Transfer);
