import React, { Component } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

import styled from 'styled-components';

import Input from '../../../../CustomInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RemoveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
`;

type Props = {
  onTypeValue: Function,
  onRemove: Function,
  entity: string,
  mode: string,
  item: Object,
};

type State = {
  percentageValue: string,
  optionSelected: string,
  moneyValue: string,
};

class DiscountItem extends Component<Props, State> {
  state = {
    percentageValue: '',
    optionSelected: '',
    moneyValue: '',
  };

  componentDidMount() {
    const { item } = this.props;
    const { type, value } = item;

    const percentageValue = (type === 'percentage' ? value : '');
    const moneyValue = (type === 'money' ? value : '');

    this.setState({
      optionSelected: type,
      percentageValue,
      moneyValue,
    });
  }

  onTypeMoneyValue = (event: Object): void => {
    const { onTypeValue } = this.props;
    const { value } = event.target;

    this.setState({
      moneyValue: event.target.value,
    }, () => onTypeValue('money', value));
  };

  onTypePercentageValue = (event: Object): void => {
    const { onTypeValue } = this.props;
    const { value } = event.target;

    this.setState({
      percentageValue: value,
    }, () => onTypeValue('percentage', value));
  };

  onSelectOption = (optionSelected: string): void => {
    this.setState({
      optionSelected,
    });
  };

  getRowConfig = (onChange: Function, stateRef: string, label: string, id: string): Object => ({
    onChange,
    stateRef,
    label,
    id,
  });

  renderRow = (config: Object): Object => {
    const {
      onChange,
      stateRef,
      label,
      id,
    } = config;

    const { state } = this;
    const inputValue = state[stateRef];
    const { optionSelected } = state;

    return (
      <InputWrapper>
        <FormControlLabel
          label={label}
          control={(
            <Radio
              onChange={event => this.onSelectOption(event.target.value)}
              checked={optionSelected === id}
              color="primary"
            />
          )}
          value={id}
        />
        <Input
          disabled={optionSelected !== id}
          onChange={onChange}
          value={inputValue}
          onBlur={() => {}}
          placeholder=""
          type="number"
          error=""
          id={id}
        />
      </InputWrapper>
    );
  };

  renderPercentageRow = (): Object => {
    const config = this.getRowConfig(this.onTypePercentageValue, 'percentageValue', 'Em Porcentagem', 'percentage');

    return this.renderRow(config);
  };

  renderMoneyRow = (): Object => {
    const config = this.getRowConfig(this.onTypeMoneyValue, 'moneyValue', 'Em Dinheiro', 'money');

    return this.renderRow(config);
  };

  renderRemoveButton = (): void => {
    const {
      onRemove,
      entity,
      item,
      mode,
    } = this.props;

    const hasItemSelected = (typeof item === 'object' ? !!item.type : !!item);
    const isOnEditionMode = (mode === 'edit');

    const shouldShowRemoveButton = (isOnEditionMode || hasItemSelected);

    return shouldShowRemoveButton && (
      <RemoveButtonWrapper>
        <Button
          onClick={() => onRemove()}
          variant="outlined"
          color="primary"
          size="large"
        >
          {`REMOVER ${entity}`}
        </Button>
      </RemoveButtonWrapper>
    );
  };

  render() {
    return (
      <Container>
        {this.renderPercentageRow()}
        {this.renderMoneyRow()}
        {this.renderRemoveButton()}
      </Container>
    );
  }
}

export default DiscountItem;
