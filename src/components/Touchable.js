import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class Touchable extends Component {
  constructor(props) {
    super(props);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.clearTimeout = this.clearTimeout.bind(this);
    this.timeout = null;
  }

  componentDidUpdate(prevProps) {
    const { disabled } = this.props;
    if (disabled && disabled !== prevProps.disabled) {
      this.clearTimeout();
    }
  }

  handleTouchStart() {
    const { disabled, onTouchSelect } = this.props;
    this.timeout = setTimeout(() => {
      onTouchSelect();
    }, 600);
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.clearTimeout}
      >
        {Children.only(children)}
      </div>
    );
  }
}

Touchable.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onTouchSelect: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};


export default Touchable;
