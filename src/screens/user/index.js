import React from 'react';

import PageTitle from '../../components/common/PageTitle';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';
import ButtonIcon from '../../components/common/ButtonIcon';
import Input from '../../components/common/Input';

const onClick = () => {
  console.log('click');
};

const User = () => (
  <Container>
    <Button title="Meu Botão" type="danger" onClick={onClick} />
  </Container>
);

export default User;
