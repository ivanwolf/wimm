
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Icon from './Icon';
import colors from '../config/colors';

const GrayIcon = styled(Icon)`
  color: ${colors.grayLight};
`;

const ToggleOff = () => <GrayIcon name="toggle_off" />;

const ToggleOn = () => <Icon name="toggle_on" />;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex: 1;
`;

const IconWrapper = styled.div.attrs({
  onClick: ({ active, onClick }) => active && onClick,
})`
  position: absolute;
  height: 24px;
  transition: opacity .4s ease;
  opacity: 0;
  ${({ active }) => active && css`
    z-index: 1;
    opacity: 1;
  `}
`;

const Toggle = ({ active, onClick }) => {
  const handleOnClick = () => onClick(active);
  return (
    <ToggleWrapper>
      <IconWrapper onClick={handleOnClick} active={active}>
        <ToggleOn />
      </IconWrapper>
      <IconWrapper onClick={handleOnClick} active={!active}>
        <ToggleOff />
      </IconWrapper>
    </ToggleWrapper>
  );
};

Toggle.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Toggle;
