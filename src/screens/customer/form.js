import React from 'react';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import {
  handleRepeatedFormValues,
  rendeRowWithSingleItem,
  renderRowWithTwoItems,
  renderSectionTitle,
  getRowItemObject,
  Section,
  Wrapper,
} from '../../components/common/FormUtils';

import ActionFormButton from '../../components/common/ActionFormButton';
import Debits from './components/Debits';

const renderNameAndBirthday = (props: Object): Object => {
  const nameFieldData = getRowItemObject('Name', 'Enter the Name of the Customer', 'text', 'name');
  const birthdayInputFieldData = getRowItemObject('Birth Date', 'Enter the Birth Date', 'date', 'birthday');

  return renderRowWithTwoItems(nameFieldData, birthdayInputFieldData, props);
};

const renderParentsRow = (props: Object): Object => {
  const motherFieldData = getRowItemObject('Mother\'s Name', 'Enter the Mothers\'s Name', 'text', 'motherName');
  const fatherInputFieldData = getRowItemObject('Father\'s Name', 'Enter the Father\'s name', 'text', 'fatherName');

  return renderRowWithTwoItems(motherFieldData, fatherInputFieldData, props);
};

const renderPersonalInfoSection = (props: Object): Object => (
  <Section>
    {renderSectionTitle('Personal Information')}
    {renderNameAndBirthday(props)}
    {renderParentsRow(props)}
  </Section>
);

const renderIdentificationSection = (props: Object): Object => {
  const cpfInputFieldData = getRowItemObject('CPF', 'Enter the CPF', 'text', 'cpf');
  const rgFieldData = getRowItemObject('RG', 'Enter the RG', 'text', 'rg');

  return (
    <Section>
      {renderSectionTitle('Identification')}
      {renderRowWithTwoItems(cpfInputFieldData, rgFieldData, props)}
    </Section>
  );
};

const renderContactSection = (props: Object): Object => {
  const landlineInputFieldData = getRowItemObject('Landline', 'Enter the Landline Number', 'text', 'landline');
  const cellPhoneFieldData = getRowItemObject('Cellphone', 'Enter the Cellphone Number', 'text', 'cellPhone');
  const emailFieldData = getRowItemObject('E-mail', 'Enter the E-mail', 'text', 'email');

  return (
    <Section>
      {renderSectionTitle('Contact')}
      {renderRowWithTwoItems(landlineInputFieldData, cellPhoneFieldData, props)}
      {rendeRowWithSingleItem(emailFieldData, props)}
    </Section>
  );
};

const renderAddressSection = (props: Object) => {
  const addressInputFieldData = getRowItemObject('Address', 'Enter the Address', 'text', 'address');
  const neighborhoodPhoneFieldData = getRowItemObject('Neighborhood', 'Enter the Neighborhood', 'text', 'neighborhood');
  const cityFieldData = getRowItemObject('City', 'Enter the City', 'text', 'city');
  const stateFieldData = getRowItemObject('State', 'Enter the State', 'text', 'state');

  return (
    <Section>
      {renderSectionTitle('Address')}
      {renderRowWithTwoItems(addressInputFieldData, neighborhoodPhoneFieldData, props)}
      {renderRowWithTwoItems(cityFieldData, stateFieldData, props)}
    </Section>
  );
};

const renderObservationSection = (props: Object) => {
  const observationFieldData = getRowItemObject('', 'If necessary, enter with some extra information about Customer', 'textarea', 'obs');

  return (
    <Section>
      {renderSectionTitle('Observations')}
      {rendeRowWithSingleItem(observationFieldData, props)}
    </Section>
  );
};

const renderCustomerDebits = (values: Object, mode: string): any => {
  const isDetailMode = (mode === 'detail');

  return isDetailMode && (
    <Section>
      {renderSectionTitle('Debits')}
      <Debits
        {...values}
      />
    </Section>
  );
};

const CustomerForm = (props: Object): Object => {
  const {
    onChageFormToEditMode,
    isSubmitting,
    onRemoveItem,
    handleSubmit,
    values,
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
        {renderCustomerDebits(values, mode)}
        <ActionFormButton
          onChageFormToEditMode={onChageFormToEditMode}
          onClick={handleSubmit}
          onRemoveItem={onRemoveItem}
          disabled={isSubmitting}
          entity="Customer"
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
    id: item.id || null,
    rg: item.rg || '',
  }),

  validationSchema: ({
    cpfsRegistered,
    rgsRegistered,
    item,
    mode,
  }) => Yup.lazy(() => Yup.object().shape({
    name: Yup.string()
      .required('The name is required.'),

    cpf: Yup.string()
      .test('cpf-repeated', 'This CPF has already been registered', (value) => {
        const { cpf } = item;
        return handleRepeatedFormValues(cpfsRegistered, cpf, value, mode);
      }),

    rg: Yup.string()
      .test('rg-repeated', 'This RG has already been registered', (value) => {
        const { rg } = item;
        return handleRepeatedFormValues(rgsRegistered, rg, value, mode);
      }),

    email: Yup.string()
      .email('Invalid E-mail.'),
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
