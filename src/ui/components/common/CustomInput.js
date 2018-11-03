// @flow

import React from 'react';

import Input from '@material-ui/core/Input';
import styled from 'styled-components';

const Wrapper = styled.div``;

const TextAreaContainer = styled.div`
  background-color: ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.lightGray)};
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
  const { error } = props;

  const inputProps = {
    ...props,
  };

  delete inputProps.error;

  return (
    <TextAreaContainer
      error={error}
    >
      <TextAreaWrapper>
        <Input
          disableUnderline
          {...inputProps}
          rowsMax={10}
          fullWidth
          multiline
          rows={5}
        />
      </TextAreaWrapper>
    </TextAreaContainer>
  );
};

const SingleLineInput = styled(({ ...props }) => {
  const inputProps = {
    ...props,
  };

  delete inputProps.error;

  return (
    <Input
      disableUnderline
      {...inputProps}
    />
  );
})`
  width: 100%;
  height: 48px;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  margin: 8px 0;
  border: 1.5px solid ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.inputBorder)};
  border-radius: 4px;
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.lightGray : theme.colors.white)};
`;

const Label = styled.span`
  margin-bottom: 4px;
  color: ${({ theme, error }) => error && theme.colors.danger}
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
    placeholder,
    autoFocus,
    disabled,
    onChange,
    onBlur,
    value,
    error,
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
      error={error}
    >
      {error}
    </Label>
  ) : null);

const CustomInput = (props: Object): Object => {
  const { error, label, type } = props;

  return (
    <Wrapper>
      <Label
        error={error}
      >
        {label}
      </Label>
      {(type === 'textarea') ? renderMultiLineInput({ ...props }) : renderSingleLineInput({ ...props })}
      {renderError(error)}
    </Wrapper>
  );
};

export default CustomInput;
