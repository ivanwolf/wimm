import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Icon from './Icon';
import colors from '../config/colors';
import ScrollThreshold from './utils/ScrollThreshold';
import { SelectItemConsumer } from './utils/SelectItem';
import { OpenMenuConsumer } from './utils/OpenMenu';

const AppBarWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 3;
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
      <OpenMenuConsumer
        render={(open, toggleOpen) => (
          <AppBarWrapper solid={overThreshold}>
            {renderLeft && renderLeft(open, toggleOpen)}
            {renderTitle && renderTitle()}
            {renderRight && renderRight()}
          </AppBarWrapper>
        )}
      />
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
  toggleOpenForm,
  handleDeleteItems,
  handleEditItem,
  main,
  title,
  formTitle,
}) => (
  <SelectItemConsumer render={(items, selectItem, clearSelections) => (
    <OpenMenuConsumer render={(openMenu, toggleOpenMenu) => (
      <AppBarWrapper>
        <IconWrapper hidden={openForm || items.length > 0} onClick={toggleOpenMenu}>
          <Icon name="menu" />
        </IconWrapper>
        <IconWrapper hidden={items.length === 0} onClick={clearSelections}>
          <Icon name="arrow_back" />
        </IconWrapper>
        <TitleWrapper main={main} hidden={items.length > 0 || openForm}>
          {main ? 'MangoApp' : title}
        </TitleWrapper>
        <TitleWrapper hidden={items.length > 0 || !openForm}>
          {formTitle}
        </TitleWrapper>
        <IconWrapper right hidden={items.length > 0} onClick={toggleOpenForm}>
          <RotateIcon rotate={openForm} name="add" />
        </IconWrapper>
        <IconWrapper
          right
          hidden={items.length === 0}
          onClick={async () => {
            await handleDeleteItems(items);
            clearSelections();
          }}
        >
          <Icon name="delete" />
        </IconWrapper>
        <IconWrapper
          rightSecond
          hidden={items.length !== 1}
          onClick={handleEditItem}
        >
          <Icon name="edit" />
        </IconWrapper>
      </AppBarWrapper>
    )} />
  )} />
);

HomeAppBar.defaultProps = {
  main: false,
  title: '',
};

HomeAppBar.propTypes = {
  main: PropTypes.bool,
  title: PropTypes.string,
  formTitle: PropTypes.string.isRequired,
  openForm: PropTypes.bool.isRequired,
  toggleOpenForm: PropTypes.func.isRequired,
  handleDeleteItems: PropTypes.func.isRequired,
  handleEditItem: PropTypes.func.isRequired,
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
