const userController = require('../../controllers/user');
const USER_OPERATION_TYPES = require('./types');

const handleUserEvent = (operation, args) => {
  switch (operation) {
    case USER_OPERATION_TYPES.CREATE_USER: return userController.create(args);

    case USER_OPERATION_TYPES.READ_USERS: return userController.getAll();

    case USER_OPERATION_TYPES.UPDATE_USER: return userController.edit(args);

    case USER_OPERATION_TYPES.DELETE_USER: return userController.remove(args);

    default: return {};
  }
};

module.exports = handleUserEvent;
