import Immutable from 'seamless-immutable';

export const Types = {
  BACKUP_REQUEST: 'backup/BACKUP_REQUEST',
  BACKUP_SUCCESS: 'backup/BACKUP_SUCCESS',
  BACKUP_FAILURE: 'backup/BACKUP_FAILURE',

  IMPORT_BACKUP_FILE_REQUEST: 'backup/IMPORT_BACKUP_FILE_REQUEST',
  IMPORT_BACKUP_FILE_SUCCESS: 'backup/IMPORT_BACKUP_FILE_SUCCESS',
  IMPORT_BACKUP_FILE_FAILURE: 'backup/IMPORT_BACKUP_FILE_FAILURE',
};

const INITIAL_STATE = Immutable({
  loading: false,
  message: '',
  error: '',
});

export const Creators = {
  backupRequest: () => ({
    type: Types.BACKUP_REQUEST,
    payload: { message: 'Backup em andamento...' },
  }),

  backupSuccess: () => ({
    type: Types.BACKUP_SUCCESS,
    payload: { message: 'Backup Realizado com Sucesso' },
  }),

  backupFailure: () => ({
    type: Types.BACKUP_FAILURE,
    payload: { error: 'Houve um erro ao realizar o Backup' },
  }),

  importBackupFile: () => ({
    type: Types.IMPORT_BACKUP_FILE_REQUEST,
    payload: { message: 'Importando os Dados...' },
  }),

  importBackupFileSuccess: () => ({
    type: Types.IMPORT_BACKUP_FILE_SUCCESS,
    payload: { message: 'Dados Importados com Sucesso' },
  }),

  importBackupFileFailure: () => ({
    type: Types.IMPORT_BACKUP_FILE_FAILURE,
    payload: { error: 'Houve um erro ao importar os Dados' },
  }),
};

const backup = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.BACKUP_REQUEST:
      return {
        message: payload.message,
        loading: true,
        error: '',
      };

    case Types.BACKUP_SUCCESS:
      return {
        ...state,
        message: payload.message,
        loading: false,
      };

    case Types.BACKUP_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };

    case Types.IMPORT_BACKUP_FILE_REQUEST:
      return {
        message: payload.message,
        loading: true,
        error: '',
      };

    case Types.IMPORT_BACKUP_FILE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        loading: false,
      };

    case Types.IMPORT_BACKUP_FILE_FAILURE:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default backup;
