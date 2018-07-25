import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, className }) => (
  <i className={`material-icons ${className}`}>
    {name}
  </i>
);

Icon.defaultProps = {
  className: '',
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
