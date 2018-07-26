import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Col } from '../../components/Layout';
import { SpinnerTwo } from '../../components/spinner/Spinner';
import colors from '../../config/colors';
import { formatSum } from '../../utils/format';


const ActivityWrapper = styled.div`
  padding: 0.65rem;
  border-radius: 3px;
  display: flex;
  margin-bottom: 15px;
  border-left: 6px solid;
  background-color: ${colors.grayLighter};
  color: ${colors.gray}
  ${({ color }) => color === 'lunch' && css`
    border-color: ${colors.danger};
  `}
  ${({ color }) => color === 'dress' && css`
    border-color: ${colors.blueLight};
  `}
  ${({ color }) => color === 'super' && css`
    border-color: ${colors.orange};
  `}

`;

const Header = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  ${({ color }) => color === 'lunch' && css`
    color: ${colors.danger};
  `}
  ${({ color }) => color === 'dress' && css`
    color: ${colors.blueLight};
  `}
  ${({ color }) => color === 'super' && css`
    color: ${colors.orange};
  `}
`;

const Item = styled.div`
  font-size: 13px;
`;

const ActivityCard = ({ activity }) => {
  const date = new Date(activity.createdAt).toTimeString().split(' ')[0];
  return (
    <ActivityWrapper color={activity.label.id}>
      <Col>
        <Header color={activity.label.id}>
          {`${activity.label.name}`}
        </Header>
        <Item>
          {`${date}`}
        </Item>
        <Item>
          {`${activity.place.name}`}
        </Item>
        <Item>
          {activity.detail}
        </Item>
      </Col>
      <Col>
        <Header color={activity.label.id}>
          {`$${formatSum(activity.sum)}`}
        </Header>
        <Item>
          {activity.method.name}
        </Item>
      </Col>
    </ActivityWrapper>
  );
}

const ActivityList = ({ activities, loading }) => {
  if (loading) return <SpinnerTwo />;
  return (
    <Fragment>
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
