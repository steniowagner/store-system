// @flow

import React, { Component } from 'react';

import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

import styled from 'styled-components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as ProductCreators } from '../../../../../../../store/ducks/product';

import { filterList, FILTER_TYPES } from '../../../../../../../utils/filter';
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
  overflow-y: scroll;
  max-width: 400px;
  max-height: 400px;
  margin-top: 8px;
  margin-left: 230px;
`;

const ListItem = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
`;

type Props = {
  handleBlockFormSubmit: Function,
  onSelectProduct: Function,
  getAllProducts: Function,
  productSelected: Object,
  products: Array<Object>,
  refFocus: string,
  mode: string,
};

type State = {
  productsFiltered: Array<Object>,
  optionSelected: Object,
  isListOpen: boolean,
  filterValue: string,
};

class ProductFilter extends Component<Props, State> {
  state = {
    productsFiltered: [],
    optionSelected: {
      title: 'Filter',
    },
    isListOpen: false,
    filterValue: '',
  };

  componentDidMount() {
    const { getAllProducts } = this.props;

    getAllProducts();
  }

  componentWillReceiveProps(nextProps) {
    const { handleBlockFormSubmit, productSelected } = nextProps;

    const isProductSelectedEmpty = !(Object.entries(productSelected)).length;

    if (isProductSelectedEmpty) {
      this.setState({
        filterValue: '',
      }, () => handleBlockFormSubmit(false));
    }
  }

  onSelectOption = (optionSelected: Object) => {
    this.setState({
      filterValue: '',
      optionSelected,
    });
  };

  onFilterProducts = (): void => {
    const { optionSelected, filterValue } = this.state;
    const { products } = this.props;

    const { field } = optionSelected;

    if (field === 'barcode') {
      this.handleFilterByBarcode(filterValue, products);
    } else {
      this.handleFilterByDescprition(filterValue, products);
    }
  };

  onTypeFilterValue = (event: Object) => {
    const { handleBlockFormSubmit } = this.props;

    handleBlockFormSubmit(true);

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

  getBarcodeFilterConfig = (filterValue: string, products: Array<Object>): Object => ({
    type: FILTER_TYPES.NUMERIC,
    value: filterValue,
    dataset: products,
    filter: 'barcode',
    operator: '=',
  });

  getDescriptionFilterConfig = (filterValue: string, products: Array<Object>): Object => ({
    type: FILTER_TYPES.TEXT,
    filter: 'description',
    value: filterValue,
    dataset: products,
  });

  handleFilterByBarcode = (filterValue: string, products: Array<Object>): void => {
    const filterConfig = this.getBarcodeFilterConfig(filterValue, products);
    const productsFilteredByBarcode = filterList(filterConfig);

    const foundProductMatchesBarcode = (!!productsFilteredByBarcode.length);

    if (foundProductMatchesBarcode) {
      const productSelected = productsFilteredByBarcode[0];
      const { description } = productSelected;
      const { onSelectProduct } = this.props;

      this.setState({
        filterValue: description,
        isListOpen: false,
      }, () => onSelectProduct(productSelected));
    }
  };

  handleFilterByDescprition = (filterValue: string, products: Array<Object>): void => {
    const filterConfig = this.getDescriptionFilterConfig(filterValue, products);
    const productsFiltered = filterList(filterConfig);

    const isListOpen = (!!productsFiltered.length && !!filterValue);

    this.setState({
      productsFiltered,
      isListOpen,
    });
  };

  renderProductsFilteredList = (): Object => {
    const { productsFiltered } = this.state;

    return (
      <ListContainer>
        <MenuList>
          {productsFiltered.map((product, index) => {
            const {
              description,
              salePrice,
              brand,
              id,
            } = product;

            const salePriceItem = {
              title: 'Price',
              value: `$ ${salePrice.toFixed(2)}`,
            };

            const brandItem = {
              title: 'Brand',
              value: brand.name,
            };

            return (
              <ListItem
                key={id}
              >
                <ItemFiltered
                  onSelectItem={() => this.onClickListItem(product)}
                  isLast={(index === (productsFiltered.length - 1))}
                  secondariesItems={[salePriceItem, brandItem]}
                  primaryItem={description}
                />
              </ListItem>
            );
          })}
        </MenuList>
      </ListContainer>
    );
  }

  render() {
    const { optionSelected, filterValue, isListOpen } = this.state;
    const { refFocus, mode } = this.props;

    return (
      <FilterContainer>
        <LabelWrapper>
          <Label>
            Products
          </Label>
        </LabelWrapper>
        <SelectFilter
          onTypeFilterValue={this.onTypeFilterValue}
          onSelectOption={this.onSelectOption}
          optionSelected={optionSelected}
          filterValue={filterValue}
          refFocus={refFocus}
          mode={mode}
        />
        {isListOpen && this.renderProductsFilteredList()}
      </FilterContainer>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ProductCreators, dispatch);

const mapStateToProps = state => ({
  products: state.product.data,
  sale: state.sale.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter);
