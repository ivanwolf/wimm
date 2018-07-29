import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../../../components/Layout';
import { Card, CardHeader, WhiteCard } from '../../../../components/Card';
import { formatSum } from '../../../../utils/format';

const Summary = ({ balance }) => (
  <div>
    <WhiteCard>
      Resumen de saldo
    </WhiteCard>
    <Card>
      <Col>
        <CardHeader>
          Efectivo
        </CardHeader>
      </Col>
      <Col>
        <CardHeader>
          {`$${formatSum(balance)}`}
        </CardHeader>
      </Col>
    </Card>
  </div>
);

Summary.propTypes = {
  balance: PropTypes.number.isRequired,
};

export default Summary;
