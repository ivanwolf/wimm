import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Icon from './Icon';
import colors from '../config/colors';
import ScrollThreshold from './utils/ScrollThreshold';

const AppBarWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 1;
  height: 4rem;
  background-color: ${colors.white};
  padding: 0 0.7rem;
  transition: box-shadow .4s ease;
  ${({ solid }) => solid && css`
    box-shadow: 0px 0px 5px 0px ${colors.violette};
  `}
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  font-size: large
  transition: opacity .4s ease;
  ${({ hidden }) => hidden && css`
    opacity: 0;
  `}
  ${({ main }) => main && css`
    font-family: 'Lily Script One', cursive;
    font-size: x-large;
  `}
`;

const IconWrapper = styled.div.attrs({
  onClick: ({ hidden, onClick }) => hidden || onClick,
})`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transition: opacity .4s ease;
  z-index: 1;
  ${({ right }) => right && css`
    right: .7rem;
  `}
  ${({ rightSecond }) => rightSecond && css`
    right: calc(.7rem + 40px);
    color: ${colors.grayLight};
  `}
  ${({ hidden }) => hidden && css`
    opacity: 0;
    z-index: 0;
  `}
`;

const RotateIcon = styled(Icon)`
  transition: transform .4s ease;
  ${({ rotate }) => rotate && css`
    transform: rotate(45deg) scale(1.1);
  `}
  ${({ hidden }) => hidden && css`
    opacity: 0;
  `}
`;


const AppBarHOC = ({
  renderLeft,
  renderTitle,
  renderRight,
}) => (
  <ScrollThreshold
    limit={5}
    render={overThreshold => (
      <AppBarWrapper solid={overThreshold}>
        {renderLeft && renderLeft()}
        {renderTitle && renderTitle()}
        {renderRight && renderRight()}
      </AppBarWrapper>
    )}
  />
);

AppBarHOC.defaultProps = {
  renderRight: () => {},
};

AppBarHOC.propTypes = {
  renderLeft: PropTypes.func.isRequired,
  renderTitle: PropTypes.func.isRequired,
  renderRight: PropTypes.func,
};


export const HomeAppBar = ({
  openForm,
  selectedActivitiesCount,
  toggleOpenForm,
  toggleOpenMenu,
  clearSelectedActivities,
  handleDeleteActivities,
  handleEditActivity,
}) => {
  const editMode = selectedActivitiesCount > 0;
  return (
    <AppBarHOC
      renderLeft={() => (
        <Fragment>
          <IconWrapper hidden={openForm || editMode} onClick={toggleOpenMenu}>
            <Icon name="menu" />
          </IconWrapper>
          <IconWrapper hidden={!editMode} onClick={clearSelectedActivities}>
            <Icon name="arrow_back" />
          </IconWrapper>
        </Fragment>
      )}
      renderTitle={() => (
        <Fragment>
          <TitleWrapper main hidden={editMode || openForm}>
            MangoApp
          </TitleWrapper>
          <TitleWrapper hidden={editMode || !openForm}>
            Agregar movimiento
          </TitleWrapper>
        </Fragment>
      )}
      renderRight={() => (
        <Fragment>
          <IconWrapper right hidden={editMode} onClick={toggleOpenForm}>
            <RotateIcon rotate={openForm} name="add" />
          </IconWrapper>
          <IconWrapper right hidden={!editMode} onClick={handleDeleteActivities}>
            <Icon name="delete" />
          </IconWrapper>
          <IconWrapper
            rightSecond
            hidden={!editMode || selectedActivitiesCount > 1}
            onClick={handleEditActivity}
          >
            <Icon name="edit" />
          </IconWrapper>
        </Fragment>
      )}
    />
  );
};

HomeAppBar.propTypes = {
  openForm: PropTypes.bool.isRequired,
  selectedActivitiesCount: PropTypes.number.isRequired,
  toggleOpenForm: PropTypes.func.isRequired,
  toggleOpenMenu: PropTypes.func.isRequired,
  clearSelectedActivities: PropTypes.func.isRequired,
  handleDeleteActivities: PropTypes.func.isRequired,
  handleEditActivity: PropTypes.func.isRequired,
};


const LocationAppBar = ({
  title,
  history,
}) => (
  <AppBarHOC
    renderLeft={() => (
      <IconWrapper onClick={history.goBack}>
        <Icon name="arrow_back" />
      </IconWrapper>
    )}
    renderTitle={() => (
      <TitleWrapper>
        {title}
      </TitleWrapper>
    )}
  />
);

LocationAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export const AppBar = withRouter(LocationAppBar);
