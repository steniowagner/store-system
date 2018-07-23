import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  background-color: #000;
  overflow-x: hidden;
  width: 300px;
  position: fixed;
  bottom: 0;
  top: 0;
`;

const Wrapper = styled.nav`
  background-color: #F00;
  padding-top: 80px;
`;

const ItemWrapper = styled.a.attrs({
  display: 'block',
})``;

const ItemText = styled.h1`
  background-color: #0FF;
  padding: 18px 64px;
`;

const Sidebar = () => (
  <Container>
    <Wrapper>
      <ItemWrapper>
        <ItemText>Usuários</ItemText>
      </ItemWrapper>
    </Wrapper>
  </Container>
);

export default Sidebar;