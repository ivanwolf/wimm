import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../../../components/Layout';
import { SpinnerTwo } from '../../../../components/spinner/Spinner';
import { formatSum } from '../../../../utils/format';
import {
  Card, CardHeader, CardItem, WhiteCard,
} from '../../../../components/Card';


export const ActivityWrapper = Card.extend`
  border-left: 6px solid;
  border-color: ${({ color }) => color};
`;


const ActivityCard = ({ activity }) => {
  const date = new Date(activity.createdAt).toTimeString().split(' ')[0];
  return (
    <ActivityWrapper color={activity.label.color}>
      <Col>
        <CardHeader color={activity.label.color}>
          {`${activity.label.name}`}
        </CardHeader>
        <CardItem>
          {`${date}`}
        </CardItem>
        <CardItem>
          {`${activity.place.name}`}
        </CardItem>
        <CardItem>
          {activity.detail}
        </CardItem>
      </Col>
      <Col>
        <CardHeader color={activity.label.color}>
          {`$${formatSum(activity.sum)}`}
        </CardHeader>
        <CardItem>
          {activity.method.name}
        </CardItem>
      </Col>
    </ActivityWrapper>
  );
};

const ActivityList = ({ activities, loading }) => {
  if (loading) return <SpinnerTwo />;
  return (
    <Fragment>
      <WhiteCard>
        Movimientos
      </WhiteCard>
      {activities.map(act => (
        <ActivityCard key={act.id} activity={act} />
      ))}
    </Fragment>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ActivityList;
