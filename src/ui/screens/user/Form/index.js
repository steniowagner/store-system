import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import Input from '../../../components/common/CustomInput';

import ActionFormButton from '../../../components/common/ActionFormButton';
import ChangePassword from './components/ChangePassword';

const Wrapper = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const RowItem = styled.div`
  width: 48%;
  margin-left: 12px,
  margin-right: 18px,
`;

const Section = styled.div`
  width: 100%
  margin-top: 32px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.span`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 24px;
  font-weight: 500;
`;

const SectionTitleWrapper = styled.div`
  margin-bottom: 24px;
`;

const EditPasswordButtonWrapper = styled.div`
  display: block;
`;

type Props = {
  onChageFormToEditMode: Function,
  onEditPassword: Function,
  handleChange: Function,
  handleSubmit: Function,
  onRemoveItem: Function,
  handleBlur: Function,
  touched: Object,
  values: Object,
  errors: Object,
  item: Object,
  isSubmitting: boolean,
  mode: string,
};

type State = {
  isPasswordDialogOpen: boolean,
};

class UserForm extends Component<Props, State> {
  state = {
    isPasswordDialogOpen: false,
  };

  onTogglePassowordDialog = (): void => {
    const { isPasswordDialogOpen } = this.state;

    this.setState({
      isPasswordDialogOpen: !isPasswordDialogOpen,
    });
  };

  onChangePassword = (newPassword: string): void => {
    const { onEditPassword } = this.props;

    this.setState({
      isPasswordDialogOpen: false,
    }, () => onEditPassword(newPassword));
  };

  renderSectionTitleWrapper = (title: string): Object => (
    <SectionTitleWrapper>
      <SectionTitle>
        {title}
      </SectionTitle>
    </SectionTitleWrapper>
  );

  renderPasswordSection = (): Object => {
    const {
      handleChange,
      handleBlur,
      touched,
      errors,
      values,
      mode,
    } = this.props;

    return (
      <Section>
        {this.renderSectionTitleWrapper('Senha')}
        <Row>
          <RowItem>
            <Input
              error={touched.password && errors.password}
              disabled={mode === 'detail'}
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
              disabled={mode === 'detail'}
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Informe a senha novamente"
              label="Digite a senha novamente"
              type="password"
              id="passwordConfirm"
            />
          </RowItem>
        </Row>
      </Section>
    );
  };

  renderEditPasswordButton = (): Object => (
    <EditPasswordButtonWrapper>
      <Button
        onClick={() => this.onTogglePassowordDialog()}
        disableRipple
        color="primary"
        variant="contained"
        size="large"
      >
        Editar Senha
      </Button>
    </EditPasswordButtonWrapper>
  );

  renderUserInfoSection = (): Object => {
    const {
      handleChange,
      handleBlur,
      touched,
      errors,
      values,
      mode,
    } = this.props;

    return (
      <Section>
        {this.renderSectionTitleWrapper('Informações do Usuário')}
        <Row>
          <RowItem>
            <Input
              error={touched.name && errors.name}
              disabled={mode === 'detail'}
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
              disabled={mode === 'detail'}
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
    );
  };

  render() {
    const {
      onChageFormToEditMode,
      onRemoveItem,
      handleSubmit,
      isSubmitting,
      item,
      mode,
    } = this.props;

    const { isPasswordDialogOpen } = this.state;

    return (
      <Wrapper>
        <Form>
          {this.renderUserInfoSection()}
          {mode === 'create' && this.renderPasswordSection()}
          <Row>
            {mode === 'edit' && this.renderEditPasswordButton()}
            <ActionFormButton
              onChageFormToEditMode={onChageFormToEditMode}
              onRemoveItem={onRemoveItem}
              disabled={isSubmitting}
              onClick={handleSubmit}
              mode={mode}
            />
          </Row>
          <ChangePassword
            onChangePassword={this.onChangePassword}
            onClose={this.onTogglePassowordDialog}
            isOpen={isPasswordDialogOpen}
            realPassword={item.password}
          />
        </Form>
      </Wrapper>
    );
  }
}

const getPasswordValidation = (mode: string): Object => {
  if (mode === 'create') {
    return {
      password: Yup.string()
        .min(6, 'A senha deve conter no mínimo 6 caracteres.')
        .required('A senha é obrigatória.'),

      passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas diferentes')
        .required('As senhas precisam ser iguais.'),
    };
  }

  return {};
};

const CustomForm = withFormik({
  mapPropsToValues: ({ item }) => ({
    name: item.name || '',
    username: item.username || '',
    password: '',
    passwordConfirm: '',
  }),

  validationSchema: _props => Yup.lazy(() => Yup.object().shape({
    name: Yup.string()
      .required('O Nome é obrigatório.'),

    username: Yup.string()
      .required('O Nome de Usuário é obrigatório.'),

    ...getPasswordValidation(_props.mode),
  })),

  handleSubmit(values, { setSubmitting, props }) {
    const { onCreateItem, onEditItem, mode } = props;

    const properCallback = (mode === 'edit' ? onEditItem : onCreateItem);

    properCallback({
      ...values,
    });

    setSubmitting(false);
  },
})(UserForm);

export default CustomForm;
