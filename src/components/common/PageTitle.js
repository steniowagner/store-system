import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.h1`
  font-size: 48px;
  color: #FFF;
`;

const PageTitle = ({ title }) => (
  <Wrapper>
    {title}
  </Wrapper>
);

export default PageTitle;
