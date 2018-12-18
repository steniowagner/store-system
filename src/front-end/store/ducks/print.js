import Immutable from 'seamless-immutable';

export const Types = {
  CLOSE_PRINT_WINDOW: 'print/CLOSE_PRINT_WINDOW',
  OPEN_PRINT_WINDOW: 'print/OPEN_PRINT_WINDOW',
  PREPARE_TO_PRINT: 'print/PREPARE_TO_PRINT',
};

const INITIAL_STATE = Immutable({
  open: false,
  data: {},
});

export const Creators = {
  prepareToPrint: data => ({
    type: Types.PREPARE_TO_PRINT,
    payload: { data },
  }),

  openPrintWindow: () => ({
    type: Types.OPEN_PRINT_WINDOW,
  }),

  closePrintWindow: () => ({
    type: Types.CLOSE_PRINT_WINDOW,
  }),
};

const printContent = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.PREPARE_TO_PRINT:
      return {
        data: payload.data,
        open: true,
      };

    case Types.OPEN_PRINT_WINDOW:
      return {
        ...state,
      };

    case Types.CLOSE_PRINT_WINDOW:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default printContent;
