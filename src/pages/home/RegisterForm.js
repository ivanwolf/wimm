import React, { Component } from 'react';
import { Col } from '../../components/Layout';
import { TextInput, Button } from '../../components/Input';
import Dropdown from '../../components/Dropdown';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: '',
      method: '',
      label: '',
      sumError: '',
      detail: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSumChange = this.handleSumChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.hanldeDetailChange = this.hanldeDetailChange.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    console.log(this.state);
  }

  handleSumChange(ev) {
    this.setState({ sum: ev.target.value });
  }

  handleMethodChange(method) {
    this.setState({ method });
  }

  handleLabelChange(label) {
    this.setState({ label });
  }

  hanldeDetailChange(ev) {
    this.setState({ detail: ev.target.value });
  }

  render() {
    const {
      sum, sumError, method, label, detail,
    } = this.state;
    const options = [
      { id: 1, name: 'Crédito' },
      { id: 2, name: 'Efectivo' },
      { id: 3, name: 'Débito' },
      { id: 4, name: 'Agregar' },
      { id: 5, name: 'Agregar más' },
    ];
    return (
      <form onSubmit={this.handleSubmit}>
        <Col>
          <TextInput
            type="number"
            value={sum}
            onChange={this.handleSumChange}
            error={sumError}
            placeholder="Monto (CLP)"
          />
          <Dropdown
            options={options}
            value={method}
            onSelect={this.handleMethodChange}
            placeholder="Método de pago"
          />
          <Dropdown
            options={options}
            value={label}
            onSelect={this.handleLabelChange}
            placeholder="Etiqueta"
          />
          <TextInput
            type="text"
            value={detail}
            onChange={this.hanldeDetailChange}
            placeholder="Detalle"
          />
          <Button
            type="submit"
            disabled={!sum}
          >
            OK
          </Button>
        </Col>
      </form>
    );
  }
}

export default RegisterForm;
