import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../../../components/Layout';
import { TextInput, Button } from '../../../../components/Input';
import { Dropdown, LocationDropdown } from '../../../../components/Dropdown';
import { connect } from '../../../../components/utils/Provider';


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
      submitting: false,
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
    await this.setState({ submitting: true });
    try {
      const {
        sum, accountId, categoryId, detail,
      } = this.state;
      const {
        accounts, categories, createActivity, updateAccounts, updateCategories, toggleOpenForm,
      } = this.props;

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
        detail,
      };

      const accountData = {
        id: accountId,
        activityCount: account.activityCount + 1,
        balance: account.balance - activity.sum,
      };

      const categoryData = {
        id: categoryId,
        activityCount: category.activityCount + 1,
        total: category.total + activity.sum,
      };

      // Create activity in firestore
      await createActivity(activity);
      await updateAccounts([accountData]);
      await updateCategories([categoryData]);

      // Clear state
      await this.setState({
        submitting: false,
        sum: '',
        accountId: '',
        categoryId: '',
        detail: '',
        sumError: '',
      });

      // Close form
      toggleOpenForm();
    } catch (err) {
      this.setState({ submitting: false });
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
      sum, sumError, accountId, categoryId, detail, submitting,
    } = this.state;
    const {
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
            disabled={!sum || submitting}
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
  accounts: optionsTypes.isRequired,
  categories: optionsTypes.isRequired,
  toggleOpenForm: PropTypes.func.isRequired,
};

export default connect(
  'accounts',
  'categories',
)(
  'createActivity',
  'updateAccounts',
  'updateCategories',
)(ActivityForm);
