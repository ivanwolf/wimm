import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { Col } from '../../../../components/Layout';
import { formatSum } from '../../../../utils/format';
import {
  Card, CardHeader, CardItem,
} from '../../../../components/Card';
import Icon from '../../../../components/Icon';
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


const BaseCard = ({
  selected, editMode, color, renderLeft, renderRight,
}) => (
  <ActivityWrapper
    selected={selected}
    editMode={editMode}
    color={color}
  >
    <Col>
      {renderLeft()}
    </Col>
    <Col>
      {renderRight()}
    </Col>
  </ActivityWrapper>
);

BaseCard.propTypes = {
  selected: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  renderLeft: PropTypes.func.isRequired,
  renderRight: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};


const IncomeCard = ({ activity, ...props }) => {
  const date = new Date(activity.createdAt).toTimeString().split(' ')[0];
  return (
    <BaseCard
      {...props}
      color={colors.green}
      renderLeft={() => (
        <Fragment>
          <CardHeader color={colors.green}>
            Ingreso
          </CardHeader>
          <CardItem>
            {`${date}`}
          </CardItem>
          <CardItem>
            {activity.detail}
          </CardItem>
        </Fragment>
      )}
      renderRight={() => (
        <Fragment>
          <CardHeader color={colors.green}>
            {`$${formatSum(activity.sum)}`}
          </CardHeader>
          <CardItem>
            {activity.account.name}
          </CardItem>
        </Fragment>
      )}
    />
  );
};

const ExpenseCard = ({ activity, ...props }) => {
  const date = new Date(activity.createdAt).toTimeString().split(' ')[0];
  const {
    category, detail, sum, account,
  } = activity;
  return (
    <BaseCard
      color={category.color}
      {...props}
      renderLeft={() => (
        <Fragment>
          <CardHeader color={category.color}>
            {`${category.name}`}
          </CardHeader>
          <CardItem>
            {`${date}`}
          </CardItem>
          <CardItem>
            {detail}
          </CardItem>
        </Fragment>
      )}
      renderRight={() => (
        <Fragment>
          <CardHeader color={category.color}>
            {`$${formatSum(sum)}`}
          </CardHeader>
          <CardItem>
            {account.name}
          </CardItem>
        </Fragment>
      )}
    />
  );
};

const TransferCard = ({ activity, ...props }) => {
  const date = new Date(activity.createdAt).toTimeString().split(' ')[0];
  return (
    <BaseCard
      {...props}
      color={colors.yellow}
      renderLeft={() => (
        <Fragment>
          <CardHeader color={colors.yellow}>
            Traspaso
          </CardHeader>
          <CardItem>
            {`${date}`}
          </CardItem>
          <CardItem>
            {activity.detail}
          </CardItem>
        </Fragment>
      )}
      renderRight={() => (
        <Fragment>
          <CardHeader color={colors.yellow}>
            {`$${formatSum(activity.sum)}`}
          </CardHeader>
          <CardItem>
            {activity.from.name}
            <Icon name="keyboard_arrow_right" />
            {activity.to.name}
          </CardItem>
        </Fragment>
      )}
    />
  );
};

const ActivityCard = ({ activity, ...props }) => {
  if (activity.type === 'income') {
    return <IncomeCard activity={activity} {...props} />;
  }
  if (activity.type === 'expense') {
    return <ExpenseCard activity={activity} {...props} />;
  }
  if (activity.type === 'transfer') {
    return <TransferCard activity={activity} {...props} />;
  }
  return null;
};

export default ActivityCard;
