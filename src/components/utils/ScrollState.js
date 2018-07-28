import { Component } from 'react';
import PropTypes from 'prop-types';

class ScrollState extends Component {
  constructor(props) {
    super(props);
    this.state = { isScrolling: false };
    this.timeout = null;
  }

  componentDidMount() {
    window.addEventListener('scroll', async () => {
      const { isScrolling } = this.state;
      if (!isScrolling) {
        this.setState({ isScrolling: true });
      } else {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.setState({ isScrolling: false });
      }, 200);
    });
  }

  render() {
    const { render } = this.props;
    const { isScrolling } = this.state;
    return render(isScrolling);
  }
}

ScrollState.propTypes = {
  render: PropTypes.func.isRequired,
};

export default ScrollState;
