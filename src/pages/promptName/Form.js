import React from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../components/Layout';
import { TextInput, Button } from '../../components/Input';

const NameForm = ({
  onSubmit, displayName, onNameChange, nameError, loading,
}) => (
  <form onSubmit={onSubmit}>
    <Col>
      <TextInput
        value={displayName}
        onChange={onNameChange}
        error={nameError}
        placeholder="John Doe"
        type="text"
      />
      <Button
        type="submit"
        disabled={loading || !displayName}
      >
        Continuar
      </Button>
    </Col>
  </form>
);

NameForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  displayName: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  nameError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NameForm;
