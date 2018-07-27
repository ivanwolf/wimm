import styled from 'styled-components';
import colors from '../config/colors';

export const CardHeader = styled.div`
  font-weight: 600;
  font-size: 16px;
  height: 16px;
  margin-bottom: 4px;
  color: ${({ color }) => color};
`;

export const CardItem = styled.div`
  font-size: 13px;
`;

export const Card = styled.div`
  padding: 0.65rem;
  border-radius: 3px;
  display: flex;
  margin-bottom: 0.7rem;
  border-left: 6px solid;
  background-color: ${colors.grayLighter};
`;

export const WhiteCard = Card.extend`
  background-color: ${colors.white};
  border-left: 6px solid ${colors.white};
  margin-bottom: 0;
  padding: 0.2rem 0.65rem;
`;
