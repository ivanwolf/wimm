import React, { Component } from 'react';
import { signInOrCrateAccount } from '../utils/session';
import LoginForm from './login/Form';
import { Page, Container } from '../components/Layout';
import { Title, Text } from '../components/Typography';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { email, password } = this.state;
    this.setState({ loading: true });
    signInOrCrateAccount(this.handleError)(email, password);
  }

  handleError(error) {
    if (error.code === 'auth/invalid-email') {
      this.setState({
        loading: false,
        emailError: 'Debes escorger un email válido',
      });
    }
    if (error.code === 'auth/wrong-password') {
      this.setState({
        loading: false,
        passwordError: 'Contraseña incorrecta',
      });
    }
    if (error.code === 'auth/too-many-requests') {
      this.setState({
        loading: false,
        passwordError: 'Demasiados intentos, espera un momento',
      });
    }
  }

  handleEmailChange(ev) {
    this.setState({
      email: ev.target.value,
      emailError: '',
    });
  }

  handlePasswordChange(ev) {
    this.setState({
      password: ev.target.value,
      passwordError: '',
    });
  }

  render() {
    return (
      <Page centerContent>
        <Container marginBottom>
          <Title>
            ¡Hola!
          </Title>
          <Text>
            Inicia sesión o crea un cuenta nueva
          </Text>
          <LoginForm
            onSubmit={this.handleSubmit}
            onEmailChange={this.handleEmailChange}
            onPasswordChange={this.handlePasswordChange}
            {...this.state}
          />
        </Container>
      </Page>
    );
  }
}

export default Login;

