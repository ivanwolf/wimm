import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { TextInputWrapper, StyledInput, ErrorText } from './Input';
import colors from '../config/colors';
import Icon from './Icon';

const DropdownWrapper = TextInputWrapper.extend`
  position: relative;
`;

const DropdownInput = StyledInput.extend`
  color: transparent;
  text-shadow: 0 0 0 ${colors.violetteDark};
  ${({ active }) => active && css`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom: 2px dashed ${colors.violetteDark};
  `}
`;

const MenuWrapper = styled.div`
  height: 9.5rem;
  position: absolute;
  left: 0;
  right: 0;
  background-color: ${colors.grayLight};
  z-index: 1;
  top: calc(3rem + 4px);
  transition: max-height .4s ease;
  overflow: scroll;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 2px solid ${colors.violetteDark};
  border-right: 2px solid ${colors.violetteDark};
  max-height: 0;
  ${({ active }) => active && css`
    border-color: ${colors.violetteDark};
    border-bottom: 2px solid;
    max-height: 9.5rem;
  `}
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  height 2.5rem;
  padding: 0 .5rem;
  margin: .5rem;
  border-radius: 3px;
  ${({ selected }) => selected && css`
    font-weight: 500;
    background-color: ${colors.violette};
    color: ${colors.white};
  `}
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
`;

const RotateIcon = styled(Icon)`
  transition: transform .5s ease;
  ${({ rotate }) => rotate && css`
    transform: rotate(180deg);
  `}
`;

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
  }

  handleOpenMenu() {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  handleItemClick(id) {
    const { onSelect } = this.props;
    return (ev) => {
      ev.preventDefault();
      onSelect(id);
      setTimeout(() => {
        this.setState({ isOpen: false });
      }, 100);
    };
  }

  render() {
    const { isOpen } = this.state;
    const { value, options, error, placeholder } = this.props;
    const currentOption = options.find(opt => opt.id === value);
    return (
      <DropdownWrapper>
        <DropdownInput
          value={currentOption ? currentOption.name : ''}
          error={error}
          onClick={this.handleOpenMenu}
          readOnly
          active={isOpen}
          placeholder={placeholder}
        />
        <IconWrapper onClick={this.handleOpenMenu}>
          <RotateIcon rotate={isOpen} name="keyboard_arrow_down" />
        </IconWrapper>
        <MenuWrapper active={isOpen}>
          {options.map(opt => (
            <MenuItem
              key={opt.id}
              onClick={this.handleItemClick(opt.id)}
              selected={opt.id === value}
            >
              {opt.name}
            </MenuItem>
          ))}
        </MenuWrapper>
        <ErrorText>
          {error}
        </ErrorText>
      </DropdownWrapper>
    );
  }
}

Dropdown.defaultProps = {
  value: 1,
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.number,
  error: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Dropdown;
