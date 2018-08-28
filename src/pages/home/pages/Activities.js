import React, { Component } from 'react';
import { HomeAppBar } from '../../../components/AppBar';
import { connect } from '../../../components/utils/Provider';
import SelectItemProvider from '../../../components/utils/SelectItem';
import { Container } from '../../../components/Layout';
import Drawer from '../../../components/Drawer';
import withOpenFormState from '../../../hocs/OpenFormState';
import ActivityForm from './activities/ActivityForm';
import Summary from './activities/Summary';
import ActivityList from './activities/ActivityList';
import { accountsToUpdate, categoriesToUpdate } from '../../../utils/lambda';

class Activities extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteActivities = this.handleDeleteActivities.bind(this);
  }

  componentDidMount() {
    const { fetchAccounts, fetchActivities, fetchCategories } = this.props;
    fetchActivities();
    fetchAccounts();
    fetchCategories();
  }

  async handleDeleteActivities(selectedActivities) {
    const {
      activities,
      accounts,
      categories,
      deleteActivities,
      updateAccounts,
      updateCategories,
    } = this.props;
    const activitiesToDelete = activities.filter(act => selectedActivities.includes(act.id));
    const updatedAccountsData = accountsToUpdate(activitiesToDelete, accounts);
    const updatedCategoriesData = categoriesToUpdate(activitiesToDelete, categories);
    try {
      await deleteActivities(selectedActivities);
      await updateAccounts(updatedAccountsData);
      await updateCategories(updatedCategoriesData);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      activities,
      activitiesLoading,
      accounts,
      accountsLoading,
      openForm,
      toggleOpenForm
    } = this.props;
    return (
      <SelectItemProvider>
        <Container marginTop>
          <Drawer active={openForm}>
            <ActivityForm toggleOpenForm={toggleOpenForm} />
          </Drawer>
          <HomeAppBar
            main
            openForm={openForm}
            formTitle="Registrar movimiento"
            toggleOpenForm={toggleOpenForm}
            handleDeleteItems={this.handleDeleteActivities}
            handleEditItem={() => {}}
          />
          <Summary accounts={accounts} loading={accountsLoading} />
          <ActivityList activities={activities} loading={activitiesLoading} />
        </Container>
      </SelectItemProvider>
    );
  }
}

export default connect(
  'activities',
  'accounts',
  'categories',
)(
  'fetchActivities',
  'fetchAccounts',
  'fetchCategories',
  'deleteActivities',
  'updateAccounts',
  'updateCategories',
)(withOpenFormState(Activities));
