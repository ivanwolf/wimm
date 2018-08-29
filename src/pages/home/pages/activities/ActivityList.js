import React from 'react';
import PropTypes from 'prop-types';
import ScrollState from '../../../../components/utils/ScrollState';
import Touchable from '../../../../components/Touchable';
import ActivityCard from './Cards';
import { SelectItemConsumer } from '../../../../components/utils/SelectItem';
import { SpinnerTwo } from '../../../../components/spinner/Spinner';
import { Container } from '../../../../components/Layout';


const ActivityList = ({ activities, loading }) => (
  <SelectItemConsumer
    render={(selectedActivities, handleSelectActivity) => {
      if (loading) {
        return (
          <Container centerContent>
            <SpinnerTwo />
          </Container>
        );
      }
      return (
        <ScrollState
          render={isScrolling => (
            activities.map(act => (
              <Touchable
                key={act.id}
                disabled={selectedActivities.length > 0 || isScrolling}
                onTouchSelect={() => handleSelectActivity(act.id)}
              >
                <ActivityCard
                  editMode={selectedActivities.length > 0}
                  selected={selectedActivities.includes(act.id)}
                  activity={act}
                />
              </Touchable>
            ))
          )}
        />
      );
    }}
  />
);


ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ActivityList;
