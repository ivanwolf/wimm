import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { Col } from '../../../../components/Layout';
import { formatSum } from '../../../../utils/format';
import {
  Card, CardHeader, CardItem, WhiteCard,
} from '../../../../components/Card';
import Touchable from '../../../../components/Touchable';
import ScrollState from '../../../../components/utils/ScrollState';
import colors from '../../../../config/colors';


export const ActivityWrapper = Card.extend`
  border-left: 6px solid;
  border-color: ${({ color }) => color};
  transition: opacity 0.3s ease;
  ${({ editMode }) => editMode && css`
    opacity: .4;
  `};

  ${({ selected }) => selected && css`
    opacity: 1;
    box-shadow: 0px 0px 2px 0px ${colors.violette};
  `};
`;


const ActivityCard = ({ activity, onClick, selected, editMode }) => {
  const date = new Date(activity.createdAt).toTimeString().split(' ')[0];
  return (
    <ActivityWrapper
      selected={selected}
      color={activity.category.color}
      onClick={onClick}
      editMode={editMode}
    >
      <Col>
        <CardHeader color={activity.category.color}>
          {`${activity.category.name}`}
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
        <CardHeader color={activity.category.color}>
          {`$${formatSum(activity.sum)}`}
        </CardHeader>
        <CardItem>
          {activity.account.name}
        </CardItem>
      </Col>
    </ActivityWrapper>
  );
};

ActivityCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const ActivityList = ({
  activities,
  selectedActivities,
  handleSelectActivity,
}) => {
  const editMode = selectedActivities.length > 0;
  const selectActivity = id => () => handleSelectActivity(id);
  return (
    <Fragment>
      <div>
        <WhiteCard>
          Movimientos
        </WhiteCard>
      </div>
      <ScrollState
        render={isScrolling => (
          activities.map(act => (
            <Touchable
              key={act.id}
              disabled={editMode || isScrolling}
              onTouchSelect={selectActivity(act.id)}
            >
              <ActivityCard
                editMode={editMode}
                selected={selectedActivities.includes(act.id)}
                activity={act}
                onClick={editMode ? selectActivity(act.id) : () => {}}
              />
            </Touchable>
          ))
        )}
      />
    </Fragment>
  );
};


ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
  selectedActivities: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelectActivity: PropTypes.func.isRequired,
};

export default ActivityList;
