import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { ActivityWrapper } from './ActivityList';
import { Col, Row } from '../../components/Layout';
import { Card, CardHeader, CardItem, WhiteCard } from '../../components/Card';
import { formatSum } from '../../utils/format';

const Summary = ({ balance }) => (
  <Fragment>
    <WhiteCard>
      Resumen
    </WhiteCard>
    <Card>
      <Col>
        <CardHeader>
          Saldo
        </CardHeader>
      </Col>
      <Col>
        <CardHeader>
          {`$${formatSum(balance)}`}
        </CardHeader>
      </Col>
    </Card>
  </Fragment>
);

Summary.propTypes = {
  balance: PropTypes.number.isRequired,
};

export default Summary;
