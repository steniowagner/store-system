import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import ActionFormButton from '../../../components/common/ActionFormButton';
import ChangePassword from './components/ChangePassword';

import {
  handleRepeatedFormValues,
  renderRowWithTwoItems,
  renderSectionTitle,
  getRowItemObject,
  Section,
  Wrapper,
  Row,
} from '../../../components/common/FormUtils';

const EditPasswordButtonWrapper = styled.div`
  display: block;
`;

type Props = {
  onChageFormToEditMode: Function,
  onEditPassword: Function,
  handleSubmit: Function,
  onRemoveItem: Function,
  isSubmitting: boolean,
  item: Object,
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

  renderPasswordSection = (): Object => {
    const passwordConfirmInputFieldData = getRowItemObject('Digite a Senha Novamente', 'Informe a Senha do Usuário Novamente', 'password', 'passwordConfirm');
    const passwordInputFieldData = getRowItemObject('Digite a Senha', 'Informe a Senha do Usuário', 'password', 'password');

    return (
      <Section>
        {renderSectionTitle('Senha')}
        {renderRowWithTwoItems(passwordInputFieldData, passwordConfirmInputFieldData, this.props)}
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
    const nameInputFieldData = getRowItemObject('Nome', 'Informe o Nome do Usuário', 'text', 'name');
    const usernameInputFieldData = getRowItemObject('Usuário', 'Informe o Nome de Usuário', 'text', 'username');

    return (
      <Section>
        {renderSectionTitle('Informações do Usuário')}
        {renderRowWithTwoItems(nameInputFieldData, usernameInputFieldData, this.props)}
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
              entity="Usuário"
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

  validationSchema: ({ item, usernames, mode }) => Yup.lazy(() => Yup.object().shape({
    name: Yup.string()
      .required('O Nome é obrigatório.'),

    username: Yup.string()
      .test('username-repeated', 'Este Usuário já foi cadastrado', (value) => {
        const { username } = item;
        return handleRepeatedFormValues(usernames, username, value, mode);
      })
      .required('O Nome de Usuário é obrigatório.'),

    ...getPasswordValidation(mode),
  })),

  handleSubmit(values, { setSubmitting, props }) {
    const { onCreateItem, onEditItem, mode } = props;

    const properCallback = (mode === 'edit' ? onEditItem : onCreateItem);

    properCallback({
      name: values.name,
      username: values.username,
      password: values.password,
    });

    setSubmitting(false);
  },
})(UserForm);

export default CustomForm;
