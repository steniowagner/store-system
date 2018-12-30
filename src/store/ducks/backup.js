import Immutable from 'seamless-immutable';

export const Types = {
  BACKUP_REQUEST: 'backup/BACKUP_REQUEST',
  BACKUP_START: 'backup/BACKUP_START',
  BACKUP_SUCCESS: 'backup/BACKUP_SUCCESS',
  BACKUP_FAILURE: 'backup/BACKUP_FAILURE',

  IMPORT_BACKUP_FILE_REQUEST: 'backup/IMPORT_BACKUP_FILE_REQUEST',
  IMPORT_BACKUP_FILE_START: 'backup/IMPORT_BACKUP_FILE_START',
  IMPORT_BACKUP_FILE_SUCCESS: 'backup/IMPORT_BACKUP_FILE_SUCCESS',
  IMPORT_BACKUP_FILE_FAILURE: 'backup/IMPORT_BACKUP_FILE_FAILURE',

  RESET_STATE: 'backup/RESET_STATE',
};

const INITIAL_STATE = Immutable({
  loading: false,
  message: '',
  error: '',
});

export const Creators = {
  exportBackupFile: () => ({
    type: Types.BACKUP_REQUEST,
  }),

  exportBackupFileStart: () => ({
    type: Types.BACKUP_START,
    payload: { message: 'Backup is running...' },
  }),

  exportBackupSuccess: () => ({
    type: Types.BACKUP_SUCCESS,
    payload: { message: 'Backup Performed Successfully.' },
  }),

  exportBackupFailure: () => ({
    type: Types.BACKUP_FAILURE,
    payload: { error: 'There was a problem when trying to Perform Backup.' },
  }),

  importBackupFile: () => ({
    type: Types.IMPORT_BACKUP_FILE_REQUEST,
    payload: { message: 'Importing Data...' },
  }),

  importBackupFileStart: () => ({
    type: Types.IMPORT_BACKUP_FILE_START,
    payload: { message: 'Importing Data...' },
  }),

  importBackupFileSuccess: () => ({
    type: Types.IMPORT_BACKUP_FILE_SUCCESS,
    payload: { message: 'Data Imported Successfully.' },
  }),

  importBackupFileFailure: () => ({
    type: Types.IMPORT_BACKUP_FILE_FAILURE,
    payload: { error: 'There was an problem when trying to Import Data.' },
  }),

  resetState: () => ({
    type: Types.RESET_STATE,
  }),
};

const backup = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.BACKUP_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.BACKUP_START:
      return {
        ...state,
        message: payload.message,
        loading: true,
      };

    case Types.BACKUP_SUCCESS:
      return {
        ...state,
        message: payload.message,
        loading: false,
      };

    case Types.BACKUP_FAILURE:
      return {
        error: payload.error,
        loading: false,
        message: '',
      };

    case Types.IMPORT_BACKUP_FILE_REQUEST:
      return {
        ...INITIAL_STATE,
      };

    case Types.IMPORT_BACKUP_FILE_START:
      return {
        ...state,
        message: payload.message,
        loading: true,
      };

    case Types.IMPORT_BACKUP_FILE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        loading: false,
      };

    case Types.IMPORT_BACKUP_FILE_FAILURE:
      return {
        error: payload.error,
        loading: false,
        message: '',
      };

    case Types.RESET_STATE:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default backup;
