import React from 'react';
import styled, { css } from 'styled-components';
import Toggle from '../../../../components/Toggle';
import colors from '../../../../config/colors';

const Row = styled.div`
  display: flex;
  margin-bottom: 1rem;
  height: 1.5rem;
  ${({ header }) => header && css`
    color: ${colors.grayLight};
    margin-bottom: 0.5rem;
    font-size: small;
  `}
`;

const AccountName = styled.div`
  font-size: large;
`;

const Left = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  width: 4rem;
  flex-direction: column;
  justify-content: center;
  ${({ center }) => center && css`
    align-items: center;
  `}
`;


const AccountList = ({ accounts, handleAccountToggle }) => (
  <div>
    <Row header>
      <Left>Nombre</Left>
      <Right center>Balance</Right>
      <Right center>Activa</Right>
    </Row>
    {accounts.map(acc => (
      <Row key={acc.id}>
        <Left>{acc.name}</Left>
        <Right center>{acc.balance}</Right>
        <Right>
          <Toggle
            onClick={(active) => handleAccountToggle(acc.id, active)}
            active={acc.active}
          />
        </Right>
      </Row>
    ))}
  </div>
);

export default AccountList;
