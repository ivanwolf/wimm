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
    this.setState({ loading: true });
    updateUserProfile({ displayName }).then(() => {
      this.props.history.replace('/');
    });
  }

  handleDisplayNameChange(ev) {
    this.setState({ displayName: ev.target.value });
  }

  render() {
    const { displayName, loading, error } = this.state;
    return (
      <Page centerContent>
        <Container marginBottom>
          <Title>
            ¿Cómo quieres que te llamemos?
          </Title>
          <FormName
            onSubmit={this.handleSubmit}
            displayName={displayName}
            onNameChange={this.handleDisplayNameChange}
            nameError={error}
            loading={loading}
          />
        </Container>
      </Page>
    );
  }
}

export default PromptName;
