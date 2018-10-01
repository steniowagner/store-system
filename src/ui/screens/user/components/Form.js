import React from 'react';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import styled from 'styled-components';

import Input from '../../../components/common/CustomInput';

const Wrapper = styled.div`
  width: 100%;
`;

const FloatinActionButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Section = styled.div`
  width: 100%
  margin-top: 32px;
  margin-bottom: 24px;
`;

const RowItem = styled.div`
  width: 48%;
  margin-left: 12px,
  margin-right: 18px,
`;

const SectionTitle = styled(Typography).attrs({
  variant: 'headline',
})`
  flex: 1;
  padding-bottom: 32px;
`;

type Props = {
  touched: Object,
  values: Object,
  errors: Object,
  handleChange: Function,
  handleBlur: Function,
  isSubmitting: boolean,
};

const UserForm = ({
  handleChange,
  isSubmitting,
  handleBlur,
  touched,
  values,
  errors,
}: Props): Object => (
  <Wrapper>
    <Form>
      <Section>
        <SectionTitle>
          Informações do Usuário
        </SectionTitle>
        <Row>
          <RowItem>
            <Input
              error={touched.name && errors.name}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Informe o Nome do Usuário"
              label="Nome"
              type="text"
              id="name"
            />
          </RowItem>
          <RowItem>
            <Input
              error={touched.username && errors.username}
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Informe o Usuário"
              label="Usuário"
              type="text"
              id="username"
            />
          </RowItem>
        </Row>
      </Section>
      <Section>
        <SectionTitle>
          Senha
        </SectionTitle>
        <Row>
          <RowItem>
            <Input
              error={touched.password && errors.password}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Informe a senha do Usuário"
              label="Digite a Senha"
              type="password"
              id="password"
            />
          </RowItem>
          <RowItem>
            <Input
              error={touched.passwordConfirm && errors.passwordConfirm}
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Informe a senha novamente"
              label="Repita a senha"
              type="password"
              id="passwordConfirm"
            />
          </RowItem>
        </Row>
      </Section>
      <FloatinActionButtonWrapper>
        <Button
          disabled={isSubmitting}
          type="submit"
          aria-label="Save"
          color="primary"
          variant="fab"
        >
          <SaveIcon />
        </Button>
      </FloatinActionButtonWrapper>
    </Form>
  </Wrapper>
);

const CustomForm = withFormik({
  mapPropsToValues: ({ name, username, password }) => ({
    name: name || '',
    username: username || '',
    password: password || '',
    passwordConfirm: '',
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required('O Nome é obrigatório.'),

    username: Yup.string()
      .required('O Nome de Usuário é obrigatório.'),

    password: Yup.string()
      .min(1, 'A senha deve conter no mínimo 6 caracteres.')
      .required('A senha é obrigatória.'),

    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Senhas diferentes')
      .required('As senhas precisam ser iguais.'),
  }),

  handleSubmit(values, { props }) {
    const { onCreateUser } = props;
    onCreateUser(values);
  },
})(UserForm);

export default CustomForm;
