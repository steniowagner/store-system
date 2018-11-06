// @flow

import React, { Component } from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Denied from '@material-ui/icons/HighlightOffOutlined';
import Approved from '@material-ui/icons/CheckCircleOutline';
import OutOfTime from '@material-ui/icons/TimerOff';
import Pending from '@material-ui/icons/History';

import styled from 'styled-components';
import appStyles from '../../../styles';

const Wrapper = styled.div``;

const SelectorWrapper = styled.div`
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`;

const ItemSelectedText = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.white};
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const SelectorButton = styled(({ ...props }) => (
  <ButtonBase
    {...props}
  />
))`
  width: 100%;
  height: 100%;
`;

const DeniedIcon = styled(({ ...props }) => (
  <Denied
    {...props}
  />
))`
  padding-bottom: 2px;
  color: ${({ theme }) => theme.colors.white};
`;

const ApprovedIcon = styled(({ ...props }) => (
  <Approved
    {...props}
  />
))`
  padding-bottom: 2px;
  color: ${({ theme }) => theme.colors.white};
`;

const OutOfTimeIcon = styled(({ ...props }) => (
  <OutOfTime
    {...props}
  />
))`
  padding-bottom: 2px;
  color: ${({ theme }) => theme.colors.white};
`;

const PendingIcon = styled(({ ...props }) => (
  <Pending
    {...props}
  />
))`
  padding-bottom: 2px;
  color: ${({ theme }) => theme.colors.white};
`;

export const BUDGET_STATUS = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  DENIED: 'Negado',
  OUT_OF_TIME: 'Fora do Prazo',
};

const STATUS_TYPES = [{
  color: appStyles.colors.warning,
  disabledColor: appStyles.colors.warningDisabled,
  status: BUDGET_STATUS.PENDING,
  Icon: PendingIcon,
}, {
  color: appStyles.colors.success,
  disabledColor: appStyles.colors.successDisabled,
  status: BUDGET_STATUS.APPROVED,
  Icon: ApprovedIcon,
}, {
  color: appStyles.colors.danger,
  disabledColor: appStyles.colors.dangerDisabled,
  status: BUDGET_STATUS.DENIED,
  Icon: DeniedIcon,
}, {
  color: appStyles.colors.mediumGray,
  disabledColor: appStyles.colors.mediumGrayDisabled,
  status: BUDGET_STATUS.OUT_OF_TIME,
  Icon: OutOfTimeIcon,
}];

type Props = {
  setFieldValue: Function,
  values: Object,
  mode: string,
};

type State = {
  anchorElement: Object,
  itemSelected: Object,
};

class BudgetStatus extends Component<Props, State> {
  state = {
    itemSelected: { ...STATUS_TYPES[0] },
    anchorElement: null,
  };

  componentDidMount() {
    this.handleInitialStatus();
  }

  onClickSelectorButton = (event: Object): void => {
    this.setState({
      anchorElement: event.currentTarget,
    });
  };

  onCloseMenu = (): void => {
    this.setState({
      anchorElement: null,
    });
  };

  onSelectItem = (itemSelected: Object): void => {
    const { setFieldValue } = this.props;
    const { status } = itemSelected;

    this.setState({
      anchorElement: null,
      itemSelected,
    }, () => setFieldValue('status', status));
  };

  getItemStatusSelected = (statusSelected: string): Object => {
    const item = STATUS_TYPES.filter(statusType => statusType.status === statusSelected);

    return item[0];
  };

  handleInitialStatus = (): void => {
    const { values } = this.props;

    const itemSelected = this.getItemStatusSelected(values.status);

    this.setState({
      itemSelected,
    });
  };

  renderSelector = (): Object => {
    const { itemSelected } = this.state;
    const { mode } = this.props;

    const {
      disabledColor,
      status,
      Icon,
      color,
    } = itemSelected;

    const shouldDisableButton = (mode === 'detail');
    const properColor = (shouldDisableButton ? disabledColor : color);

    return (
      <SelectorWrapper
        color={properColor}
      >
        <SelectorButton
          onClick={this.onClickSelectorButton}
          disabled={(mode === 'detail')}
        >
          <ItemWrapper>
            <ItemSelectedText>
              {status.toUpperCase()}
            </ItemSelectedText>
            <Icon />
          </ItemWrapper>
        </SelectorButton>
      </SelectorWrapper>
    );
  };

  renderMenu = (): Object => {
    const { anchorElement } = this.state;

    return (
      <Menu
        open={Boolean(anchorElement)}
        onClose={this.onCloseMenu}
        anchorEl={anchorElement}
        id="status-menu"
      >
        {STATUS_TYPES.map(statusType => (
          <MenuItem
            key={statusType.status}
            onClick={() => this.onSelectItem(statusType)}
          >
            {statusType.status}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  render() {
    return (
      <Wrapper>
        <span>
          Status
        </span>
        {this.renderSelector()}
        {this.renderMenu()}
      </Wrapper>
    );
  }
}

export default BudgetStatus;
