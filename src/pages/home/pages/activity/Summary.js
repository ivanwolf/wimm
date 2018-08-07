import React from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../../../components/Layout';
import { Card, CardHeader, WhiteCard } from '../../../../components/Card';
import { formatSum } from '../../../../utils/format';

const Summary = ({ accounts }) => (
  <div>
    <WhiteCard>
      Balance
    </WhiteCard>
    <Card>
      <Col>
        {accounts.map(acc => acc.active && (
          <CardHeader key={acc.id}>
            {acc.name}
          </CardHeader>
        ))}
      </Col>
      <Col>
        {accounts.map(acc => acc.active && (
          <CardHeader key={acc.id}>
            {`$${formatSum(acc.balance)}`}
          </CardHeader>
        ))}
      </Col>
    </Card>
  </div>
);

Summary.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default Summary;
