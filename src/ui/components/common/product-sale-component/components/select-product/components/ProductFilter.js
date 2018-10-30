import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Popper from '@material-ui/core/Popper';
import styled from 'styled-components';

import ItemFiltered from '../../../../ItemFiltered';
import Filter, { FILTER_TYPES } from '../../../../Filter';

const FilterContainer = styled.div`
  width: 80%;
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

const filterConfig = [{
  filterTitle: 'Código de Barras',
  dataField: 'barCode',
  type: FILTER_TYPES.TEXT,
}, {
  filterTitle: 'Descrição',
  dataField: 'description',
  type: FILTER_TYPES.TEXT,
}];

const products = [{
  description: 'Computador',
  salePrice: 21.90,
  brand: 'Apple',
}, {
  description: 'Computador',
  salePrice: 21.90,
  brand: 'Apple',
}];

class ProductFilter extends Component {
  state = {

  };

  renderProductsFilteredList = (): Object => {
    const { onSelectProduct } = this.props;

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
            {products.map((product, index) => {
              const { description, salePrice, brand } = product;

              const salePriceItem = {
                title: 'Preço de Venda',
                value: `R$ ${salePrice.toFixed(2)}`,
              };

              const brandItem = {
                title: 'Marca',
                value: brand,
              };

              return (
                <ItemFiltered
                  onSelectItem={() => onSelectProduct(product)}
                  secondariesItems={[salePriceItem, brandItem]}
                  isLast={(index === products.length - 1)}
                  primaryItem={description}
                />
              );
            })}
          </List>
        </ListContainer>
      </Popper>
    );
  };

  render() {
    return (
      <FilterContainer>
        <LabelWrapper>
          <Label>
            Produtos
          </Label>
        </LabelWrapper>
        <Filter
          filterConfig={filterConfig}
        />
        {this.renderProductsFilteredList()}
      </FilterContainer>
    );
  }
}

/** onFilterData={this.onFilterItems}
            shouldFilterAfterSelectFilter
            filterConfig={filterConfig}
            dataset={dataset} */

export default ProductFilter;
