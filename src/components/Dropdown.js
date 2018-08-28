import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { TextInputWrapper, StyledInput, ErrorText } from './Input';
import { SpinnerTwo } from './spinner/Spinner';
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
  background-color: ${colors.white};
  z-index: 1;
  top: calc(3rem + 4px);
  transition: max-height .4s ease;
  overflow: scroll;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 2px solid ${colors.violetteDark};
  border-right: 2px solid ${colors.violetteDark};
  max-height: 0;
  ${({ active, optionsCount }) => active && css`
    border-color: ${colors.violetteDark};
    border-bottom: 2px solid;
    max-height: ${optionsCount < 3 ? `calc(.5rem + ${optionsCount * 3}rem)` : '9.5rem'};
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
  ${({ loading }) => loading && css`
    right: -5px;
  `}
`;

const RotateIcon = styled(Icon)`
  transition: transform .5s ease;
  ${({ rotate }) => rotate && css`
    transform: rotate(180deg);
  `}
`;

class DropdownHOC extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleOpenMenu = this.toggleOpenMenu.bind(this);
  }

  toggleOpenMenu() {
    const { loading } = this.props;
    if (!loading) {
      this.setState(state => ({
        isOpen: !state.isOpen,
      }));
    }
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
    const {
      value, options, error, placeholder, renderIcon, loading,
    } = this.props;
    const filteredOptions = options.filter((option) => {
      if (option.active !== undefined) return option.active;
      return true;
    });
    const currentOption = filteredOptions.find(opt => opt.id === value);
    return (
      <DropdownWrapper>
        <DropdownInput
          value={currentOption ? currentOption.name : ''}
          error={error}
          onClick={this.toggleOpenMenu}
          onBlur={this.toggleOpenMenu}
          readOnly
          active={isOpen}
          placeholder={placeholder}
        />
        <IconWrapper loading={loading} onClick={this.toggleOpenMenu}>
          {loading ? <SpinnerTwo /> : renderIcon(isOpen)}
        </IconWrapper>
        <MenuWrapper active={isOpen} optionsCount={filteredOptions.length}>
          {filteredOptions.map(opt => (
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

DropdownHOC.defaultProps = {
  value: '',
  error: '',
};

DropdownHOC.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  renderIcon: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export const Dropdown = props => (
  <DropdownHOC
    {...props}
    renderIcon={isOpen => <RotateIcon rotate={isOpen} name="keyboard_arrow_down" />}
  />
);


export const LocationDropdown = props => (
  <DropdownHOC
    {...props}
    renderIcon={() => <Icon name="location_searching" />}
  />
);
