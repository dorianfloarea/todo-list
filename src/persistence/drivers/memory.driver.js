const {DataNotFoundError} = require('../../errors/types');

module.exports = ({storageSpace}) => {
  const data = {
    [storageSpace]: [],
  };

  const create = (model) => {
    return data[storageSpace].push(model);
  };

  const getAll = () => {
    return data[storageSpace];
  };

  const get = (id) => {
    const model = data[storageSpace].find((element) => element.id === id);

    if (!model) {
      throw new DataNotFoundError('Item not found');
    }

    return model;
  };

  const update = (id, newModel) => {
    const oldModel = data[storageSpace].find((element) => element.id === id);

    if (!oldModel) {
      throw new DataNotFoundError('Item not found');
    }

    oldModel.data = newModel.data;

    return oldModel;
  };

  const deleteData = (id) => {
    const model = data[storageSpace].find((element) => element.id === id);
    const index = data[storageSpace].indexOf(model);

    if (index === -1) {
      throw new DataNotFoundError('Item not found');
    }

    data[storageSpace].splice(index, 1);
  };

  const deleteAll = () => {
    data[storageSpace] = [];
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
