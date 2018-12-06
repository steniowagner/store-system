// @flow

import React from 'react';

import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';

import styled from 'styled-components';

import ProductList from '../../../components/common/product-sale-component/components/products-selected-list';
import BottomContent from './BottomContent';
import TopContent from './TopContent';

const MainContent = styled(Paper)`
  width: 100%;
  height: 100%;
  border: 3px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
`;

type Props = {
  onToggleSaleDetailDialog: Function,
  isOpen: boolean,
  sale: Object,
};

const SaleDetailDialog = ({
  onToggleSaleDetailDialog,
  isOpen,
  sale,
}: Props): Object => {
  const { dateToShow, salesman, products } = sale;

  return (
    <Dialog
      aria-describedby="alert-SaleDetailDialog-slide-description"
      aria-labelledby="alert-SaleDetailDialog-slide-title"
      onClose={onToggleSaleDetailDialog}
      disableBackdropClick
      open={isOpen}
      maxWidth="lg"
      fullWidth
    >
      <DialogContent>
        <TopContent
          onClickBackButton={onToggleSaleDetailDialog}
          dateToShow={dateToShow}
          salesman={salesman}
        />
        <MainContent>
          <ProductList
            onEditProductQuantity={() => {}}
            onRemoveProduct={() => {}}
            products={products}
            mode="detail"
            stock={[]}
            error=""
          />
          <BottomContent
            {...sale}
          />
        </MainContent>
      </DialogContent>
    </Dialog>
  );
};

export default SaleDetailDialog;
