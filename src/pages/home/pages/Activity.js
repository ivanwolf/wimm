import React from 'react';
import PropTypes from 'prop-types';
import Summary from './activity/Summary';
import ActivityList from './activity/ActivityList';
import { Container } from '../../../components/Layout';
import { SpinnerTwo } from '../../../components/spinner/Spinner';
import { connect } from '../../../components/utils/Provider';

const Activity = ({
  activities,
  activitiesLoading,
  accounts,
  accountsLoading,
  selectedActivities,
  handleSelectActivity,
}) => {
  if (activitiesLoading || accountsLoading) {
    return (
      <Container centerContent marginTop>
        <SpinnerTwo />
      </Container>
    );
  }
  return (
    <Container marginTop>
      <Summary accounts={accounts} />
      <ActivityList
        activities={activities}
        selectedActivities={selectedActivities}
        handleSelectActivity={handleSelectActivity}
      />
    </Container>
  );
};

Activity.propTypes = {
  handleSelectActivity: PropTypes.func.isRequired,
  activities: PropTypes.array.isRequired,
  selectedActivities: PropTypes.arrayOf(PropTypes.string).isRequired,
  accounts: PropTypes.array.isRequired,
};

export default connect('activities', 'accounts')(null)(Activity);
