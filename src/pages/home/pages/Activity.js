import React from 'react';
import PropTypes from 'prop-types';
import Summary from './activity/Summary';
import ActivityList from './activity/ActivityList';
import { Container } from '../../../components/Layout';
import { SpinnerTwo } from '../../../components/spinner/Spinner';

const Activity = ({ activities, balance, loading }) => {
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
      <ActivityList activities={activities} />
    </Container>
  );
};

export default Activity;
