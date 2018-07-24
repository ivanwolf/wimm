import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Container } from '../../components/Layout';
import colors from '../../config/colors';
import pkg from '../../../package.json';

const SideMenuWrapper = styled.div`
  position: fixed;
  right: 4rem;
  left: 0;
  top: 0;
  min-height: 100vh;
  transition: transform .5s ease;
  transform: translateX(-100vw);
  background-color: ${colors.white};
  z-index: 3;
  display: flex;
  flex-direction: column;
  ${({ active }) => active && css`
    transform: translateX(0);
  `}
`;

const Overlay = styled.div`
  position: absolute;
  background-color: ${colors.gray};
  top: 0;
  right: 0;
  min-height: 100vh;
  left: 0;
  opacity: 0;
  transition: opacity .5s ease;
  z-index: -1;
  ${({ active }) => active && css`
    opacity: .75;
    z-index: 2;
  `}
`;

const Avatar = styled.div`
  background-color: ${colors.violette};
  color: ${colors.white};
  height: 8rem;
  padding: 1rem;
`;

const Footer = styled.div`
  display: flex;
  padding: 1rem;
  & > div {
    flex: 1;
  }
  & > div:last-child {
    display: flex;
    justify-content: flex-end;
    color: ${colors.grayLight}
  }
`;

const SignOutButton = styled.button`
  outline: none;
  color: inherit;
  font-size: 15px;
  border: none;
  background-color: ${colors.white};
  padding: 0;
  margin: 0;
`;

const SideMenu = ({
  active, onOverlayClick, username, onSignOutClick,
}) => (
  <Fragment>
    <Overlay active={active} onClick={onOverlayClick} />
    <SideMenuWrapper active={active}>
      <Avatar>
        {username}
      </Avatar>
      <Container>
        Hola
      </Container>
      <Footer>
        <SignOutButton type="button" onClick={onSignOutClick}>
          Cerrar sesión
        </SignOutButton>
        <div>
          {`v${pkg.version}`}
        </div>
      </Footer>
    </SideMenuWrapper>
  </Fragment>
);

SideMenu.propTypes = {
  active: PropTypes.bool.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default SideMenu;
