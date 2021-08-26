const {DataNotFoundError} = require('../../errors/types');
const {database} = require('../../config');
const Redis = require('ioredis'); // https://www.npmjs.com/package/ioredis
const client = new Redis(database.redis);

client.on('error', function(error) {
  throw error;
});

module.exports = ({}) => {
  const create = (itemData) => {
  };

  const getAll = () => {
  };

  const get = (index) => {
  };

  const update = (index, itemData) => {
  };

  const deleteData = (index) => {
  };

  const deleteAll = () => {
  };

  return {
    create,
    getAll,
    get,
    update,
    delete: deleteData,
    deleteAll,
  };
};
