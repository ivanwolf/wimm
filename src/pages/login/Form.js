import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from '../../components/Layout';
import { TextInput, Button, PasswordInput } from '../../components/Input';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { showPassword: false };
    this.handleShowpassword = this.handleShowpassword.bind(this);
  }

  handleShowpassword() {
    this.setState(state => ({
      showPassword: !state.showPassword,
    }));
  }

  render() {
    const {
      email,
      onEmailChange,
      emailError,
      password,
      onPasswordChange,
      passwordError,
      loading,
      onSubmit,
    } = this.props;
    const { showPassword } = this.state;
    return (
      <form onSubmit={onSubmit}>
        <Col>
          <TextInput
            value={email}
            onChange={onEmailChange}
            error={emailError}
            placeholder="Correo electrónico"
            type="email"
            autocapitalize="none"
          />
          <PasswordInput
            value={password}
            onChange={onPasswordChange}
            error={passwordError}
            placeholder="Contraseña"
            showPassword={showPassword}
            onPasswordClick={this.handleShowpassword}
          />
          <Button
            type="submit"
            disabled={loading || !(email && password)}
          >
            Continuar
          </Button>
        </Col>
      </form>
    );
  }
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  emailError: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  passwordError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
