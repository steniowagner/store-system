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

const renderNameAndBirthday = (props: Object): Object => {
  const nameFieldData = getRowItemObject('Nome', 'Informe o Nome do Cliente', 'text', 'name');
  const birthdayInputFieldData = getRowItemObject('Data de Nascimento', 'Informe a Data de Nascimento do Cliente', 'date', 'birthday');

  return renderRowWithTwoItems(nameFieldData, birthdayInputFieldData, props);
};

const renderParentsRow = (props: Object): Object => {
  const motherFieldData = getRowItemObject('Nome da Mãe', 'Informe o Nome da Mãe Cliente', 'text', 'motherName');
  const fatherInputFieldData = getRowItemObject('Nome do Pai', 'Informe o Nome do Pai do Cliente', 'text', 'fatherName');

  return renderRowWithTwoItems(motherFieldData, fatherInputFieldData, props);
};

const renderPersonalInfoSection = (props: Object): Object => (
  <Section>
    {renderSectionTitle('Informações Pessoais')}
    {renderNameAndBirthday(props)}
    {renderParentsRow(props)}
  </Section>
);

const renderIdentificationSection = (props: Object): Object => {
  const cpfInputFieldData = getRowItemObject('CPF', 'Informe o CPF do Cliente', 'text', 'cpf');
  const rgFieldData = getRowItemObject('RG', 'Informe o RG do Cliente', 'text', 'rg');

  return (
    <Section>
      {renderSectionTitle('Identificação')}
      {renderRowWithTwoItems(cpfInputFieldData, rgFieldData, props)}
    </Section>
  );
};

const renderContactSection = (props: Object): Object => {
  const landlineInputFieldData = getRowItemObject('Telefone', 'Informe o Telefone Fixo do Cliente', 'text', 'landline');
  const cellPhoneFieldData = getRowItemObject('Celular', 'Informe o Número de Celular do Cliente', 'text', 'cellPhone');
  const emailFieldData = getRowItemObject('E-mail', 'Informe o E-mail do Cliente', 'text', 'email');

  return (
    <Section>
      {renderSectionTitle('Contato')}
      {renderRowWithTwoItems(landlineInputFieldData, cellPhoneFieldData, props)}
      {rendeRowWithSingleItem(emailFieldData, props)}
    </Section>
  );
};

const renderAddressSection = (props: Object) => {
  const addressInputFieldData = getRowItemObject('Endereço', 'Informe o Endereço do Cliente', 'text', 'address');
  const neighborhoodPhoneFieldData = getRowItemObject('Bairro', 'Informe o Bairro do Cliente', 'text', 'neighborhood');
  const cityFieldData = getRowItemObject('Cidade', 'Informe a Cidade do Cliente', 'text', 'city');
  const stateFieldData = getRowItemObject('Estado', 'Informe o Estado Cliente', 'text', 'state');

  return (
    <Section>
      {renderSectionTitle('Endereço')}
      {renderRowWithTwoItems(addressInputFieldData, neighborhoodPhoneFieldData, props)}
      {renderRowWithTwoItems(cityFieldData, stateFieldData, props)}
    </Section>
  );
};

const renderObservationSection = (props: Object) => {
  const observationFieldData = getRowItemObject('', 'Informe alguma observação sobre o Usuário (caso necessário)', 'textarea', 'obs');

  return (
    <Section>
      {renderSectionTitle('Observações')}
      {rendeRowWithSingleItem(observationFieldData, props)}
    </Section>
  );
};

const CustomerForm = (props: Object): Object => {
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
        {renderPersonalInfoSection(props)}
        {renderIdentificationSection(props)}
        {renderAddressSection(props)}
        {renderContactSection(props)}
        {renderObservationSection(props)}
        <ActionFormButton
          onChageFormToEditMode={onChageFormToEditMode}
          onClick={handleSubmit}
          onRemoveItem={onRemoveItem}
          disabled={isSubmitting}
          entity="Cliente"
          canBeRemoved
          mode={mode}
        />
      </Form>
    </Wrapper>
  );
};

const CustomForm = withFormik({
  mapPropsToValues: ({ item }) => ({
    neighborhood: item.neighborhood || '',
    motherName: item.motherName || '',
    fatherName: item.fatherName || '',
    birthday: item.birthday || '',
    cellPhone: item.cellPhone || '',
    landline: item.landline || '',
    address: item.address || '',
    state: item.state || '',
    email: item.email || '',
    city: item.city || '',
    obs: item.obs || '',
    name: item.name || '',
    cpf: item.cpf || '',
    rg: item.rg || '',
  }),

  validationSchema: _props => Yup.lazy(() => Yup.object().shape({
    name: Yup.string()
      .required('O Nome é obrigatório.'),

    cpf: Yup.string()
      .required('O CPF é obrigatório.'),

    rg: Yup.string()
      .required('O RG é obrigatório.'),

    address: Yup.string()
      .required('O RG é obrigatório.'),

    landline: Yup.string()
      .required('O Telefone é obrigatório.'),

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
})(CustomerForm);

export default CustomForm;
