export const tabConfig = [{
  columnTitle: 'Nome',
  dataField: 'name',
}, {
  columnTitle: 'Usuário',
  dataField: 'username',
}];

export const filterConfig = [{
  filterTitle: 'Nome',
  dataField: 'name',
}, {
  filterTitle: 'Usuário',
  dataField: 'username',
}];

export const snackbarTypes = {
  createUserSuccess: {
    type: 'success',
    message: 'Usuário criado com sucesso.',
  },
  createUserError: {
    type: 'error',
    message: 'Houve um erro ao criar o Usuário.',
  },

  removeUserSuccess: {
    type: 'success',
    message: 'Usuário removido com sucesso.',
  },
  removeUserError: {
    type: 'error',
    message: 'Houve um erro ao remover este Usuário.',
  },

  editUserSuccess: {
    type: 'success',
    message: 'Usuário atualizado com sucesso.',
  },
  editUserError: {
    type: 'error',
    message: 'Houve um erro ao atualizar este Usuário.',
  },
};
