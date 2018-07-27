import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Summary from './activity/Summary';
import ActivityList from './activity/ActivityList';
import { Container } from '../../../components/Layout';
import { SpinnerTwo } from '../../../components/spinner/Spinner';

const Activity = ({
  activities,
  balance,
  loading,
  selectedActivities,
  handleSelectActivity,
}) => {
  if (loading) {
    return (
      <Container centerContent marginTop>
        <SpinnerTwo />
      </Container>
    );
  }
  return (
    <Container marginTop>
      <Summary balance={balance} />
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
  balance: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Activity;
