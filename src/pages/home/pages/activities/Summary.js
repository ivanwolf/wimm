import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Container } from '../../../../components/Layout';
import { Card, CardHeader } from '../../../../components/Card';
import { formatSum } from '../../../../utils/format';
import { SpinnerTwo } from '../../../../components/spinner/Spinner';
import Badge from '../../../../components/Badge';

const Summary = ({ accounts, loading }) => {
  if (loading) {
    return (
      <Card>
        <Container centerContent>
          <SpinnerTwo />
        </Container>
      </Card>
    );
  }
  return (
    <Fragment>
      <Badge>Balance</Badge>
      <div>
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
    </Fragment>
  );
};

Summary.propTypes = {
  accounts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Summary;
