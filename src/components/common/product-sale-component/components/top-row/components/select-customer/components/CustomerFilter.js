import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

import styled from 'styled-components';

import Filter from '../../../../../../filter';
import { FILTER_TYPES } from '../../../../../../../../utils/filter';
import { RowItem, Row } from '../../../../../../FormUtils';
import ItemFiltered from '../../../../../../ItemFiltered';
import Input from '../../../../../../CustomInput';

const Wrapper = styled.div`
  width: 100%:
`;

const IdentificationName = styled.p`
  margin-right: 4px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
`;

const IdentificationItemWrapper = styled.div`
  display: flex;
  margin-right: 16px;
`;

const DefaultText = styled.span`
  font-size: 16px;
`;

const filterConfig = [{
  placeholder: 'Enter the Name of the Customer you are looking for',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'Name',
  dataField: 'name',
}, {
  placeholder: 'Enter the CPF of the Customer you are looking for',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'CPF',
  dataField: 'cpf',
}, {
  placeholder: 'Enter the RG of the Customer you are looking for',
  type: FILTER_TYPES.TEXT,
  filterTitle: 'RG',
  dataField: 'rg',
}];

const styles = () => ({
  root: {
    marginLeft: 250,
    width: '60%',
  },
});

type Props = {
  onChooseCustomer: Function,
  customers: Array<Object>,
  classes: Object,
};

type State = {
  customersFiltered: Array<Object>,
  customerSelected: Object,
  isListOpen: boolean,
};

class CustomerFilter extends Component<Props, State> {
  state = {
    customersFiltered: [],
    customerSelected: {},
    isListOpen: false,
  };

  onChooseCustomer = (customer: Object): void => {
    const { onChooseCustomer } = this.props;

    this.setState({
      customerSelected: customer,
      isListOpen: false,
    }, () => onChooseCustomer(customer));
  };

  onFilterData = (customersFiltered: Array<Object>): void => {
    this.setState({
      isListOpen: (customersFiltered.length > 0),
      customersFiltered,
    });
  };

  renderIdentificationItem = (type: string, item: string): Object => (
    <IdentificationItemWrapper>
      <IdentificationName>
        {`${type}:`}
      </IdentificationName>
      <DefaultText>
        {item}
      </DefaultText>
    </IdentificationItemWrapper>
  );

  renderCustomerListItem = (customersFilteredLength: number, customer: Object, index: number): Object => {
    const {
      name,
      cpf,
      rg,
      id,
    } = customer;

    const cpfItem = {
      title: 'Cpf',
      value: cpf || '-',
    };

    const rgItem = {
      title: 'RG',
      value: rg || '-',
    };

    return (
      <ItemFiltered
        onSelectItem={() => this.onChooseCustomer(customer)}
        isLast={(index === customersFilteredLength - 1)}
        secondariesItems={[cpfItem, rgItem]}
        primaryItem={name}
        key={id}
      />
    );
  };

  renderCustomerList = (): Object => {
    const { customersFiltered } = this.state;
    const { classes } = this.props;

    const customersFilteredLength = customersFiltered.length;

    return (
      <Paper
        className={classes.root}
      >
        <List
          component="nav"
        >
          {customersFiltered.map((customer, index) => this.renderCustomerListItem(customersFilteredLength, customer, index))}
        </List>
      </Paper>
    );
  };

  renderCustomerSelectedInput = (): Object => {
    const { customerSelected } = this.state;

    return (
      <Row>
        <RowItem>
          <Input
            value={customerSelected.name || ''}
            placeholder="Select a Customer"
            label="Customer Selected"
            id="customerSelected"
            onChange={() => {}}
            onBlur={() => {}}
            type="text"
            disabled
            error=""
          />
        </RowItem>
      </Row>
    );
  };

  renderFilter = (): Object => {
    const { customers } = this.props;

    return (
      <Filter
        shouldFilterAfterSelectFilter={false}
        onFilterData={this.onFilterData}
        filterConfig={filterConfig}
        dataset={customers}
      />
    );
  }

  render() {
    const { isListOpen, customersFiltered } = this.state;

    const shouldShowList = (isListOpen && customersFiltered.length);

    return (
      <Wrapper>
        {this.renderCustomerSelectedInput()}
        {this.renderFilter()}
        {shouldShowList && this.renderCustomerList()}
      </Wrapper>
    );
  }
}

export default withStyles(styles)(CustomerFilter);
