import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Icon from './Icon';
import colors from '../config/colors';

const AppBarWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 1;
  height: 4rem;
`;

const DateWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: large
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  width: 2rem;
`;

const RotateIcon = styled(Icon)`
  transition: transform .5s ease;
  ${({ rotate }) => rotate && css`
    transform: rotate(45deg) scale(1.1);
  `}
  ${({ hidden }) => hidden && css`
    opacity: 0;
  `}
`;

const HiddenIcon = styled(Icon)`
  transition: opacity .5s ease;
  ${({ hidden }) => hidden && css`
    opacity: 0;
  `}
`;

const getTitle = (openForm, pathname) => {
  if (openForm) return 'Agregar Movimiento';
  if (pathname === '/add_founds') return 'Añadir fondos';
  return 'MangoApp';
};

const AppBar = ({ openForm, onAddClick, onMenuClick, location, history }) => {
  const hideAdd = location.pathname === '/add_founds';
  const leftIcon = location.pathname !== '/' ? 'arrow_back_ios' : 'menu'
  const onLeftIconClick = location.pathname !== '/' ? history.goBack : onMenuClick;
  return (
    <AppBarWrapper>
      <IconWrapper onClick={onLeftIconClick}>
        <HiddenIcon hidden={openForm} name={leftIcon} />
      </IconWrapper>
      <DateWrapper>
        {getTitle(openForm, location.pathname)}
      </DateWrapper>
      <IconWrapper onClick={onAddClick}>
        <RotateIcon hidden={hideAdd} rotate={openForm} name="add" />
      </IconWrapper>
    </AppBarWrapper>
  );
};

AppBar.propTypes = {
  openForm: PropTypes.bool.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default withRouter(AppBar);
