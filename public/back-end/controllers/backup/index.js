const ApplicationModels = require('../../models');

const ENTITIES = {
  OPERATION_RESPONSE: 'OPERATION_RESPONSE',
  CLOSE_PRINT_WINDOW: 'CLOSE_PRINT_WINDOW',
  OPEN_PRINT_WINDOW: 'OPEN_PRINT_WINDOW',
  OPERATION_REQUEST: 'OPERATION_REQUEST',
  PROVIDER: 'PROVIDER',
  CUSTOMER: 'CUSTOMER',
  CASHIER: 'CASHIER',
  PRODUCT: 'PRODUCT',
  BUDGET: 'BUDGET',
  BACKUP: 'BACKUP',
  STOCK: 'STOCK',
  BRAND: 'BRAND',
  USER: 'USER',
  SALE: 'SALE',
};

// OBS: THE ORDER MATTERS HERE!

const MODELS = {
  [ENTITIES.BRAND]: {
    Model: ApplicationModels.Brand,
    field: 'brands',
  },
  [ENTITIES.PRODUCT]: {
    Model: ApplicationModels.Product,
    field: 'products',
  },
  [ENTITIES.STOCK]: {
    Model: ApplicationModels.Stock,
    field: 'stock',
  },
  [ENTITIES.SALE]: {
    Model: ApplicationModels.Sale,
    field: 'sales',
  },
  [ENTITIES.CASHIER]: {
    Model: ApplicationModels.Cashier,
    field: 'cashiers',
  },
  [ENTITIES.BUDGET]: {
    Model: ApplicationModels.Budget,
    field: 'budgets',
  },
  [ENTITIES.CUSTOMER]: {
    Model: ApplicationModels.Customer,
    field: 'customers',
  },
  [ENTITIES.PROVIDER]: {
    Model: ApplicationModels.Provider,
    field: 'providers',
  },
  [ENTITIES.USER]: {
    Model: ApplicationModels.User,
    field: 'users',
  },
};

exports.importFromBackupFile = async (backupFile) => {
  try {
    const modelKeys = Object.keys(MODELS);

    return await Promise.all(modelKeys.map(async (modelItem) => {
      const { Model, field } = MODELS[modelItem];

      await Promise.all(backupFile[field].map(async item => Model.create(item)));
    }));
  } catch (err) {
    return err;
  }
};

exports.exportToBackupFile = async () => {
  try {
    const backupFile = await Object.keys(MODELS).reduce(async (result, modelItem) => {
      const { Model, field } = MODELS[modelItem];

      const data = await Model.findAll({ raw: true, order: [['updatedAt', 'DESC']] });

      const currentResult = await result;

      return Object.assign({ ...currentResult }, { [field]: data });
    }, {});

    return backupFile;
  } catch (err) {
    return err;
  }
};
