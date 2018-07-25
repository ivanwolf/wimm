import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../components/Layout';
import { TextInput, Button } from '../../components/Input';
import { Dropdown, LocationDropdown } from '../../components/Dropdown';

class ActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: '',
      method: '',
      label: '',
      sumError: '',
      detail: '',
      placeId: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSumChange = this.handleSumChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.hanldeDetailChange = this.hanldeDetailChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
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

  handlePlaceChange(placeId) {
    this.setState({ placeId });
  }

  render() {
    const {
      sum, sumError, method, label, detail, placeId,
    } = this.state;
    const { locationLoading, getUserLocationOptions, places } = this.props;
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
          <LocationDropdown
            options={places}
            value={placeId}
            onSelect={this.handlePlaceChange}
            getOptions={getUserLocationOptions}
            locationLoading={locationLoading}
            placeholder="Lugar"
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

ActivityForm.propTypes = {
  locationLoading: PropTypes.bool.isRequired,
  getUserLocationOptions: PropTypes.func.isRequired,
};

export default ActivityForm;
