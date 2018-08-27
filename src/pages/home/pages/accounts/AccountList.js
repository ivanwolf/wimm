import React from 'react';
import styled, { css } from 'styled-components';
import Toggle from '../../../../components/Toggle';
import Touchable from '../../../../components/Touchable';
import { SelectItemConsumer } from '../../../../components/utils/SelectItem';
import colors from '../../../../config/colors';


const InnerRow = styled.div`
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${colors.grayLight};
  height: 1.5rem;
  ${({ header }) => header && css`
    color: ${colors.grayLight};
    font-size: small;
    padding: 0 0 0.5rem 0;
  `}
`;

const RowContainer = styled.div`
  padding: 0 0.7rem;
  ${({ selected }) => selected && css`
    background-color: ${colors.selected}
  `}
`;

const Row = ({ selected, ...props}) => (
  <RowContainer selected={selected}>
    <InnerRow {...props} />
  </RowContainer>
);

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
  ${({ half }) => half && css`
    width: 2rem;
  `}
`;

const AccountList = ({
  accounts,
  handleAccountToggle,
}) => {
  return (
    <SelectItemConsumer
      render={(selectedAccounts, handleSelectAccount) => (
        <div>
          <Row header>
            <Left>Nombre</Left>
            <Right center>Balance</Right>
            <Right center>Activa</Right>
          </Row>
          {accounts.map(acc => (
            <Touchable
              key={acc.id}
              disabled={selectedAccounts.length > 0}
              onTouchSelect={() => handleSelectAccount(acc.id)}
            >
              <Row selected={selectedAccounts.includes(acc.id)}>
                <Left>{acc.name}</Left>
                <Right center>{acc.balance}</Right>
                <Right>
                  <Toggle
                    onClick={(active) => handleAccountToggle(acc.id, active)}
                    active={acc.active}
                  />
                </Right>
              </Row>
            </Touchable>
          ))}
        </div>
      )}
    />
  );
};

export default AccountList;
