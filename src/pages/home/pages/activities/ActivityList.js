import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { WhiteCard } from '../../../../components/Card';
import ScrollState from '../../../../components/utils/ScrollState';
import Touchable from '../../../../components/Touchable';
import ActivityCard from './Cards';
import { SelectItemConsumer } from '../../../../components/utils/SelectItem';
import { SpinnerTwo } from '../../../../components/spinner/Spinner';
import { Container } from '../../../../components/Layout';


const ActivityList = ({ activities, loading }) => (
  <SelectItemConsumer
    render={(selectedActivities, handleSelectActivity) => (
      <Fragment>
        <div>
          <WhiteCard>
            Movimientos
          </WhiteCard>
        </div>
        {loading ? (
          <Container centerContent>
            <SpinnerTwo />
          </Container>
        ) : (
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
        )}
      </Fragment>
    )}
  />
);


ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default ActivityList;
