import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from '../../components/Layout';
import { CleanButton } from '../../components/Input';
import colors from '../../config/colors';
import pkg from '../../../package.json';
import { OpenMenuConsumer } from '../../components/utils/OpenMenu';
import withUser from '../../hocs/userContext';

const SideMenuWrapper = styled.div`
  position: fixed;
  right: 4rem;
  left: 0;
  top: 0;
  min-height: 100vh;
  transition: transform .5s ease;
  transform: translateX(-100vw);
  background-color: ${colors.white};
  z-index: 4;
  display: flex;
  flex-direction: column;
  ${({ active }) => active && css`
    transform: translateX(0);
  `}
`;

const Overlay = styled.div`
  position: fixed;
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
    z-index: 4;
  `}
`;

const Avatar = styled.div`
  background-color: ${colors.violette};
  color: ${colors.white};
  height: 8rem;
  display: flex;
  align-items: center;
  padding: 1.2rem;
  font-size: x-large;
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
  justify-content: center;
  height 2.5rem;
  padding: 0 .5rem;
  border-radius: 3px;
  flex-direction: column;
  margin-bottom: 0.7rem;
  & > div {
    font-size: 12px;
    color: ${colors.gray};
  }
  ${({ disabled }) => disabled && css`
    color: ${colors.grayLight};
    & > div {
      color: ${colors.grayLight}
    }
  `}
  ${({ selected }) => selected && css`
    font-weight: 500;
    background-color: ${colors.violette};
    color: ${colors.white};
    & > div {
      color: ${colors.white}
    }
  `}
`;

const SignOutButton = CleanButton.extend`
  font-size: 15px;
  padding: 0 0.5rem;
  color: ${colors.violette};
`;


const Link = withRouter(({
  history, to, location, children, message, disabled
}) => (
  <OpenMenuConsumer
    render={(open, toggleMenu) => (
      <Fragment>
        <StyledLink
          onClick={() => {
            if (!disabled) {
              history.push(to);
              toggleMenu();
            }
          }}
          disabled={disabled}
          selected={location.pathname === to}
        >
          {children}
          <div>
            {message}
          </div>
        </StyledLink>
      </Fragment>
    )}
  />
));


const SideMenu = ({ user, onSignOutClick }) => (
  <OpenMenuConsumer
    render={(active, toggleMenu) => (
      <Fragment>
        <Overlay active={active} onClick={toggleMenu} />
        <SideMenuWrapper active={active}>
          <Avatar>
            {`Hola ${user.displayName}`}
          </Avatar>
          <Container verticalPadding>
            <Link to="/home" message="Balance e historial de actividades">
              Movimientos
            </Link>
            <Link to="/home/add_founds" message="Registra tus ingresos">
              Añadir fondos
            </Link>
            <Link to="/home/transfer" message="Traspasa fondos de una cuenta a otra">
              Transferir entre cuentas
            </Link>
            <Link to="/home/accounts" message="Configura tus cuentas">
              Cuentas
            </Link>
            <Link to="/home/categories" message="Configura tus categorías">
              Categorías
            </Link>
            <Link to="/home/stats" disabled message="Resumen por día, semana y mes">
              Estadísticas
            </Link>
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
    )}
  />
);


SideMenu.propTypes = {
  onSignOutClick: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default withUser(SideMenu);
