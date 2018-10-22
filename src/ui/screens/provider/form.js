import React from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import {
  rendeRowWithSingleItem,
  renderRowWithTwoItems,
  renderSectionTitle,
  getRowItemObject,
  Section,
  Wrapper,
} from '../../components/common/FormUtils';

import ActionFormButton from '../../components/common/ActionFormButton';

const renderNameSection = (props: Object): Object => {
  const nameInputFieldData = getRowItemObject('Nome', 'Informe o Nome do Fornecedor', 'text', 'name');

  return (
    <Section>
      {renderSectionTitle('Sobre o Fornecedor')}
      {rendeRowWithSingleItem(nameInputFieldData, props)}
    </Section>
  );
};

const renderAddressSection = (props: Object): Object => {
  const neighboorhoodFieldData = getRowItemObject('Bairro', 'Informe o Bairro do Fornecedor', 'text', 'neighborhood');
  const addressFieldData = getRowItemObject('Endereço', 'Informe o Endereço do Fornecedor', 'text', 'address');
  const stateFieldData = getRowItemObject('Estado', 'Informe o Estado do Fornecedor', 'text', 'state');
  const cityFieldData = getRowItemObject('Cidade', 'Informe a Cidade do Fornecedor', 'text', 'city');

  return (
    <Section>
      {renderSectionTitle('Localização')}
      {renderRowWithTwoItems(addressFieldData, neighboorhoodFieldData, props)}
      {renderRowWithTwoItems(cityFieldData, stateFieldData, props)}
    </Section>
  );
};

const renderContactSection = (props: Object): Object => {
  const phone1FieldData = getRowItemObject('Telefone', 'Informe o Número de Telefone', 'number', 'phone1');
  const phone2FieldData = getRowItemObject('Telefone', 'Informe um outro Número de Telefone', 'number', 'phone2');
  const emailFieldData = getRowItemObject('E-mail', 'Informe o E-mail do Fornecedor', 'text', 'email');

  return (
    <Section>
      {renderSectionTitle('Contato')}
      {renderRowWithTwoItems(phone1FieldData, phone2FieldData, props)}
      {rendeRowWithSingleItem(emailFieldData, props)}
    </Section>
  );
};

const ProviderForm = (props: Object): Object => {
  const {
    onChageFormToEditMode,
    isSubmitting,
    onRemoveItem,
    handleSubmit,
    mode,
  } = props;

  return (
    <Wrapper>
      <Form>
        {renderNameSection(props)}
        {renderAddressSection(props)}
        {renderContactSection(props)}
        <ActionFormButton
          onChageFormToEditMode={onChageFormToEditMode}
          onClick={handleSubmit}
          onRemoveItem={onRemoveItem}
          disabled={isSubmitting}
          mode={mode}
        />
      </Form>
    </Wrapper>
  );
};

const CustomForm = withFormik({
  mapPropsToValues: ({ item }) => ({
    neighborhood: item.neighborhood || '',
    address: item.address || '',
    phone1: item.phone1 || '',
    phone2: item.phone2 || '',
    email: item.email || '',
    state: item.state || '',
    name: item.name || '',
    city: item.city || '',
  }),

  validationSchema: _props => Yup.lazy(() => Yup.object().shape({
    name: Yup.string()
      .required('O Nome é obrigatório.'),

    address: Yup.string()
      .required('O Endereço do Fornecedor é obrigatório.'),

    phone1: Yup.string()
      .required('Ao menos um Telefone deve ser Informado.'),

    email: Yup.string()
      .email('E-mail inválido.'),
  })),

  handleSubmit(values, { setSubmitting, props }) {
    const { onCreateItem, onEditItem, mode } = props;

    const properCallback = (mode === 'edit' ? onEditItem : onCreateItem);

    properCallback({
      ...values,
    });

    setSubmitting(false);
  },
})(ProviderForm);

export default CustomForm;
