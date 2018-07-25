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
    const {
      places,
      placesLoading,
      methods,
      methodsLoading,
      labels,
      labelsLoading,
    } = this.props;
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
            placeholder="Lugar"
            loading={placesLoading}
          />
          <Dropdown
            options={methods}
            value={method}
            onSelect={this.handleMethodChange}
            placeholder="Método de pago"
            loading={methodsLoading}
          />
          <Dropdown
            options={labels}
            value={label}
            onSelect={this.handleLabelChange}
            placeholder="Etiqueta"
            loading={labelsLoading}
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
            disabled={!sum}
          >
            OK
          </Button>
        </Col>
      </form>
    );
  }
}

const optionsTypes = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}));

ActivityForm.propTypes = {
  places: optionsTypes.isRequired,
  methods: optionsTypes.isRequired,
  labels: optionsTypes.isRequired,
  placesLoading: PropTypes.bool.isRequired,
  methodsLoading: PropTypes.bool.isRequired,
  labelsLoading: PropTypes.bool.isRequired,
};

export default ActivityForm;
