import React, { Component } from 'react';
import { filterConfig, tabConfig } from './config';
import Form from './form';

import EntityComponent from '../../components/common/entity-component';

class Provider extends Component {
  state = {
    providers: [],
  };

  onCreateProvider = (provider: Object): void => {
    const { providers } = this.state;

    this.setState({
      providers: [provider, ...providers],
    });
  };

  onEditProvider = (providerToEdit: Object): void => {
    const { providers } = this.state;

    const providerEditedIndex = providers.findIndex(provider => provider.id === providerToEdit.id);

    this.setState({
      providers: Object.assign([], providers, { [providerEditedIndex]: providerToEdit }),
    });
  };

  onRemoveProvider = (providerId: string): void => {
    const { providers } = this.state;

    this.setState({
      providers: providers.filter(provider => provider.id !== providerId),
    });
  };

  render() {
    const { providers } = this.state;

    return (
      <EntityComponent
        onRemoveItem={this.onRemoveProvider}
        onCreateItem={this.onCreateProvider}
        onEditItem={this.onEditProvider}
        singularEntityName="Fornecedor"
        pluralEntityName="Fornecedores"
        filterConfig={filterConfig}
        tabConfig={tabConfig}
        dataset={providers}
        canBeCreated
        canBeRemoved
        Form={props => (
          <Form
            {...props}
          />
        )}
      />
    );
  }
}

export default Provider;
