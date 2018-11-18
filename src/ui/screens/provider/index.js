import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as ProviderCreators } from '../../store/ducks/provider';

import config from './config';
import Form from './form';

import EntityComponent from '../../components/common/entity-component';

type Props = {
  getAllProviders: Function,
  removeProvider: Function,
  createProvider: Function,
  editProvider: Function,
  providers: Array<Object>,
};

class Provider extends Component<Props, {}> {
  componentDidMount() {
    const { getAllProviders } = this.props;

    getAllProviders();
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

  render() {
    const { providers } = this.props;

    return (
      <EntityComponent
        onRemoveItem={this.onRemoveProvider}
        onCreateItem={this.onCreateProvider}
        onEditItem={this.onEditProvider}
        singularEntityName="Fornecedor"
        pluralEntityName="Fornecedores"
        filterConfig={config.filterConfig}
        tabConfig={config.tabConfig}
        dataset={providers}
        canBeCreated
        canBeRemoved
        canBeEdited
        Form={props => (
          <Form
            {...props}
          />
        )}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ProviderCreators, dispatch);

const mapStateToProps = state => ({
  providers: state.provider.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Provider);
