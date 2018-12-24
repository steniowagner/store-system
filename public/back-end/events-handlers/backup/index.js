const backupController = require('../../controllers/backup');
const BACKUP_OPERATIONS = require('./types');

const handleBackupEvent = (operation, args) => {
  switch (operation) {
    case BACKUP_OPERATIONS.IMPORT_DATA: return backupController.importFromBackupFile(args);

    case BACKUP_OPERATIONS.EXPORT_DATA: return backupController.exportToBackupFile(args);

    default: return {};
  }
};

module.exports = handleBackupEvent;
