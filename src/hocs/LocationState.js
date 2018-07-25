import React, { Component } from 'react';

export default (Target) => {
  class WithLocation extends Component {
    constructor(props) {
      super(props);
      this.state = { location: null };
      this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    handleLocationChange({ latitude, longitude }) {
      this.setState({
        location: {
          latitude,
          longitude,
        },
      });
    }

    render() {
      return (
        <Target
          {...this.props}
          {...this.state}
          handleLocationChange={this.handleLocationChange}
        />
      );
    }
  }
  return WithLocation;
};
