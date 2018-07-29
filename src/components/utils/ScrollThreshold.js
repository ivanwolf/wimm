import { Component } from 'react';
import PropTypes from 'prop-types';

class ScrollState extends Component {
  constructor(props) {
    super(props);
    this.state = { overThreshold: false };
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const { overThreshold } = this.state;
      const { limit } = this.props;
      if (window.scrollY > limit) {
        if (!overThreshold) {
          this.setState({ overThreshold: true });
        }
      } else if (overThreshold) {
        this.setState({ overThreshold: false });
      }
    });
  }

  render() {
    const { render } = this.props;
    const { overThreshold } = this.state;
    return render(overThreshold);
  }
}

ScrollState.propTypes = {
  render: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};

export default ScrollState;
