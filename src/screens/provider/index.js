import React, { Component, Fragment } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as ProviderCreators } from '../../store/ducks/provider';

import config from './config';
import Form from './form';

import EntityComponent from '../../components/common/entity-component';
import Snackbar from '../../components/common/Snackbar';

type Props = {
  getAllProviders: Function,
  removeProvider: Function,
  createProvider: Function,
  providers: Arra<Object>,
  editProvider: Function,
};

type State = {
  isSnackbarOpen: boolean,
};

class Provider extends Component<Props, State> {
  state = {
    isSnackbarOpen: false,
  };

  componentDidMount() {
    const { getAllProviders } = this.props;

    getAllProviders();
  }

  componentWillReceiveProps(nextProps) {
    const { message, error } = nextProps.providers;

    if (message || error) {
      this.setState({
        isSnackbarOpen: true,
      });
    }
  }

  onCreateProvider = (provider: Object): void => {
    const { createProvider } = this.props;

    createProvider(provider);
  };

  onEditProvider = (providerToEdit: Object): void => {
    const { editProvider } = this.props;

    editProvider(providerToEdit);
  };

  onRemoveProvider = (providerId: number): void => {
    const { removeProvider } = this.props;

    removeProvider(providerId);
  };

  renderSnackbar = (providers: Object): Object => {
    const { isSnackbarOpen } = this.state;
    const { message, error } = providers;

    return (
      <Snackbar
        onCloseSnackbar={() => this.setState({ isSnackbarOpen: false })}
        isOpen={isSnackbarOpen}
        message={message}
        error={error}
      />
    );
  };

  render() {
    const { providers } = this.props;

    const providersNames = providers.data.map(provider => provider.name);

    return (
      <Fragment>
        <EntityComponent
          onRemoveItem={this.onRemoveProvider}
          onCreateItem={this.onCreateProvider}
          onEditItem={this.onEditProvider}
          singularEntityName="Provider"
          pluralEntityName="Providers"
          filterConfig={config.filterConfig}
          tabConfig={config.tabConfig}
          dataset={providers.data}
          canBeCreated
          canBeRemoved
          canBeEdited
          Form={props => (
            <Form
              {...props}
              providersNames={providersNames}
            />
          )}
        />
        {this.renderSnackbar(providers)}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ProviderCreators, dispatch);

const mapStateToProps = state => ({
  providers: state.provider,
});

export default connect(mapStateToProps, mapDispatchToProps)(Provider);
