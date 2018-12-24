import Immutable from 'seamless-immutable';

export const Types = {
  FINISH_PRINT: 'print/FINISH_PRINT',
  START_PRINT: 'print/START_PRINT',
  RE_PRINT: 'print/RE_PRINT',
};

const INITIAL_STATE = Immutable({
  shouldRenderDocumentValues: true,
  shouldRenderDocumentInfo: true,
  numberOfPages: 1,
  currentPage: 0,
  open: false,
  data: {},
});

export const Creators = {
  startPrint: data => ({
    type: Types.START_PRINT,
    payload: { data },
  }),

  rePrint: () => ({
    type: Types.RE_PRINT,
  }),

  finishPrint: () => ({
    type: Types.FINISH_PRINT,
  }),
};

// BASED ON A4 SHEET LAYOUT AND THE TABLE ROW HEIGHT
const NUMBER_ITEMS_LAYOUT_SUPPORTS_WITHOUT_HEADER = 20;
const NUMBER_ITEMS_LAYOUT_SUPPORTS_WITH_HEADER = 15;

const getNumberOfPages = (dataset) => {
  let numberOfItems = dataset.length - NUMBER_ITEMS_LAYOUT_SUPPORTS_WITH_HEADER;
  let numberOfPages = 1;

  while (numberOfItems > 0) {
    numberOfItems -= NUMBER_ITEMS_LAYOUT_SUPPORTS_WITHOUT_HEADER;
    numberOfPages += 1;
  }

  return numberOfPages;
};

const mapDatasetToPages = (dataset) => {
  const numberOfPages = getNumberOfPages(dataset);

  const datasetMappedIntoPages = Array(numberOfPages).fill({}).map((item, index) => {
    if (index === 0) {
      return dataset.slice(0, 15);
    }

    const startIndex = 15 + (20 * (index - 1));
    const finalIndex = (startIndex + 20);

    return dataset.slice(startIndex, finalIndex);
  });

  return datasetMappedIntoPages;
};

const printContent = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case Types.START_PRINT:
      return {
        ...state,
        shouldRenderDocumentValues: (getNumberOfPages(payload.data.products) === 1),
        datasetMappedIntoPages: mapDatasetToPages(payload.data.products),
        numberOfPages: getNumberOfPages(payload.data.products),
        data: payload.data,
        open: true,
      };

    case Types.RE_PRINT:
      return {
        ...state,
        shouldRenderDocumentValues: ((state.numberOfPages - 1) === (state.currentPage + 1)),
        currentPage: state.currentPage + 1,
        shouldRenderDocumentInfo: false,
      };

    case Types.FINISH_PRINT:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};

export default printContent;
