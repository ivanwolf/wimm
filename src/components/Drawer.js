import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Container } from './Layout';
import colors from '../config/colors';


export const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  min-height: 100vh;
  transition: transform .5s ease;
  transform: translateX(100vw);
  background-color: ${colors.white};
  ${({ active }) => active && css`
    transform: translateX(0);
  `}
`;


const Drawer = ({ active, children }) => (
  <DrawerWrapper active={active}>
    <Container marginTop>
      {children}
    </Container>
  </DrawerWrapper>
);

Drawer.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Drawer;
