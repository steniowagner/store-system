const userController = require('../../controllers/user');
const USER_OPERATION_TYPES = require('./types');

const handleUserEvent = (operation, args) => {
  switch (operation) {
    case USER_OPERATION_TYPES.CREATE: return userController.create(args);

    case USER_OPERATION_TYPES.READ: return userController.getAll();

    case USER_OPERATION_TYPES.UPDATE: return userController.edit(args);

    case USER_OPERATION_TYPES.DELETE: return userController.remove(args);

    default: return {};
  }
};

module.exports = handleUserEvent;
