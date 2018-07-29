import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../components/Layout';
import { TextInput, Button } from '../../components/Input';
import { Dropdown, LocationDropdown } from '../../components/Dropdown';
import { getCurrentUser } from '../../utils/session';
import {
  createActivity, createPlace, updateBalance,
} from '../../utils/firestore';

class ActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: '',
      methodId: '',
      labelId: '',
      detail: '',
      placeId: '',
      sumError: '',
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSumChange = this.handleSumChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.hanldeDetailChange = this.hanldeDetailChange.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
  }

  async handleSubmit(ev) {
    ev.preventDefault();
    await this.setState({ loading: true });
    try {
      const {
        sum, placeId, methodId, labelId, detail,
      } = this.state;
      const {
        places, methods, labels, toggleOpenForm, addActivity, balance,
      } = this.props;
      const createdAt = Date.now();
      const place = places.find(pl => pl.id === placeId);
      const method = methods.find(me => me.id === methodId);
      const label = labels.find(la => la.id === labelId);
      const user = getCurrentUser();
      const activity = {
        createdAt,
        sum: parseInt(sum, 10),
        method,
        label,
        detail,
        place,
      };
      await createActivity(user, activity);
      // Add activity to local state;
      addActivity(activity);
      // update firestore
      await createPlace(user, {
        id: placeId,
        name: place.name,
        address: place.address,
      });
      if (methodId === 'cash') {
        await updateBalance(user, balance - activity.sum);
      }
      // await updateLabel(user, labelId, today);
      // await updatePlace(user, placeId, today);
      // Clear state
      await this.setState({
        loading: false,
        sum: '',
        methodId: '',
        labelId: '',
        detail: '',
        placeId: '',
        sumError: '',
      });
      // Close form
      toggleOpenForm();
    } catch (err) {
      console.log(err);
    }
  }

  handleSumChange(ev) {
    this.setState({ sum: ev.target.value });
  }

  handleMethodChange(methodId) {
    this.setState({ methodId });
  }

  handleLabelChange(labelId) {
    this.setState({ labelId });
  }

  hanldeDetailChange(ev) {
    this.setState({ detail: ev.target.value });
  }

  handlePlaceChange(placeId) {
    this.setState({ placeId });
  }

  render() {
    const {
      sum, sumError, methodId, labelId, detail, placeId, loading,
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
            value={methodId}
            onSelect={this.handleMethodChange}
            placeholder="Método de pago"
            loading={methodsLoading}
          />
          <Dropdown
            options={labels}
            value={labelId}
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
            disabled={!sum || loading}
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
  toggleOpenForm: PropTypes.func.isRequired,
};

export default ActivityForm;
