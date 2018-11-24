// @flow

import React, { Component } from 'react';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

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
  max-height: 400px;
  margin-top: 8px;
  margin-left: 250px;
`;

type Props = {
  onSelectProduct: Function,
  getAllProducts: Function,
  productSelected: Object,
  products: Array<Object>,
  mode: string,
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

  componentDidMount() {
    const { getAllProducts } = this.props;

    getAllProducts();
  }

  componentWillReceiveProps(nextProps) {
    const { productSelected } = nextProps;

    const isProductSelectedEmpty = !(Object.entries(productSelected)).length;

    if (isProductSelectedEmpty) {
      this.setState({
        filterValue: '',
      });
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
      <Popper
        disablePortal
        transition
        open
      >
        <ListContainer>
          <List
            component="div"
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
                value: brand.name,
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

    const { mode } = this.props;

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
