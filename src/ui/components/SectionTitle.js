import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Roboto';
  font-style: bold;
  font-display: swap;
  font-weight: 600;
  font-size: 3em;
`;

type Props = {
  children: String,
};

const SectionTitle = ({ children }: Props): Object => (
  <Title>
    {children}
  </Title>
);

export default SectionTitle;
