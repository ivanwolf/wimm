import React from 'react';
import styled, { css } from 'styled-components';
import colors from '../config/colors';
import Icon from './Icon';
import { CleanButton } from './Input';

const AlertWrapper = styled.div`
  border-radius: 5px;
  padding: 0.65rem;
  display: flex;
  align-items: center;
  background-color: ${colors.green};
  color: ${colors.white};
  & > div {
    flex: 2;
  }
  & > button {
    display: flex;
    justify-content: flex-end;
  }
`;


const Alert = ({ message, success, handleClose }) => (
  <AlertWrapper success={success}>
    <div>
      {message}
    </div>
    <CleanButton onClick={handleClose}>
      <Icon name="close" />
    </CleanButton>
  </AlertWrapper>
);

export default Alert;
