import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.h1`
  font-size: 48px;
  color: #fff;
`;

type Props = {
  title: string,
};

const PageTitle = ({ title }: Props) => (
  <Wrapper>
    {title}
  </Wrapper>
);

export default PageTitle;
