// @flow

import React from 'react';
import styled from 'styled-components';

import Input from './CustomInput';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const RowItem = styled.div`
  width: 48%;
  margin-left: 12px,
  margin-right: 18px,
`;

export const Section = styled.div`
  width: 100%
  margin-top: 32px;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.span`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.darkText};
  font-size: 24px;
  font-weight: 500;
`;

export const SectionTitleWrapper = styled.div`
  margin-bottom: 24px;
`;

export const renderSectionTitle = (title: string): Object => (
  <SectionTitleWrapper>
    <SectionTitle>
      {title}
    </SectionTitle>
  </SectionTitleWrapper>
);

export const getRowItemObject = (label: string, placeholder: string, type: string, id: string): Object => ({
  placeholder,
  label,
  type,
  id,
});

type Props = {
  handleChange: Function,
  handleBlur: Function,
  touched: Object,
  errors: Object,
  values: Object,
  mode: string,
};

export const rendeRowWithSingleItem = (item: Object, props: Props): Object => {
  const {
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    mode,
  } = props;

  return (
    <Row>
      <RowItem>
        <Input
          error={touched[item.id] && errors[item.id]}
          placeholder={item.placeholder}
          disabled={mode === 'detail'}
          value={values[item.id]}
          onChange={handleChange}
          label={item.label}
          type={item.type}
          onBlur={handleBlur}
          id={item.id}
        />
      </RowItem>
    </Row>
  );
};

export const renderRowWithTwoItems = (firstItem: Object, secondItem: Object, props: Props): Object => {
  const {
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    mode,
  } = props;

  return (
    <Row>
      <RowItem>
        <Input
          error={touched[firstItem.id] && errors[firstItem.id]}
          placeholder={firstItem.placeholder}
          disabled={mode === 'detail'}
          value={values[firstItem.id]}
          onChange={handleChange}
          label={firstItem.label}
          type={firstItem.type}
          onBlur={handleBlur}
          id={firstItem.id}
        />
      </RowItem>
      <RowItem>
        <Input
          error={touched[secondItem.id] && errors[secondItem.id]}
          placeholder={secondItem.placeholder}
          disabled={mode === 'detail'}
          value={values[secondItem.id]}
          label={secondItem.label}
          onChange={handleChange}
          type={secondItem.type}
          onBlur={handleBlur}
          id={secondItem.id}
        />
      </RowItem>
    </Row>
  );
};

export const handleRepeatedFormValues = (originalDataset: Array<Object>, formValue: any, value: any, mode: string): boolean => {
  const datasetEditMode = originalDataset.filter((item) => {
    const valueToCompare = (formValue && formValue.toUpperCase());
    return item.toUpperCase() !== valueToCompare;
  });

  const dataset = (mode === 'create') ? originalDataset : datasetEditMode;

  const itemIndex = dataset.findIndex((descriptionItem) => {
    const valueToCompare = (value && value.toUpperCase());

    return descriptionItem.toUpperCase() === valueToCompare;
  });

  return itemIndex < 0;
};
