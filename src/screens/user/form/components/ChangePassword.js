// @flow

import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import { withFormik, Form } from 'formik';
import * as Yup from 'yup';

import styled from 'styled-components';

import Input from '../../../../components/common/CustomInput';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RowItem = styled.div`
  width: 48%;
  margin-left: 12px,
  margin-right: 18px,
`;

const Section = styled.div`
  width: 100%
  margin-top: 32px;
`;

const renderActionButtons = (resetForm: Function, onClose: Function, handleSubmit: Function, isSubmitting: boolean): Object => (
  <DialogActions>
    <Button
      onClick={() => {
        resetForm();
        onClose();
      }}
      color="primary"
    >
      Cancel
    </Button>
    <Button
      disabled={isSubmitting}
      onClick={() => handleSubmit()}
      color="primary"
    >
      Confirm
    </Button>
  </DialogActions>
);

const renderNewPasswordSection = (touched: Object, errors: Object, handleChange: Function, handleBlur: Function): Object => (
  <Section>
    <Row>
      <RowItem>
        <Input
          error={touched.newPassword && errors.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter the new Password"
          label="New Password"
          type="password"
          id="newPassword"
        />
      </RowItem>
      <RowItem>
        <Input
          error={touched.newPasswordConfirm && errors.newPasswordConfirm}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Repeat the Password"
          label="Enter the Password again"
          type="password"
          id="newPasswordConfirm"
        />
      </RowItem>
    </Row>
  </Section>
);

type Props = {
  handleChange: Function,
  handleSubmit: Function,
  handleReset: Function,
  handleBlur: Function,
  isSubmitting: boolean,
  touched: boolean,
  isOpen: boolean,
  onClose: Function,
  errors: Object,
};

const ChangePassword = ({
  isSubmitting,
  handleChange,
  handleSubmit,
  handleReset,
  handleBlur,
  onClose,
  touched,
  errors,
  isOpen,
}: Props): Object => (
  <Dialog
    aria-labelledby="form-dialog-title"
    onClose={() => onClose}
    disableBackdropClick
    keepMounted={false}
    open={isOpen}
  >
    <DialogTitle id="form-dialog-title">
      Change Password
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        To change password, you need to enter with your current password to create a new password.
      </DialogContentText>
      <Form>
        <Section>
          <RowItem>
            <Input
              error={touched.currentPassword && errors.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter the current Password"
              label="Current Password"
              type="password"
              id="currentPassword"
            />
          </RowItem>
        </Section>
      </Form>
      {renderNewPasswordSection(touched, errors, handleChange, handleBlur)}
    </DialogContent>
    {renderActionButtons(handleReset, onClose, handleSubmit, isSubmitting)}
  </Dialog>
);

const ChangePasswordForm = withFormik({
  mapPropsToValues: ({ realPassword }) => ({
    newPasswordConfirm: '',
    currentPassword: '',
    newPassword: '',
    realPassword,
  }),

  validationSchema: Yup.object().shape({
    currentPassword: Yup.string()
      .oneOf([Yup.ref('realPassword'), null], 'Senha incoreta')
      .required('The current Password is required.'),

    newPassword: Yup.string()
      .min(6, 'The Password might have at least 6 characters.')
      .required('The Password is required.'),

    newPasswordConfirm: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords are different')
      .required('The Passwords might be equal.'),
  }),

  handleSubmit(values, { setSubmitting, props }) {
    const { onChangePassword } = props;
    const { newPassword } = values;

    onChangePassword(newPassword);
    setSubmitting(false);
  },
})(ChangePassword);

export default ChangePasswordForm;
