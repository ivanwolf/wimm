import React from 'react';
import styled from 'styled-components';
import colors from '../config/colors';

const Block = styled.div`
  display: flex;
  padding: 0 0.65rem;
  margin-bottom: 0.5rem;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const Content = styled.div`
  font-size: small;
  border-radius: 3px;
  background-color: ${colors.violette};
  border: 1px solid;
  padding: 3px 6px;
  color: ${colors.white};
`;


const Badge = ({ left, right }) => (
  <Block>
    <Container>
      <Content>
        {left}
      </Content>
    </Container>
    {right && (
      <Container right>
        <Content>
          {right}
        </Content>
      </Container>
    )}
  </Block>
);


export default Badge;
