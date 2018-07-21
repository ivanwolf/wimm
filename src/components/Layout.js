import styled, { css } from 'styled-components';
import colors from '../config/colors';


export const Page = styled.div`
  background-color: ${colors.white};
  color: ${colors.violetteDark};
  height: 100vh;
  display: flex;
  justify-content: center;
  ${props => props.centerContent && css`
  align-items: center;
  `}
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem;
  ${props => props.marginBottom && css`
  margin-bottom: 5rem;
  `}
`

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
