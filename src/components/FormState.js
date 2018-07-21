import React, { Component } from 'react';


class FormState extends Component {
  static getInitialState(fields) {
    return {
      values: fields.reduce((res, field) => {
        res[field.name] = field.defaultValue || '';
        return res;
      }, {}),
      errors: {},
    }
  }

  static logChange(fieldName, value) {
    return (prevState) => ({
      values: Object.assign({}, prevState.values, {
        [fieldName]: value,
      }),
      errors: prevState.errors,
    })
  }

  constructor(props) {
    super(props);
    this.createHandlers = this.createHandlers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = FormState.getInitialState(this.props.fields);
    this.logChange = this.createHandlers();
  }

  createHandlers() {
    return this.props.fields.reduce((res, field) => {
      res[field.name] = (ev) => {
        this.setState(FormState.logChange(field.name, ev.target.value));
      };
      return res;
    }, {});
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(this.state.values);
  }
  render() {
    const { values, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
         {this.props.render(values, errors, this.logChange)}
      </form>
    )
  }
}


export default FormState;
