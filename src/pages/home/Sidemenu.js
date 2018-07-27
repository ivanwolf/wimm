import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from '../../components/Layout';
import { CleanButton } from '../../components/Input';
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
  padding: 0.7rem;
`;

const Footer = styled.div`
  display: flex;
  padding: 0.7rem;
  & > div {
    flex: 1;
  }
  & > div:last-child {
    display: flex;
    justify-content: flex-end;
    color: ${colors.grayLight}
  }
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  height 2.5rem;
  padding: 0 .5rem;
  border-radius: 3px;
  ${({ selected }) => selected && css`
    font-weight: 500;
    background-color: ${colors.violette};
    color: ${colors.white};
  `}
`;

const SignOutButton = CleanButton.extend`
  font-size: 15px;
  padding: 0 0.5rem;
`;

const FunctionContext = React.createContext(() => {});

const InnerLink = ({
  history, to, location, children,
}) => (
  <FunctionContext.Consumer>
    {closeMenu => (
      <StyledLink
        onClick={() => {
          history.push(to);
          closeMenu();
        }}
        selected={location.pathname === to}
      >
        {children}
      </StyledLink>
    )}
  </FunctionContext.Consumer>
);

const Link = withRouter(InnerLink);

const SideMenu = ({
  active, onOverlayClick, username, onSignOutClick,
}) => (
  <Fragment>
    <Overlay active={active} onClick={onOverlayClick} />
    <SideMenuWrapper active={active}>
      <Avatar>
        {username}
      </Avatar>
      <FunctionContext.Provider value={onOverlayClick}>
        <Container verticalPadding>
          <Link to="/">
            Movimientos
          </Link>
          <Link to="/add_founds">
            Añadir fondos
          </Link>
          <Link to="/settings">
            Configuración
          </Link>
        </Container>
      </FunctionContext.Provider>
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
