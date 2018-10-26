// @flow

import React from 'react';

import Input from '@material-ui/core/Input';
import styled from 'styled-components';

const Wrapper = styled.div``;

const TextAreaContainer = styled.div`
  background-color: ${({ theme, hasError }) => (hasError ? theme.colors.danger : theme.colors.lightGray)};
  border-color: ${({ theme }) => theme.colors.inputBorder};
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border-width: 1.5px;
  margin: 8px 0;
  padding: 3px;
`;

const TextAreaWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.inputBorder};
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-width: 1.5px;
  padding: 8px;
`;

const MultiLineInput = (props: Object) => {
  const { hasError } = props;

  return (
    <TextAreaContainer
      hasError={hasError}
    >
      <TextAreaWrapper>
        <Input
          inputType="textarea"
          disableUnderline
          rowsMax={10}
          {...props}
          fullWidth
          multiline
          rows={5}
        />
      </TextAreaWrapper>
    </TextAreaContainer>
  );
};

const SingleLineInput = styled(({ ...props }) => (
  <Input
    disableUnderline
    {...props}
  />
))`
  width: 100%;
  height: 48px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  margin: 8px 0;
  border: 1.5px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger : theme.colors.inputBorder)};
  border-radius: 4px;
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.lightGray : theme.colors.white)};
`;

const Label = styled.span`
  margin-bottom: 4px;
  color: ${({ theme, hasError }) => hasError && theme.colors.danger}
`;

const renderSingleLineInput = (props: Object): Object => (
  <SingleLineInput
    {...props}
  />
);

const renderMultiLineInput = (props: Object): Object => {
  const {
    placeholder,
    autoFocus,
    disabled,
    onChange,
    onBlur,
    value,
    error,
    id,
  } = props;

  const multiLineProps = {
    hasError: error,
    placeholder,
    autoFocus,
    disabled,
    onChange,
    onBlur,
    value,
    id,
  };

  return (
    <MultiLineInput
      {...multiLineProps}
    />
  );
};

const renderError = (error: string): Object => (
  error ? (
    <Label
      hasError={error}
    >
      {error}
    </Label>
  ) : null);

const CustomInput = (props: Object): Object => {
  const { error, label, type } = props;

  const isTextareaInput = (type === 'textarea');

  return (
    <Wrapper>
      <Label
        hasError={error}
      >
        {label}
      </Label>
      {isTextareaInput
        ? renderMultiLineInput({ ...props, hasError: error })
        : renderSingleLineInput({ ...props, hasError: error })}
      {renderError(error)}
    </Wrapper>
  );
};

export default CustomInput;
