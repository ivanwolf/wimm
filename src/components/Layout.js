import styled, { css } from 'styled-components';
import colors from '../config/colors';


export const Page = styled.div`
  background-color: ${colors.white};
  color: ${colors.violetteDark};
  height: 100vh;
  display: flex;
  justify-content: center;
  ${({ centerContent }) => centerContent && css`
    align-items: center;
  `}
  ${({ column }) => column && css`
    flex-direction: column;
  `}
  ${({ marginBottom }) => marginBottom && css`
    margin-bottom: 5rem;
  `}
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 0.7rem;
  ${({ marginBottom }) => marginBottom && css`
    margin-bottom: 5rem;
  `}
  ${({ marginTop }) => marginTop && css`
    margin-top: 4rem;
  `}
  ${({ centerContent }) => centerContent && css`
    align-items: center;
  `}
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${({ flex }) => flex || '1'};
`;

export const Row = styled.div`
  display: flex;
`;

