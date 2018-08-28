import React, { Component } from 'react';

export default Target => class OpenFormState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.toggleOpenForm = this.toggleOpenForm.bind(this);
  }

  toggleOpenForm() {
    this.setState(state => ({
      open: !state.open,
    }));
  }

  render() {
    const { open } = this.state;
    return (
      <Target
        {...this.props}
        openForm={open}
        toggleOpenForm={this.toggleOpenForm}
      />
    );
  }
};
