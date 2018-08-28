import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container } from '../../../../components/Layout';
import { Card, CardHeader, WhiteCard } from '../../../../components/Card';
import { formatSum } from '../../../../utils/format';
import { SpinnerTwo } from '../../../../components/spinner/Spinner';

const Summary = ({ accounts, loading }) => (
  <div>
    <WhiteCard>
      Balance
    </WhiteCard>
    {loading ? (
      <Card>
        <Container centerContent>
          <SpinnerTwo />
        </Container>
      </Card>
    ) : (
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
    )}
  </div>
);

Summary.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default Summary;
