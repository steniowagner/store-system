export const tabConfig = [{
  columnTitle: 'Código de Barras',
  dataField: 'barCode',
}, {
  columnTitle: 'Marca',
  dataField: 'brand',
}];

export const filterConfig = [{
  filterTitle: 'Código de Barras',
  dataField: 'barCode',
}, {
  filterTitle: 'Marca',
  dataField: 'brand',
}];

export const snackbarTypes = {
  createProductSuccess: {
    type: 'success',
    message: 'Produto criado com sucesso.',
  },
  createProductError: {
    type: 'error',
    message: 'Houve um erro ao criar o Produto.',
  },

  removeProductSuccess: {
    type: 'success',
    message: 'Produto removido com sucesso.',
  },
  removeProductError: {
    type: 'error',
    message: 'Houve um erro ao remover este Produto.',
  },

  editProductSuccess: {
    type: 'success',
    message: 'Produto atualizado com sucesso.',
  },
  editProductError: {
    type: 'error',
    message: 'Houve um erro ao atualizar este Produto.',
  },
};
