// @flow

import React from 'react';

import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import styled from 'styled-components';

const TextContainer = styled.div`
  margin-top: 18px;
`;

const TextWrapper = styled.div`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;

const InfoText = styled.p`
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darktText};
`;

const ValueTextWrapper = styled.div`
  margin-left: 6px;
  margin-top: 2px;
`;

type Props = {
  onClickConfirm: Function,
  onCloseDialog: Function,
  alertConfig: Object,
  product: Object,
  isOpen: boolean,
};

export const ALERTS_TYPES = {
  STOCK_WILL_BELOW_MIN: 'STOCK_WILL_BELOW_MIN',
  STOCK_BELOW_MIN: 'STOCK_BELOW_MIN',
};

const renderProductAndStockInfo = (title: string, value: any): Object => (
  <TextContainer>
    <TextWrapper>
      <InfoText>
        {title}
      </InfoText>
      <ValueTextWrapper>
        <DialogContentText
          id="error-text"
        >
          {value}
        </DialogContentText>
      </ValueTextWrapper>
    </TextWrapper>
  </TextContainer>
);

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
    Alert
  </DialogTitle>
);

const renderContent = (product: Object, alertConfig: Object, quantity: number): Object => {
  const { stockInfo, type } = alertConfig;
  const { minStockQuantity, stockQuantity } = stockInfo;

  const message = (type === ALERTS_TYPES.STOCK_BELOW_MIN
    ? 'The Stock hasn\'t the quantity desired of this Product. Want to proceed with this operation and let the Stock in low?'
    : 'By performing this action, the Stock of this Product will be under the min allowed.'
  );

  return (
    <DialogContent>
      <DialogContentText
        id="main-text"
      >
        {message}
      </DialogContentText>
      {renderProductAndStockInfo('Product: ', product.description)}
      {renderProductAndStockInfo('Min Stock Quantity: ', minStockQuantity)}
      {renderProductAndStockInfo('Quantity in Stock: ', stockQuantity)}
      {renderProductAndStockInfo('Quantity Requested: ', quantity)}
    </DialogContent>
  );
};

const renderActionButtons = (onClickConfirm: Function, onCloseDialog: Function, alertType: string): Object => (
  <DialogActions>
    <Button
      onClick={onCloseDialog}
      color="primary"
    >
      CANCEL
    </Button>
    <Button
      onClick={onClickConfirm}
      color="primary"
    >
      {alertType === ALERTS_TYPES.STOCK_BELOW_MIN ? 'PROCEED' : 'OK'}
    </Button>
  </DialogActions>
);

const StockQuantityAlert = ({
  onClickConfirm,
  onCloseDialog,
  alertConfig,
  product,
  isOpen,
}: Props): Object => {
  const { quantity, type } = alertConfig;

  return !!type && (
    <Dialog
      aria-describedby="alert-dialog-slide-description"
      aria-labelledby="alert-dialog-slide-title"
      TransitionComponent={renderSlide}
      onClose={onCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
      keepMounted={false}
      open={isOpen}
    >
      {renderTitle()}
      {renderContent(product, alertConfig, quantity)}
      {renderActionButtons(onClickConfirm, onCloseDialog, type)}
    </Dialog>
  );
};

export default StockQuantityAlert;
