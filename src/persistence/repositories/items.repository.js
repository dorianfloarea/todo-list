module.exports = ({driver}) => {
  const createItem = (item) => {
    return driver.create(item);
  };

  const getAllItems = () => {
    return driver.getAll();
  };

  const getItem = (id) => {
    return driver.get(id);
  };

  const updateItem = (id, item) => {
    return driver.update(id, item);
  };

  const deleteItem = (id) => {
    return driver.delete(id);
  };

  const deleteAllItems = () => {
    return driver.deleteAll();
  };

  return {
    createItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItem,
    deleteAllItems,
  };
};
