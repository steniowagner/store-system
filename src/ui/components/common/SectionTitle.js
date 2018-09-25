import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Roboto';
  font-style: bold;
  font-display: swap;
  font-weight: 500;
  font-size: 3em;
`;

type Props = {
  title: String,
};

const SectionTitle = ({ title }: Props): Object => (
  <Title>
    {title}
  </Title>
);

export default SectionTitle;
