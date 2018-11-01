// @flow

import React, { Component } from 'react';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

import styled from 'styled-components';

import filterList from '../../../../../../../utils/filter';
import ItemFiltered from '../../../../../ItemFiltered';
import SelectFilter from './components/select-filter';


const FilterContainer = styled.div`
  width: 100%;
  margin-top: 6px;
`;

const LabelWrapper = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.span``;

const ListContainer = styled(({ ...props }) => (
  <Paper
    {...props}
  />
))`
  max-height: 300px;
  margin-top: 8px;
  margin-left: 250px;
`;

const products = [{
  barCode: '123',
  description: 'Computador',
  salePrice: 21.91,
  brand: 'Samsung',
  id: Math.random(),
}, {
  barCode: '1234',
  description: 'Computador',
  salePrice: 21.90,
  brand: 'Apple',
  id: Math.random(),
}];

type Props = {
  onSelectProduct: Function,
  productSelected: Object,
};

class ProductFilter extends Component<Props, {}> {
  state = {
    productsFiltered: [],
    optionSelected: {
      title: 'Filtrar',
    },
    isListOpen: false,
    filterValue: '',
  };

  componentWillReceiveProps(nextProps) {
    const { productSelected } = nextProps;

    const isProductSelectedEmpty = !(Object.entries(productSelected)).length;

    if (isProductSelectedEmpty) {
      this.setState({
        filterValue: '',
      });
    }
  }

  // autofocus
  onSelectOption = (optionSelected: Object) => {
    this.setState({
      filterValue: '',
      optionSelected,
    });
  };

  onFilterProducts = (): void => {
    const { optionSelected, filterValue } = this.state;
    const { field } = optionSelected;

    const filterConfig = (field === 'barCode'
      ? this.getBarcodeFilterConfig(filterValue)
      : this.getDescriptionFilterConfig(filterValue));

    const productsFiltered = filterList(filterConfig);

    const isListOpen = (!!productsFiltered.length && !!filterValue);

    this.setState({
      productsFiltered,
      isListOpen,
    });
  };

  onTypeFilterValue = (event: Object) => {
    this.setState({
      filterValue: event.target.value,
    }, () => this.onFilterProducts());
  };

  onClickListItem = (product: Object): void => {
    const { onSelectProduct } = this.props;
    const { description } = product;

    this.setState({
      filterValue: description,
      isListOpen: false,
    }, () => onSelectProduct(product));
  };

  getBarcodeFilterConfig = (filterValue: string): Object => ({
    value: filterValue,
    dataset: products,
    filter: 'barCode',
    operator: '=',
  });

  getDescriptionFilterConfig = (filterValue: string): Object => ({
    filter: 'description',
    value: filterValue,
    dataset: products,
  });

  renderProductsFilteredList = (): Object => {
    const { productsFiltered } = this.state;

    return (
      <Popper
        disablePortal
        transition
        open
      >
        <ListContainer>
          <List
            component="nav"
          >
            {productsFiltered.map((product, index) => {
              const {
                description,
                salePrice,
                brand,
                id,
              } = product;

              const salePriceItem = {
                title: 'Preço',
                value: `R$ ${salePrice.toFixed(2)}`,
              };

              const brandItem = {
                title: 'Marca',
                value: brand,
              };

              return (
                <ItemFiltered
                  onSelectItem={() => this.onClickListItem(product)}
                  isLast={(index === productsFiltered.length - 1)}
                  secondariesItems={[salePriceItem, brandItem]}
                  primaryItem={description}
                  key={id}
                />
              );
            })}
          </List>
        </ListContainer>
      </Popper>
    );
  }

  render() {
    const {
      optionSelected,
      filterValue,
      isListOpen,
    } = this.state;

    return (
      <FilterContainer>
        <LabelWrapper>
          <Label>
            Produtos
          </Label>
        </LabelWrapper>
        <SelectFilter
          onTypeFilterValue={this.onTypeFilterValue}
          onSelectOption={this.onSelectOption}
          optionSelected={optionSelected}
          filterValue={filterValue}
        />
        {isListOpen && this.renderProductsFilteredList()}
      </FilterContainer>
    );
  }
}

export default ProductFilter;
