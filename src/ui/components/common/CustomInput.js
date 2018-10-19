import React from 'react';
import Input from '@material-ui/core/Input';

import styled from 'styled-components';

const getBorderStyle = (theme: Object, hasError: boolean): string => {
  const color = (hasError ? theme.colors.danger : theme.colors.inputBorder);

  return `1.5px solid ${color}`;
};

const InputBoxWrapper = styled.div`
  height: 50px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: 14px;
  padding-right: 14px;
  margin-bottom: 8px;
  margin-top: 8px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top: ${({ theme, hasError }) => getBorderStyle(theme, hasError)};
  border-right ${({ theme, hasError }) => getBorderStyle(theme, hasError)};
  border-bottom ${({ theme, hasError }) => getBorderStyle(theme, hasError)};
  border-left ${({ theme, hasError }) => getBorderStyle(theme, hasError)};
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.lightGray : theme.colors.white)};
`;

const TextInput = styled(Input).attrs({
  placeholder: ({ placeholder }) => placeholder,
  disableUnderline: true,
})`
  width: 100%;
`;

const Label = styled.span`
  flex: 1;
  color: ${({ theme, hasError }) => hasError && theme.colors.danger}
`;

type Props = {
  placeholder: string,
  error: string,
  label: string,
  type: string,
  id: string,
  disabled: ?boolean,
  onChange: Function,
  onBlur: Function,
  error: any,
  value: any,
};

const renderTextInput = ({
  placeholder,
  disabled,
  onChange,
  onBlur,
  error,
  value,
  type,
  id,
}: Props): Object => (
  <InputBoxWrapper
    disabled={disabled}
    hasError={!!error}
  >
    <TextInput
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      onBlur={onBlur}
      value={value}
      type={type}
      min="0"
      id={id}
    />
  </InputBoxWrapper>
);

const renderError = (error: string): Object => (
  error ? (
    <Label
      hasError={error}
    >
      {error}
    </Label>
  ) : null);

const CustomInput = ({
  placeholder,
  disabled,
  onChange,
  onBlur,
  error,
  label,
  value,
  type,
  id,
}: Props): Object => (
  <div>
    <Label
      hasError={error}
    >
      {label}
    </Label>
    {renderTextInput({
      placeholder,
      disabled,
      onChange,
      onBlur,
      error,
      value,
      type,
      id,
    })}
    {renderError(error)}
  </div>
);

export default CustomInput;
