import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../components/Layout';
import { TextInput, Button } from '../../components/Input';
import { Dropdown, LocationDropdown } from '../../components/Dropdown';
import { getCurrentUser } from '../../utils/session';
import {
  createActivity, createPlace, updateAccount, updateCategory,
} from '../../utils/firestore';

class ActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: '',
      accountId: '',
      categoryId: '',
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
        sum, placeId, accountId, categoryId, detail,
      } = this.state;
      const {
        places, accounts, categories, toggleOpenForm, updateUI,
      } = this.props;

      const place = places.find(pl => pl.id === placeId);
      const account = accounts.find(me => me.id === accountId);
      const category = categories.find(la => la.id === categoryId);

      const activity = {
        createdAt: Date.now(),
        sum: parseInt(sum, 10),
        type: 'expense',
        account: {
          id: accountId,
          name: account.name,
        },
        category: {
          id: categoryId,
          name: category.name,
          color: category.color,
        },
        place: {
          id: placeId,
          name: place.name,
        },
        detail,
      };

      const accountData = {
        activityCount: account.activityCount + 1,
        balance: account.balance - activity.sum,
      };

      const categoryData = {
        activityCount: category.activityCount + 1,
        total: category.total + activity.sum,
      };

      // Create activity in firestore
      const user = getCurrentUser();
      const activityId = await createActivity(user, activity);

      // Update UI optimiscally
      updateUI(
        Object.assign({}, activity, { id: activityId }),
        accountId,
        accountData.balance,
      );

      // update rest of firestore
      await createPlace(user, {
        id: placeId,
        name: place.name,
        address: place.address,
      });
      await updateAccount(user, accountId, accountData);
      await updateCategory(user, categoryId, categoryData);

      // Clear state
      await this.setState({
        loading: false,
        sum: '',
        accountId: '',
        categoryId: '',
        detail: '',
        placeId: '',
        sumError: '',
      });

      // Close form
      // toggleOpenForm();
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  }

  handleSumChange(ev) {
    this.setState({ sum: ev.target.value });
  }

  handleMethodChange(accountId) {
    this.setState({ accountId });
  }

  handleLabelChange(categoryId) {
    this.setState({ categoryId });
  }

  hanldeDetailChange(ev) {
    this.setState({ detail: ev.target.value });
  }

  handlePlaceChange(placeId) {
    this.setState({ placeId });
  }

  render() {
    const {
      sum, sumError, accountId, categoryId, detail, placeId, loading,
    } = this.state;
    const {
      places,
      placesLoading,
      accounts,
      accountsLoading,
      categories,
      categoriesLoading,
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
            options={accounts}
            value={accountId}
            onSelect={this.handleMethodChange}
            placeholder="Cuenta"
            loading={accountsLoading}
          />
          <Dropdown
            options={categories}
            value={categoryId}
            onSelect={this.handleLabelChange}
            placeholder="Categoría"
            loading={categoriesLoading}
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
  accounts: optionsTypes.isRequired,
  categories: optionsTypes.isRequired,
  placesLoading: PropTypes.bool.isRequired,
  accountsLoading: PropTypes.bool.isRequired,
  categoriesLoading: PropTypes.bool.isRequired,
  toggleOpenForm: PropTypes.func.isRequired,
};

export default ActivityForm;
