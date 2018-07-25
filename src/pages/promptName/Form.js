import React from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../components/Layout';
import { TextInput, Button, ErrorText } from '../../components/Input';

const NameForm = ({
  onSubmit, displayName, onNameChange, error, loading,
}) => (
  <form onSubmit={onSubmit}>
    <Col>
      <TextInput
        value={displayName}
        onChange={onNameChange}
        placeholder="John Doe"
        type="text"
      />
      <Button
        type="submit"
        disabled={loading || !displayName}
      >
        Continuar
      </Button>
      <ErrorText>
        {error}
      </ErrorText>
    </Col>
  </form>
);

NameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  displayName: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NameForm;
