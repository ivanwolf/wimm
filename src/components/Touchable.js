import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';

class Touchable extends Component {
  constructor(props) {
    super(props);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.timeout = null;
  }

  handleTouchStart() {
    const { disabled, onTouchSelect } = this.props;
    if (!disabled) {
      this.timeout = setTimeout(() => {
        onTouchSelect();
      }, 800);
    }
  }

  handleTouchEnd() {
    const { disabled } = this.props;
    if (!disabled) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
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
