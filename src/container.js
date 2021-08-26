const repositories = require('./persistence/repositories');
const services = require('./services');
const controllers = require('./controllers');
const drivers = require('./persistence/drivers');
const {ItemModel} = require('./models');

const itemsMemoryDriver = drivers.memoryDriver(
    {storageSpace: ItemModel.storageSpace},
);
const itemsRepository = repositories.itemsRepository(
    {driver: itemsMemoryDriver},
);
const itemsService = services.itemsService({itemsRepository});
const itemsController = controllers.itemsController(
    {
      itemsService,
    },
);

module.exports = {
  itemsService,
  itemsController,
};
