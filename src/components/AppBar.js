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

const getTitle = (editMode, openForm, pathname) => {
  if (pathname === '/') {
    if (editMode) return '';
    if (openForm) return 'Agregar movimiento';
    return 'MangoApp';
  }
  if (pathname === '/add_founds') return 'Añadir fondos';
  return '';
};

const leftAction = (location, editMode, openMenu, goBack, clearEditMode) => {
  if (location.pathname === '/') {
    if (editMode) return clearEditMode;
    return openMenu;
  }
  return goBack;
};


const AppBar = ({
  openForm,
  onAddClick,
  onMenuClick,
  location,
  history,
  clearSelectedActivities,
  selectedActivitiesCount,
}) => {
  const editMode = selectedActivitiesCount > 0;
  const hideAdd = location.pathname !== '/';
  const leftIcon = location.pathname !== '/' || editMode ? 'arrow_back' : 'menu';
  const rightIcon = editMode ? 'delete' : 'add';
  const onLeftIconClick = leftAction(
    location,
    editMode,
    onMenuClick,
    history.goBack,
    clearSelectedActivities,
  );
  return (
    <AppBarWrapper>
      <IconWrapper onClick={onLeftIconClick}>
        <HiddenIcon hidden={openForm} name={leftIcon} />
      </IconWrapper>
      <DateWrapper>
        {getTitle(editMode, openForm, location.pathname)}
      </DateWrapper>
      {editMode && (
        <IconWrapper onClick={onLeftIconClick}>
          <HiddenIcon hidden={selectedActivitiesCount > 1} name="edit" />
        </IconWrapper>
      )}
      <IconWrapper onClick={onAddClick}>
        <RotateIcon hidden={hideAdd} rotate={openForm} name={rightIcon} />
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
