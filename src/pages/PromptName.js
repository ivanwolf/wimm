import React, { Component } from 'react';
import { Page, Container } from '../components/Layout';
import { Title } from '../components/Typography';
import { updateUserProfile } from '../utils/session';
import FormName from './promptName/Form';

class PromptName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      loading: false,
      error: '',
    };
    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { displayName } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    updateUserProfile({ displayName }).then(() => {
      history.replace('/setup');
    }).catch((error) => {
      if (error.code === 'auth/network-request-failed') {
        this.setState({ error: 'No hay conexión a internet', loading: false });
      }
      console.log(error);
    });
  }

  handleDisplayNameChange(ev) {
    this.setState({ displayName: ev.target.value });
  }

  render() {
    return (
      <Page centerContent>
        <Container marginBottom>
          <Title>
            ¿Cómo quieres que te llamemos?
          </Title>
          <FormName
            onSubmit={this.handleSubmit}
            onNameChange={this.handleDisplayNameChange}
            {...this.state}
          />
        </Container>
      </Page>
    );
  }
}

export default PromptName;
