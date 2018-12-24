// @flow

import React, { Component, Fragment } from 'react';

import Input from '../../../../CustomInput';

type Props = {
  onSetValues: Function,
  item: string,
};

type State = {
  observation: string,
};

class ObservationItem extends Component<Props, State> {
  state = {
    observation: '',
  };

  componentDidMount() {
    const { item } = this.props;

    this.setState({
      observation: item,
    });
  }

  onTypeObservation = (observation: string): void => {
    const { onSetValues } = this.props;

    this.setState({
      observation,
    }, () => onSetValues('observation', observation));
  };

  render() {
    const { observation } = this.state;

    return (
      <Fragment>
        <Input
          onChange={event => this.onTypeObservation(event.target.value)}
          value={observation}
          onBlur={() => {}}
          type="textarea"
          autoFocus
          error=""
          label=""
        />
      </Fragment>
    );
  }
}

export default ObservationItem;
