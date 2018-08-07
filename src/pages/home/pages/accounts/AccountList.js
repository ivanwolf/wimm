import React from 'react';
import styled from 'styled-components';
import Toggle from '../../../../components/Toggle';

const AccountWrapper = styled.div`
  display: flex;
  padding: 0.75rem 0;
`;

const AccountName = styled.div`
  font-size: large;
`;

const AccountToggle = styled.div`
`;


const AccountRow = ({ account }) => (
  <AccountWrapper>
    <AccountName>{account.name}</AccountName>
    <AccountToggle>
      <Toggle active={account.active} />
    </AccountToggle>
  </AccountWrapper>
);

const AccountList = ({ accounts, selected }) => (
  accounts.map(acc => (
    <AccountRow key={acc.id} account={acc} />
  ))
);

export default AccountList;
