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

const renderNameSection = (props: Object): Object => {
  const nameInputFieldData = getRowItemObject('Name', 'The Name is required.', 'text', 'name');

  return (
    <Section>
      {renderSectionTitle('About Provider')}
      {rendeRowWithSingleItem(nameInputFieldData, props)}
    </Section>
  );
};

const renderAddressSection = (props: Object): Object => {
  const neighboorhoodFieldData = getRowItemObject('Neighborhood', 'Enter the Neighborhood', 'text', 'neighborhood');
  const addressFieldData = getRowItemObject('Address', 'Enter the Address', 'text', 'address');
  const stateFieldData = getRowItemObject('State', 'Enter the State', 'text', 'state');
  const cityFieldData = getRowItemObject('City', 'Enter the City', 'text', 'city');

  return (
    <Section>
      {renderSectionTitle('Location')}
      {renderRowWithTwoItems(addressFieldData, neighboorhoodFieldData, props)}
      {renderRowWithTwoItems(cityFieldData, stateFieldData, props)}
    </Section>
  );
};

const renderContactSection = (props: Object): Object => {
  const phone1FieldData = getRowItemObject('Phone 1', 'Enter the Phone', 'number', 'phone1');
  const phone2FieldData = getRowItemObject('Phone 2', 'Enter with other Phone', 'number', 'phone2');
  const emailFieldData = getRowItemObject('E-mail', 'Enter the E-mail', 'text', 'email');

  return (
    <Section>
      {renderSectionTitle('Contact')}
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
          entity="Provider"
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
    address: item.address || '',
    phone1: item.phone1 || '',
    phone2: item.phone2 || '',
    email: item.email || '',
    state: item.state || '',
    name: item.name || '',
    city: item.city || '',
  }),

  validationSchema: ({ item, providersNames, mode }) => Yup.lazy(() => Yup.object().shape({
    name: Yup.string()
      .test('name-repeated', 'This Provider has already been registered.', (value) => {
        const { name } = item;
        return handleRepeatedFormValues(providersNames, name, value, mode);
      })
      .required('The Name is required.'),

    email: Yup.string()
      .email('E-mail is Invalid.'),
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
