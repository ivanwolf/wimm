import React, { Component } from 'react';
import { TextInput, Button } from '../../../../components/Input';
import { Col } from '../../../../components/Layout';

class NewAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      balance: '',
    };
    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.handleNamechange = this.handleNamechange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleBalanceChange(ev) {
    this.setState({ balance: ev.target.value });
  }

  handleNamechange(ev) {
    this.setState({ name: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { name, balance } = this.state;
    const accountBalance = balance ? parseInt(balance, 10) : 0;
    this.props.handleSubmit(name, accountBalance);
  }

  render() {
    const { loading } = this.props;
    const { name, balance } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Col>
          <TextInput
            type="text"
            value={name}
            onChange={this.handleNamechange}
            error=""
            placeholder="Nombre"
          />
          <TextInput
            type="number"
            value={balance}
            onChange={this.handleBalanceChange}
            placeholder="Monto inicial (opcional)"
            error=""
          />
          <Button
            type="submit"
            disabled={loading}
          >
            OK
          </Button>
        </Col>
      </form>
    );
  }
}

export default NewAccountForm;
