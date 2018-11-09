// @flow

import React from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Money from '@material-ui/icons/AttachMoney';

import styled from 'styled-components';

import Input from '../../../../../../../components/common/CustomInput';

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.inputBorder};
`;

const InputWrapper = styled.div`
  width: 60%;
`;

const MoneyIcon = styled(({ ...props }) => (
  <Money
    {...props}
  />
))`
  color: ${({ theme }) => theme.colors.white}
`;

const renderSlide = (props: Object): Object => (
  <Slide
    direction="up"
    {...props}
  />
);

const renderTitle = (): Object => (
  <DialogTitle
    id="alert-dialog-slide-title"
  >
    Dinheiro em Caixa
  </DialogTitle>
);

const renderInitialMoneyInput = (onTypeInitialMoney: Function, initialMoney: string): Object => (
  <Input
    onChange={event => onTypeInitialMoney(event.target.value)}
    value={initialMoney}
    onBlur={() => {}}
    id="initial-money"
    placeholder=""
    type="number"
    autoFocus
    error=""
  />
);

const renderContentText = (): Object => (
  <DialogContentText>
    Para iniciar as operações, informe a quantidade inicial de dinheiro em Caixa.
  </DialogContentText>
);

const renderContent = (onTypeInitialMoney: Function, initialMoney: string): Object => (
  <DialogContent>
    {renderContentText()}
    <ContentWrapper>
      <IconWrapper>
        <MoneyIcon />
      </IconWrapper>
      <InputWrapper>
        {renderInitialMoneyInput(onTypeInitialMoney, initialMoney)}
      </InputWrapper>
    </ContentWrapper>
  </DialogContent>
);

const renderButtonsActions = (onToggleInitialMoneyDialog: Function, onSetInitialMoney: Function, initialMoney: string): Object => (
  <DialogActions>
    <Button
      onClick={onToggleInitialMoneyDialog}
      color="primary"
    >
      Cancelar
    </Button>
    <Button
      onClick={onSetInitialMoney}
      disabled={!initialMoney}
      color="primary"
    >
      Ok
    </Button>
  </DialogActions>
);

type Props = {
  onToggleInitialMoneyDialog: Function,
  onTypeInitialMoney: Function,
  onSetInitialMoney: Function,
  initialMoney: string,
  isOpen: boolean,
};

const InitialMoneyCashDialog = ({
  onToggleInitialMoneyDialog,
  onTypeInitialMoney,
  onSetInitialMoney,
  initialMoney,
  isOpen,
}: Props): Object => (
  <Dialog
    aria-describedby="alert-dialog-slide-description"
    aria-labelledby="alert-dialog-slide-title"
    onClose={onToggleInitialMoneyDialog}
    TransitionComponent={renderSlide}
    disableBackdropClick
    keepMounted={false}
    maxWidth="xs"
    open={isOpen}
  >
    {renderTitle()}
    {renderContent(onTypeInitialMoney, initialMoney)}
    {renderButtonsActions(onToggleInitialMoneyDialog, onSetInitialMoney, initialMoney)}
  </Dialog>
);

export default InitialMoneyCashDialog;
